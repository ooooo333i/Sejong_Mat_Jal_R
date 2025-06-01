import json

#  분류 기준 정의
food_category_map = {
    "한식": ["갈비", "국밥", "국수", "냉면", "닭요리", "삼겹살", "삼계탕", "설렁탕", "족발", "보쌈", "칼국수", "한식", "오리", "육류", "고기", "조개"],
    "일식": ["일식", "초밥", "롤", "회", "돈까스", "우동"],
    "중식": ["중국요리", "중식"],
    "양식": ["이탈리안", "샌드위치", "햄버거", "패스트푸드", "샐러드"],
    "퓨전": ["퓨전요리"]
}

service_category_map = {
    "매장 식사 위주": ["갈비", "국밥", "삼겹살", "삼계탕", "설렁탕", "족발", "보쌈", "칼국수", "한식", "오리", "육류", "고기", "조개",
                   "일식", "초밥", "롤", "회", "이탈리안", "패밀리레스토랑", "호프", "요리주점", "실내포장마차"],
    "포장/배달 위주": ["국수", "냉면", "도시락", "분식", "떡볶이", "치킨", "패스트푸드", "돈까스", "우동"],
    "카페/음료": ["디저트카페", "카페", "커피전문점", "애견카페"],
    "베이커리/디저트": ["제과", "베이커리"],
    "건강식/샐러드": ["샐러드", "샌드위치", "중국요리", "중식"]
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
