// components/Tag.js
import React from "react";
import restaurantData from "./tmp.json";
import { Button, Box } from "@mui/material";

// 중복 제거된 majorTag 목록
const uniqueTags = [...new Set(restaurantData.map(item => item.majorTag))];

export default function TagSelector({ selectedTags, onTagChange }) {
  const isSelected = (tag) => selectedTags.includes(tag);

  const toggleTag = (tag) => {
    if (isSelected(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  const resetTags = () => {
    onTagChange([]); // 전체 보기
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 2 }}>
      <Button
        variant={selectedTags.length === 0 ? "contained" : "outlined"}
        onClick={resetTags}
      >
        전체
      </Button>

      {uniqueTags.map((tag, index) => (
        <Button
          key={index}
          variant={isSelected(tag) ? "contained" : "outlined"}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Button>
      ))}
    </Box>
  );
}
