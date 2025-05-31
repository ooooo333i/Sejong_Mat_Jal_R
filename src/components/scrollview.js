import * as React from 'react';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Card from './card';
import restaurantData from './tmp1.json';
import ScrollTop from './scrolltop'; // 위에서 만든 컴포넌트 import

export default function ScrollView({ selectedTags }) {
  const filteredData =
    selectedTags.length === 0
      ? restaurantData
      : restaurantData.filter((item) => selectedTags.includes(item.majorTag));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 1,
          p: 2,
        }}
      >
        {filteredData.map((item) => (
          <Card key={item.id} data={item} />
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