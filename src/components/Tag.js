// components/Tag.js
import React, { useState, useEffect } from "react";
import restaurantData from "./sejongMJR_data_final.json";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Slider,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const getUniqueValues = (key) => {
  const uniqueValues = [
    ...new Set(restaurantData.map((item) => item[key]).filter(Boolean)),
  ];
  return uniqueValues.sort((a, b) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    return !isNaN(numA) && !isNaN(numB)
      ? numA - numB
      : a.localeCompare(b, "ko-KR");
  });
};

const parsePrice = (price) => {
  if (!price) return 0;
  const num = parseInt(price.replace(/[^0-9]/g, ""));
  return isNaN(num) ? 0 : num;
};

export default function TagSelector({ onFilteredDataChange }) {
  const [filters, setFilters] = useState({
    food_type: "",
    tag: "",
    service_type: "",
    menu_price_range: [0, 50000],
  });

  const foodTypes = getUniqueValues("food_type");
  const tags = getUniqueValues("tag");
  const serviceTypes = getUniqueValues("service_type");

  useEffect(() => {
    const filtered = restaurantData.filter((item) => {
      if (filters.food_type && item.food_type !== filters.food_type)
        return false;
      if (filters.tag && item.tag !== filters.tag) return false;
      if (filters.service_type && item.service_type !== filters.service_type)
        return false;
      const price = parsePrice(item.menu_price);
      if (
        price < filters.menu_price_range[0] ||
        price > filters.menu_price_range[1]
      )
        return false;
      return true;
    });

    if (onFilteredDataChange) onFilteredDataChange(filtered);
  }, [filters, onFilteredDataChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (_, newValue) => {
    setFilters((prev) => ({ ...prev, menu_price_range: newValue }));
  };

  const handleReset = () => {
    setFilters({
      food_type: "",
      tag: "",
      service_type: "",
      menu_price_range: [0, 50000],
    });
  };

  const selectedFilters = [
    filters.food_type && `음식 유형: ${filters.food_type}`,
    filters.tag && `매장 유형: ${filters.tag}`,
    filters.service_type && `서비스 유형: ${filters.service_type}`,
    `가격대: ${filters.menu_price_range[0]}원 ~ ${filters.menu_price_range[1]}원`,
  ].filter(Boolean);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>음식 유형</InputLabel>
          <Select
            name="food_type"
            value={filters.food_type}
            label="음식 유형"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>전체</em>
            </MenuItem>
            {foodTypes.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>매장 유형</InputLabel>
          <Select
            name="tag"
            value={filters.tag}
            label="매장 유형"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>전체</em>
            </MenuItem>
            {tags.map((tag, i) => (
              <MenuItem key={i} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>서비스 유형</InputLabel>
          <Select
            name="service_type"
            value={filters.service_type}
            label="서비스 유형"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>전체</em>
            </MenuItem>
            {serviceTypes.map((type, i) => (
              <MenuItem key={i} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 250 }}>
          <Typography variant="body2" fontWeight={500} mb={1}>
            가격대: {filters.menu_price_range[0]}원 ~{" "}
            {filters.menu_price_range[1]}원
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

        <IconButton onClick={handleReset} color="primary" title="필터 초기화">
          <RefreshIcon />
        </IconButton>
      </Box>

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
