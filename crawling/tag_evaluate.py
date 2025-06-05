import json

#  분류 기준 정의
food_category_map = {
    "디저트/카페": ["간식", "도넛", "디저트카페", "무인카페", "생과일전문점", "아이스크림", "애견카페", "제과,베이커리", "카페", "커피전문점", "테마카페", "토스트"],
    "한식": ["갈비", "감자탕", "곱창,막창", "국밥", "국수", "냉면", "닭강정", "닭요리", "도시락", "떡볶이", "분식", "사철탕,영양탕", "삼겹살", "삼계탕", "샤브샤브", "순대", "오리", "육류,고기", "장어", "조개", "족발,보쌈", "찌개,전골", "치킨", "칼국수", "한식", "한식뷔페", "해물,생선", "해장국"],
    "일식": ["돈까스,우동", "일본식라면", "일본식주점", "일식", "일식집", "초밥,롤", "회"],
    "기타": ["동남아음식", "멕시칸,브라질", "베트남음식", "술집", "실내포장마차", "와인바", "튀르키예음식", "패밀리레스토랑", "패스트푸드", "호프,요리주점"],
    "양식": ["샌드위치", "샐러드", "양식", "이탈리안", "프랑스음식", "피자", "햄버거"],
    "중식": ["양꼬치", "중국요리", "중식"],
    "퓨전": ["퓨전요리"]
}


service_category_map = {
    "카페/음료": ["간식", "도넛", "디저트카페", "무인카페", "애견카페", "카페", "커피전문점", "테마카페", "토스트"],
    "매장 식사 위주": ["갈비", "감자탕", "곱창,막창", "국밥", "닭강정", "닭요리", "삼겹살", "삼계탕", "실내포장마차", "양꼬치", "양식", "오리", "와인바", "육류,고기", "이탈리안", "일본식라면", "일본식주점", "일식", "일식집", "장어", "조개", "족발,보쌈", "중국요리", "중식", "찌개,전골", "초밥,롤", "칼국수", "튀르키예음식", "패밀리레스토랑", "퓨전요리", "프랑스음식", "피자", "한식", "한식뷔페", "해물,생선", "해장국", "햄버거", "호프,요리주점", "회"],
    "포장/배달 위주": ["국수", "냉면", "도시락", "돈까스,우동", "떡볶이", "분식", "치킨", "패스트푸드"],
    "기타": ["동남아음식", "멕시칸,브라질", "베트남음식", "사철탕,영양탕", "샤브샤브", "순대", "술집", "아이스크림"],
    "건강식/샐러드": ["샌드위치", "샐러드", "생과일전문점"],
    "베이커리/디저트": ["제과,베이커리"]
}



#  JSON 파일 경로
input_path = r"C:\Users\jonny\OneDrive\바탕 화면\25년 1학기\오픈소스\MatJalR_Project\Sejong_Mat_Jal_R_jonny\세종대_맛집_리스트_with_리뷰_이미지.json"
output_path = input_path.replace(".json", "_tag_classified_single.json")

#  파일 불러오기
with open(input_path, "r", encoding="utf-8") as f:
    data = json.load(f)

#  첫 번째 매칭만 반환하는 분류 함수
def classify_tag_single(tag_str, category_map):
    for category, keywords in category_map.items():
        for keyword in keywords:
            if keyword in tag_str:
                return category
    return "기타"

#  데이터에 분류 항목 추가
for entry in data:
    tag_text = entry.get("tag", "")
    entry["food_type"] = classify_tag_single(tag_text, food_category_map)
    entry["service_type"] = classify_tag_single(tag_text, service_category_map)

#  새 파일로 저장
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(" 단일 분류 완료! 파일 저장됨:", output_path)
