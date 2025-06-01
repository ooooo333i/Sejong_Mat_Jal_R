import * as React from 'react';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Card from './card';
import restaurantData from './allAboutInfo.json';
import ScrollTop from './scrolltop'; // 위에서 만든 컴포넌트 import

export default function ScrollView({ filters }) {
  const { food_type, tag, service_type, menu_price } = filters;

  //filtering data
  const filteredData = restaurantData.filter((item) => {
    return (
      (!food_type || item.food_type === food_type) &&
      (!tag || item.tag === tag) &&
      (!service_type || item.service_type === service_type) &&
      (!menu_price || item.menu_price === menu_price)
    );
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