import React, { useState } from "react";
import ScrollView from "./components/scrollview";
import TagSelector from "./components/Tag";
import Footer from "./components/footer";
import CustomAppBar from "./components/appBar";
import { Box, Toolbar } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  const [filters, setFilters] = useState({
    food_type: "",
    tag: "",
    service_type: "",
    menu_price: "",
  });

  const [filteredData, setFilteredData] = useState([]);

  const handleFilteredDataChange = (data) => {
    setFilteredData(data);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 필터 변경을 감지하기 위한 키 생성
  const filterKey = `${filters.food_type}-${filters.tag}-${filters.service_type}-${filters.menu_price}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        {/* 반응형 AppBar */}
        <CustomAppBar />

        {/* AppBar 높이만큼 상단 여백 추가 */}
        <Toolbar />

        <TagSelector
          onFilteredDataChange={handleFilteredDataChange}
          onFiltersChange={handleFiltersChange}
        />
        <Box component="main" flex={1}>
          <ScrollView
            filteredData={filteredData}
            filterKey={filterKey}
          />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
