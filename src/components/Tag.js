// components/Tag.js
import React from "react";
import restaurantData from './allAboutInfo.json';
import {
    IconButton, Typography
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

const getUniqueValues = (key) => {
    const uniqueValues = [...new Set(restaurantData.map(item => item[key]).filter(Boolean))];

    // 정렬
    return uniqueValues.sort((a, b) => {
        // 숫자로 변환 가능한지 확인
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        // 둘 다 숫자일때
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }
        // 문자열일때
        return a.localeCompare(b, 'ko-KR');
    });
};

export const convertPriceToRange = (price) => {
    if (!price) return null;

    const numPrice = parseInt(price.replace(/[^0-9]/g, ''));

    if (isNaN(numPrice)) return null;

    if (numPrice < 5000) return "5천원미만";
    if (numPrice < 10000) return "5천원 이상";
    if (numPrice < 15000) return "1만원 이상";
    if (numPrice < 20000) return "1만 5천원 이상";
    if (numPrice < 25000) return "2만원 이상";
    if (numPrice < 30000) return "2만 5천원 이상";
    return "3만원 이상";
};

// 가격대 구간
const getPriceRanges = () => {
    return [
        "5천원미만",
        "5천원 이상",
        "1만원 이상",
        "1만 5천원 이상",
        "2만원 이상",
        "2만 5천원 이상",
        "3만원 이상"
    ];
};

export default function TagSelector({ filters, onFilterChange }) {
    const foodTypes = getUniqueValues("food_type");
    const tags = getUniqueValues("tag");
    const serviceTypes = getUniqueValues("service_type");
    const priceRanges = getPriceRanges();

    // 공통 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    // 리셋 핸들러
    const handleReset = () => {
        onFilterChange({
            food_type: "",
            tag: "",
            service_type: "",
            menu_price: ""
        });
    };

    // 현재 선택된 필터들을 배열로 생성
    const getSelectedFilters = () => {
        const selected = [];
        if (filters.food_type) selected.push(`음식 유형: ${filters.food_type}`);
        if (filters.tag) selected.push(`매장 유형: ${filters.tag}`);
        if (filters.service_type) selected.push(`서비스 유형: ${filters.service_type}`);
        if (filters.menu_price) selected.push(`가격대: ${filters.menu_price}`);
        return selected;
    };

    const selectedFilters = getSelectedFilters();

    return (
        <div style={{ padding: "1rem" }}>
            {/* 필터 선택 영역 */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
                <label>음식 유형: </label>
                <select name="food_type" value={filters.food_type} onChange={handleChange}>
                    <option value="">전체</option>
                    {foodTypes.map((type, i) => (
                        <option key={i} value={type}>{type}</option>
                    ))}
                </select>

                <label style={{ marginLeft: "1rem" }}>매장 유형: </label>
                <select name="tag" value={filters.tag} onChange={handleChange}>
                    <option value="">전체</option>
                    {tags.map((tag, i) => (
                        <option key={i} value={tag}>{tag}</option>
                    ))}
                </select>

                <label style={{ marginLeft: "1rem" }}>서비스 유형: </label>
                <select name="service_type" value={filters.service_type} onChange={handleChange}>
                    <option value="">전체</option>
                    {serviceTypes.map((type, i) => (
                        <option key={i} value={type}>{type}</option>
                    ))}
                </select>

                <label style={{ marginLeft: "1rem" }}>가격대: </label>
                <select name="menu_price" value={filters.menu_price} onChange={handleChange}>
                    <option value="">전체</option>
                    {priceRanges.map((price, i) => (
                        <option key={i} value={price}>{price}</option>
                    ))}
                </select>

                <IconButton
                    onClick={handleReset}
                    style={{ marginLeft: "1rem" }}
                    title="필터 초기화"
                    color="primary"
                >
                    <RefreshIcon />
                </IconButton>
            </div>

            {/* 현재 선택된 필터 표시 영역 */}
            <div style={{
                backgroundColor: "#f5f5f5",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ddd"
            }}>
                <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    현재 선택된 필터:
                </Typography>
                {selectedFilters.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {selectedFilters.map((filter, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: "#1976d2",
                                    color: "white",
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "16px",
                                    fontSize: "0.875rem"
                                }}
                            >
                                {filter}
                            </span>
                        ))}
                    </div>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        선택된 필터가 없습니다.
                    </Typography>
                )}
            </div>
        </div >
    );
}