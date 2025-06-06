// components/Tag.js
import React, { useState, useEffect } from "react";
import restaurantData from './sejongMJR_data_final.json';
import {
    IconButton, Typography, Box, Slider
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

const getUniqueValues = (key) => {
    const uniqueValues = [...new Set(restaurantData.map(item => item[key]).filter(Boolean))];

    // 정렬 함수
    return uniqueValues.sort((a, b) => {
        // 숫자로 변환 가능한지 확인
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        // 둘 다 숫자인 경우 숫자로 비교
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }

        // 하나라도 숫자가 아닌 경우 문자열로 비교 (가나다순)
        return a.localeCompare(b, 'ko-KR');
    });
};

// 가격 숫자 추출 함수
const parsePrice = (price) => {
    if (!price) return 0;
    const num = parseInt(price.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
};

export default function TagSelector({ onFilteredDataChange }) {
    const [filters, setFilters] = useState({
        food_type: "",
        tag: "",
        service_type: "",
        menu_price_range: [0, 50000]  // 레인지 슬라이더로 변경
    });

    const foodTypes = getUniqueValues("food_type");
    const tags = getUniqueValues("tag");
    const serviceTypes = getUniqueValues("service_type");
    
    // 데이터 필터링 함수
    const filterData = (currentFilters) => {
        return restaurantData.filter(item => {
            // 음식 유형 필터
            if (currentFilters.food_type && item.food_type !== currentFilters.food_type) {
                return false;
            }
            // 매장 유형 필터
            if (currentFilters.tag && item.tag !== currentFilters.tag) {
                return false;
            }
            // 서비스 유형 필터
            if (currentFilters.service_type && item.service_type !== currentFilters.service_type) {
                return false;
            }
            // 가격대 필터 (범위 내 포함 여부 확인)
            const price = parsePrice(item.menu_price);
            if (price < currentFilters.menu_price_range[0] || price > currentFilters.menu_price_range[1]) {
                return false;
            }

            return true;
        });
    };

    // 필터 변경 시 데이터 업데이트
    useEffect(() => {
        const filteredData = filterData(filters);
        if (onFilteredDataChange) {
            onFilteredDataChange(filteredData);
        }
    }, [filters, onFilteredDataChange]);




    // 공통 핸들러 (select 요소용)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // 슬라이더 값 변경 핸들러
    const handleSliderChange = (event, newValue) => {
        setFilters(prev => ({ ...prev, menu_price_range: newValue }));
    };

    // 리셋 핸들러
    const handleReset = () => {
        setFilters({
            food_type: "",
            tag: "",
            service_type: "",
            menu_price_range: [0, 50000]
        });
    };

    // 현재 선택된 필터들을 배열로 생성
    const getSelectedFilters = () => {
        const selected = [];
        if (filters.food_type) selected.push(`음식 유형: ${filters.food_type}`);
        if (filters.tag) selected.push(`매장 유형: ${filters.tag}`);
        if (filters.service_type) selected.push(`서비스 유형: ${filters.service_type}`);
        if (filters.menu_price_range) selected.push(`가격대: ${filters.menu_price_range[0]}원 ~ ${filters.menu_price_range[1]}원`);
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

                {/* 가격대 레인지 슬라이더 */}
                <Box sx={{ width: 250, marginLeft: 3 }}>
                    <Typography gutterBottom>
                        가격대: {filters.menu_price_range[0]}원 ~ {filters.menu_price_range[1]}원
                    </Typography>
                    <Slider
                        value={filters.menu_price_range}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={50000}
                        step={1000}
                    />
                </Box>

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
        </div>
    );
}