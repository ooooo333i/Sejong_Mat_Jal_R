// components/Tag.js
import React from "react";
import restaurantData from './allAboutInfo.json';

const getUniqueValues = (key) => {
  return [...new Set(restaurantData.map(item => item[key]).filter(Boolean))];
};

export default function TagSelector({ filters, onFilterChange }) {
  const foodTypes = getUniqueValues("food_type");
  const tags = getUniqueValues("tag");
  const serviceTypes = getUniqueValues("service_type");
  const menuPrices = getUniqueValues("menu_price");

  // 공통 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div style={{ padding: "1rem" }}>
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
        {menuPrices.map((price, i) => (
          <option key={i} value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
}
