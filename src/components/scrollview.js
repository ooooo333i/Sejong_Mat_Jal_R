import { Box } from "@mui/material";
import Card from "./card";
import restaurantData from "./tmp.json";

export default function ScrollView({ selectedTags }) {
  const filteredData =
    selectedTags.length === 0
      ? restaurantData // 전체 보기
      : restaurantData.filter((item) => selectedTags.includes(item.majorTag));

  return (
    <Box
      sx={{
        height: "90vh",
        overflowY: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 1,
        p: 2,
      }}
    >
      {filteredData.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </Box>
  );
}
