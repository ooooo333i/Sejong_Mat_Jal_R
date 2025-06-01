import * as React from 'react';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Card from './card';
import ScrollTop from './scrolltop'; // 위에서 만든 컴포넌트 import

export default function ScrollView({ filteredData }) {
  const dataToDisplay = filteredData || [];

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
        {dataToDisplay.map((item, idx) => (
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