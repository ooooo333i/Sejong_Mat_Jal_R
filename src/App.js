import React, { useState } from "react";
import ScrollView from "./components/scrollview";
import TagSelector from "./components/Tag";
import Footer from "./components/footer";
import { Box } from "@mui/material";
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

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <TagSelector onFilteredDataChange={handleFilteredDataChange} />
        <Box component="main" flex={1}>
          <ScrollView filteredData={filteredData} />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
