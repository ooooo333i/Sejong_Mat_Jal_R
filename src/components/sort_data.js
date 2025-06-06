const fs = require('fs');
const data = JSON.parse(fs.readFileSync('sejongMJR_data_final.json', 'utf8'));

const uniqueData = [];
const seenNames = new Set();

data.forEach(item => {
    if (!seenNames.has(item.name)) {
        seenNames.add(item.name);
        uniqueData.push(item);
    }
});

// rating 1순위, review_count 2순위로 내림차순 정렬
const sortedData = uniqueData.sort((a, b) => {
    const ratingA = parseFloat(a.rating);
    const ratingB = parseFloat(b.rating);

    if (ratingB !== ratingA) {
        return ratingB - ratingA; // rating 내림차순
    }

    const reviewCountA = parseInt(a.review_count);
    const reviewCountB = parseInt(b.review_count);
    return reviewCountB - reviewCountA; // review_count 내림차순
});

// 정렬된 데이터 저장
fs.writeFileSync('sejongMJR_data_final.json', JSON.stringify(sortedData, null, 2));
console.log(`정렬 및 중복 제거 ${data.length}개 -> ${uniqueData.length}개`);
