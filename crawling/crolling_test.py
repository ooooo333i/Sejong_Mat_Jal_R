from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import time

# 🔧 드라이버 설정
driver_path = r"C:\Program Files\Google\chromedriver-win64\chromedriver.exe"
service = Service(driver_path)
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)

# 🗺 Kakao Map 접속 및 검색
driver.get("https://map.kakao.com/")
search_input = wait.until(EC.presence_of_element_located((By.ID, "search.keyword.query")))
search_input.send_keys("세종대학교 맛집")
search_input.send_keys(Keys.RETURN)

# 결과 로딩 대기
wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.PlaceItem")))

data = []
page_count = 0

while page_count < 3:  # ➡️ 최대 3페이지 수집
    print(f"📄 현재 페이지: {page_count + 1}")
    
    places = driver.find_elements(By.CSS_SELECTOR, "li.PlaceItem")

    for place in places:
        try:
            name = place.find_element(By.CSS_SELECTOR, ".tit_name .link_name").text
            address = place.find_element(By.CSS_SELECTOR, '.addr p[data-id="address"]').text
            phone = place.find_element(By.CSS_SELECTOR, '.contact .phone').text
            rating = place.find_element(By.CSS_SELECTOR, '.rating .num').text
            reviews = place.find_element(By.CSS_SELECTOR, '.review em').text
            link = place.find_element(By.CSS_SELECTOR, '.moreview').get_attribute('href')
        except Exception as e:
            print("⚠️ 기본 정보 수집 중 누락:", e)
            continue

        # 📥 상세페이지에서 리뷰 수집
        driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[1])
        driver.get(link)
        time.sleep(2)

        sample_reviews = []

        try:
            # ✅ 후기 탭 클릭
            review_tab = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.link_tab[href="#comment"]'))
            )
            review_tab.click()
            time.sleep(2)

            # ✅ 리뷰 본문 최대 3개 수집
            review_elements = driver.find_elements(By.CSS_SELECTOR, 'p.desc_review')
            for r in review_elements[:3]:
                text = r.text.strip()
                if text:
                    sample_reviews.append(text)
        except Exception as e:
            print("⚠️ 리뷰 수집 실패:", e)

        driver.close()
        driver.switch_to.window(driver.window_handles[0])

        data.append({
            "name": name,
            "address": address,
            "phone": phone,
            "rating": rating,
            "review_count": reviews,
            "detail_link": link,
            "sample_reviews": sample_reviews
        })

    # ➡️ 다음 페이지 이동
    try:
        page_count += 1
        next_btn = driver.find_element(By.CSS_SELECTOR, 'a#info.search.page.next')
        if 'disabled' in next_btn.get_attribute('class'):
            print("✅ 다음 페이지 없음. 종료.")
            break
        next_btn.click()
        time.sleep(2)
        wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.PlaceItem")))
    except Exception as e:
        print("⚠️ 다음 페이지 이동 실패:", e)
        break

# 💾 JSON 저장
with open("세종대_맛집_리스트_with_리뷰.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ JSON 저장 완료. 총 음식점 수: {len(data)}개")

driver.quit()
