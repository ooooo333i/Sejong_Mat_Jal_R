import * as React from 'react';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Card from './card';
import restaurantData from './allAboutInfo.json';
import ScrollTop from './scrolltop'; // 위에서 만든 컴포넌트 import
import { convertPriceToRange } from './Tag'; // 가격 변환 함수 import

export default function ScrollView({ filters }) {
  const { food_type, tag, service_type, menu_price } = filters;

  // 필터
  const filteredData = restaurantData.filter((item) => {
    // 음식 유형
    if (food_type && item.food_type !== food_type) {
      return false;
    }
    // 매장 유형
    if (tag && item.tag !== tag) {
      return false;
    }
    // 서비스 유형
    if (service_type && item.service_type !== service_type) {
      return false;
    }
    // 가격대 필터
    if (menu_price) {
      const itemPriceRange = convertPriceToRange(item.menu_price);
      if (itemPriceRange !== menu_price) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 1,
          p: 2,
        }}
      >
        {filteredData.map((item, idx) => (
          <Card key={idx} data={item} />
        ))}
      </Box>
      <ScrollTop>
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}