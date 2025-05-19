from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

# 드라이버 설정
driver_path = r"C:\Program Files\Google\chromedriver-win64\chromedriver.exe"
service = Service(driver_path)
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 20)
#crawling
# 카카오맵 접속
driver.get("https://map.kakao.com/")
search_input = wait.until(EC.presence_of_element_located((By.ID, "search.keyword.query")))
search_input.send_keys("세종대학교 맛집")
search_input.send_keys(Keys.RETURN)

# 검색 결과 로딩 대기 (iframe ❌, 바로 접근 가능)
wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.PlaceItem")))

# 음식점 정보 수집
places = driver.find_elements(By.CSS_SELECTOR, "li.PlaceItem")
data = []

for place in places:
    try:
        name = place.find_element(By.CSS_SELECTOR, ".tit_name .link_name").text
        address = place.find_element(By.CSS_SELECTOR, '.addr p[data-id="address"]').text
        phone = place.find_element(By.CSS_SELECTOR, '.contact .phone').text
        rating = place.find_element(By.CSS_SELECTOR, '.rating .num').text
        reviews = place.find_element(By.CSS_SELECTOR, '.review em').text
        link = place.find_element(By.CSS_SELECTOR, '.moreview').get_attribute('href')
    except Exception as e:
        print("⚠️ 일부 항목 누락:", e)
        continue

    data.append({
        '이름': name,
        '주소': address,
        '전화번호': phone,
        '평점': rating,
        '리뷰수': reviews,
        '상세링크': link
    })

# 엑셀 저장
df = pd.DataFrame(data)
df.to_excel("세종대_맛집_리스트.xlsx", index=False, engine='openpyxl')
print(" 음식점 리스트 저장 완료!")

driver.quit()
