import * as React from "react";
import { Box, Button, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Card from "./card";
import ScrollTop from "./scrolltop";

const ITEMS_PER_PAGE = 20;

export default function ScrollView({ filteredData = [], filterKey }) {
  const [page, setPage] = React.useState(1);

  // 필터가 변경될 때 페이지를 1로 리셋
  React.useEffect(() => {
    setPage(1);
  }, [filterKey]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const visibleData = filteredData.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = visibleData.length < filteredData.length;

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
        {visibleData.map((item, idx) => (
          <Card
            key={`${idx}-${filterKey || 'default'}`}
            data={item}
          />
        ))}
      </Box>

      {hasMore && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handleLoadMore}>
            더보기
          </Button>
        </Box>
      )}

      <ScrollTop>
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}