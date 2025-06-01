import React, { useState } from "react";
import ScrollView from "./components/scrollview";
import TagSelector from "./components/Tag";
import Footer from "./components/footer";
import { Box } from "@mui/material";

function App() {
  const [filters, setFilters] = useState({
    food_type: "",
    tag: "",
    service_type: "",
    menu_price: ""
  });

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TagSelector filters={filters} onFilterChange={setFilters} />
      <ScrollView filters={filters} />
      <Footer />
    </Box>
  );
}

export default App;
