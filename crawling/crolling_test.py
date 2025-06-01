from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import os
import requests

# 드라이버 설정
driver_path = r"C:\Program Files\Google\chromedriver-win64\chromedriver.exe"
service = Service(driver_path)
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)

# Kakao Map 접속
driver.get("https://map.kakao.com/")
search_input = wait.until(EC.presence_of_element_located((By.ID, "search.keyword.query")))
search_input.send_keys("세종대학교 맛집")
search_input.send_keys(Keys.RETURN)

wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.PlaceItem")))

data = []
page_count = 0
# 이미지 저장 폴더
img_dir = "images"
os.makedirs(img_dir, exist_ok=True)

while page_count < 5:
    print(f"📄 페이지 {page_count + 1} 크롤링 중...")
    #  장소 목록 수집
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
            print("⚠️ 기본 정보 수집 실패:", e)
            continue

        # 상세페이지 새 탭 열기
        driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[1])
        driver.get(link)
        time.sleep(2)

        sample_reviews = []
        image_url = ""

        try:
            # ▶ 후기 탭 클릭
            review_tab = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.link_tab[href="#comment"]'))
            )
            review_tab.click()
            time.sleep(2)
            # ▶ 후기 수집
            review_elements = driver.find_elements(By.CSS_SELECTOR, 'li .wrap_review')
            for review_wrap in review_elements[:3]:
                try:
                    # 더보기 버튼이 존재하면 클릭
                    try:
                        more_button = review_wrap.find_element(By.CSS_SELECTOR, 'span.btn_more')
                        driver.execute_script("arguments[0].scrollIntoView(true);", more_button)
                        time.sleep(0.5)
                        driver.execute_script("arguments[0].click();", more_button)
                        time.sleep(1)
                    except:
                        pass  # 더보기 버튼이 없으면 패스

                    # 전체 텍스트 가져오기
                    full_text = review_wrap.find_element(By.CSS_SELECTOR, 'p.desc_review').text.strip()
                    sample_reviews.append(full_text)
                except Exception as e:
                    print(" 개별 리뷰 수집 실패:", e)
        except Exception as e:
            print(" 리뷰 수집 실패:", e)


        try:
            # ▶ 사진 탭 클릭
            photo_tab = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.link_tab[href="#photoview"]'))
            )
            photo_tab.click()
            time.sleep(2)

            # ▶ 이미지 src 추출
            img = driver.find_element(By.CSS_SELECTOR, 'ul.list_photo li a.link_photo > img')
            image_url = img.get_attribute('src')

            # ▶ 이미지 다운로드
            if image_url:
                response = requests.get(image_url)
                img_path = os.path.join(img_dir, f"{name}.jpg")
                with open(img_path, "wb") as f:
                    f.write(response.content)
        except Exception as e:
            print(" 이미지 수집 실패:", e)

         # 메뉴 탭 
        try:
        # 메뉴 탭 클릭
            menu_tab = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.link_tab[href="#menuInfo"]'))
            )
            menu_tab.click()
    
        # 메뉴 정보가 로드될 때까지 대기
            WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'p.desc_item'))
            )
    
        #  첫 번째 가격 정보 가져오기
            menu_price_el = driver.find_element(By.CSS_SELECTOR, 'p.desc_item')
            menu_price = menu_price_el.text.strip()
    
        except Exception as e:
            print(" ⚠️ 메뉴 가격 수집 실패:", e)
            menu_price = "정보 없음"

        driver.close()
        driver.switch_to.window(driver.window_handles[0])

  
        
        data.append({
            "name": name,
            "address": address,
            "phone": phone,
            "rating": rating,
            "review_count": reviews,
            "detail_link": link,
            "sample_reviews": sample_reviews,
            "image_url": image_url,
            "menu_price": menu_price  
        })
    # 1페이지 -> 2페이지 넘어가는 경우 '더보기' 버튼 클릭
    if page_count == 0:
        try:
            more_btn = driver.find_element(By.ID, "info.search.place.more")
            driver.execute_script("arguments[0].scrollIntoView(true);", more_btn)
            time.sleep(1)
            driver.execute_script("arguments[0].click();", more_btn)
            time.sleep(2)
            wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.PlaceItem")))
        except Exception as e:
            print(" 더보기 버튼 클릭 실패:", e)
            break

    # 이후 페이지 (3페이지부터)
    elif page_count > 1:
        try:
            next_btn_id = f"info.search.page.no{page_count + 1}"
            next_btn = driver.find_element(By.ID, next_btn_id)
            driver.execute_script("arguments[0].scrollIntoView(true);", next_btn)
            time.sleep(1)
            driver.execute_script("arguments[0].click();", next_btn)
            time.sleep(2)
            wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.PlaceItem")))
        except Exception as e:
            print(" 다음 페이지 이동 실패:", e)
            break

    # 카운트 증가는 마지막에!
    page_count += 1
# 저장
with open("세종대_맛집_리스트_with_리뷰_이미지.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(" 크롤링 및 저장 완료!")
driver.quit()
