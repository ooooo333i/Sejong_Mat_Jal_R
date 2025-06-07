import React, { useState, useEffect } from "react";
import restaurantData from "./sejongMJR_data_final.json";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  IconButton,
  Chip,
  Button,
  ButtonGroup
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// 가격 숫자 추출 함수
const parsePrice = (price) => {
  if (!price) return 0;
  const num = parseInt(price.replace(/[^0-9]/g, ''));
  return isNaN(num) ? 0 : num;
};

// 별점 숫자 추출 함수
const parseRating = (rating) => {
  if (!rating) return 0;
  const num = parseFloat(rating);
  return isNaN(num) ? 0 : num;
};

export default function TagSelector({ onFilteredDataChange, onFiltersChange }) {
  const [filters, setFilters] = useState({
    food_type: "",
    tag: "",
    service_type: "",
    menu_price_range: [0, 50000]
  });

  const [sortType, setSortType] = useState(""); // "rating" 또는 "price"
  const [sortOrder, setSortOrder] = useState({}); // {rating: "desc", price: "asc"} 등

  const foodTypes = [...new Set(restaurantData.map(item => item.food_type).filter(Boolean))];

  const filteredTags = [...new Set(
    restaurantData
      .filter(item => !filters.food_type || item.food_type === filters.food_type)
      .map(item => item.tag)
      .filter(Boolean)
  )];

  const filteredServiceTypes = [...new Set(
    restaurantData
      .filter(item =>
        (!filters.food_type || item.food_type === filters.food_type) &&
        (!filters.tag || item.tag === filters.tag)
      )
      .map(item => item.service_type)
      .filter(Boolean)
  )];

  useEffect(() => { // 필터 적용 및 정렬
    let filtered = restaurantData.filter((item) => {
      if (filters.food_type && item.food_type !== filters.food_type) return false;
      if (filters.tag && item.tag !== filters.tag) return false;
      if (filters.service_type && item.service_type !== filters.service_type) return false;

      const price = parsePrice(item.menu_price);
      if (price < filters.menu_price_range[0] || price > filters.menu_price_range[1]) return false;

      return true;
    });

    // 정렬 적용
    if (sortType === "rating") {
      const order = sortOrder.rating || "desc";
      filtered = filtered.sort((a, b) => {
        return order === "desc"
          ? parseRating(b.rating) - parseRating(a.rating)
          : parseRating(a.rating) - parseRating(b.rating);
      });
    } else if (sortType === "price") {
      const order = sortOrder.price || "desc";
      filtered = filtered.sort((a, b) => {
        return order === "desc"
          ? parsePrice(b.menu_price) - parsePrice(a.menu_price)
          : parsePrice(a.menu_price) - parsePrice(b.menu_price);
      });
    }

    //필터 바뀌었을 때 핸들러
    onFilteredDataChange?.(filtered);
    // 필터 상태를 부모 컴포넌트로 전달
    onFiltersChange?.({ ...filters, sortType, sortOrder });
  }, [filters, sortType, sortOrder, onFilteredDataChange, onFiltersChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === "food_type" ? { tag: "", service_type: "" } : {}),
      ...(name === "tag" ? { service_type: "" } : {})
    }));
  };

  // Range 변경 핸들
  const handleSliderChange = (_, newValue) => {
    setFilters(prev => ({ ...prev, menu_price_range: newValue }));
  };

  // 초기화 핸들
  const handleReset = () => {
    setFilters({
      food_type: "",
      tag: "",
      service_type: "",
      menu_price_range: [0, 50000]
    });
    setSortType("");
    setSortOrder({});
  };

  const handleTagClick = (tag) => {
    setFilters(prev => ({
      ...prev,
      tag: prev.tag === tag ? "" : tag,
      service_type: ""
    }));
  };

  // 정렬 버튼 핸들러
  const handleSortClick = (type) => {
    if (sortType === type) {
      // 같은 버튼을 다시 클릭한 경우 정렬 순서 토글
      setSortOrder(prev => ({
        ...prev,
        [type]: prev[type] === "desc" ? "asc" : "desc"
      }));
    } else {
      // 다른 버튼을 클릭한 경우 새로운 정렬 타입 설정 (기본: 높은순)
      setSortType(type);
      setSortOrder(prev => ({
        ...prev,
        [type]: prev[type] || "desc"
      }));
    }
  };

  // 선택된 필터 보여주기 true/false
  const selectedFilters = [
    filters.food_type && `음식 유형: ${filters.food_type}`,
    filters.tag && `매장 유형: ${filters.tag}`,
    filters.service_type && `서비스 유형: ${filters.service_type}`,
    `가격대: ${filters.menu_price_range[0]}원 ~ ${filters.menu_price_range[1]}원`,
    sortType === "rating" && `정렬: 별점 ${sortOrder.rating === "asc" ? "낮은순" : "높은순"}`,
    sortType === "price" && `정렬: 가격 ${sortOrder.price === "asc" ? "낮은순" : "높은순"}`
  ].filter(Boolean);

  return (
    <Box sx={{ p: 2 }}>
      {/* 필터 입력 */}
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 2 }}>
        {/* 음식 유형 */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>음식 유형</InputLabel>
          <Select
            name="food_type"
            value={filters.food_type}
            label="음식 유형"
            onChange={handleChange}
          >
            <MenuItem value=""><em>전체</em></MenuItem>
            {foodTypes.map((type, idx) => (
              <MenuItem key={idx} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 서비스 유형 */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>서비스 유형</InputLabel>
          <Select
            name="service_type"
            value={filters.service_type}
            label="서비스 유형"
            onChange={handleChange}
          >
            <MenuItem value=""><em>전체</em></MenuItem>
            {filteredServiceTypes.map((type, idx) => (
              <MenuItem key={idx} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 가격대 */}
        <Box sx={{ width: 250 }}>
          <Typography gutterBottom variant="body2" fontWeight={500}>
            가격대: {filters.menu_price_range[0]}원 ~ {filters.menu_price_range[1]}원
          </Typography>
          <Slider
            value={filters.menu_price_range}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={50000}
            step={1000}
            color="primary"
          />
        </Box>

        {/* 정렬 버튼 */}
        <ButtonGroup size="small">
          <Button
            variant={sortType === "rating" ? "contained" : "outlined"}
            onClick={() => handleSortClick("rating")}
            startIcon={<StarIcon />}
            sx={{ minWidth: 140 }}
          >
            별점 {sortType === "rating" ? (sortOrder.rating === "asc" ? "낮은순" : "높은순") : "정렬"}
          </Button>
          <Button
            variant={sortType === "price" ? "contained" : "outlined"}
            onClick={() => handleSortClick("price")}
            startIcon={<AttachMoneyIcon />}
            sx={{ minWidth: 140 }}
          >
            가격 {sortType === "price" ? (sortOrder.price === "asc" ? "낮은순" : "높은순") : "정렬"}
          </Button>
        </ButtonGroup>

        <IconButton onClick={handleReset} color="primary" title="필터 초기화">
          <RefreshIcon />
        </IconButton>
      </Box>

      {/* 태그 버튼 -> 음식 종류 */}
      {filters.food_type && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            음식 종류
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {filteredTags.map((tag, idx) => (
              <Button
                key={idx}
                variant={filters.tag === tag ? "contained" : "outlined"}
                onClick={() => handleTagClick(tag)}
                size="small"
              >
                {tag}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      {/* 선택된 필터 표시 */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          p: 1,
          borderRadius: 1,
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="body2" fontWeight={600} gutterBottom>
          현재 선택된 필터:
        </Typography>

        {selectedFilters.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedFilters.map((filter, i) => (
              <Chip
                key={i}
                label={filter}
                variant="outlined"
                color="primary"
                sx={{ fontSize: "0.85rem" }}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            선택된 필터가 없습니다.
          </Typography>
        )}
      </Box>
    </Box>
  );
}