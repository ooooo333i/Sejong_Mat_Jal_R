import React, { useState } from "react";
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Map from "./map";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import MapIcon from '@mui/icons-material/Map';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
}));

export default function UpdateCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMapClick = () => {
    setShowMap(!showMap);
  };

  const icons = {
    phone: "https://img.icons8.com/ios-glyphs/15/phone--v1.png",
    place: "https://img.icons8.com/pastel-glyph/15/place-marker.png",
    star: "https://img.icons8.com/fluency/15/star--v1.png",
    marker: "https://img.icons8.com/color/15/place-marker--v1.png"
  };

  return (
    <Card sx={{
      maxWidth: 300,
      minWidth: 320,
      minHeight: 430,
      m: 1,
      position: "relative", // 부모를 기준으로 오버레이 배치
      overflow: "hidden"
    }}>
      <CardActionArea component="a" href={data.detail_link} target="_blank">
        {/* 카드 헤더 */}
        <CardHeader title={data.name} subheader={data.majorTag} />
        {/* 카드 내용 */}
        <CardMedia
          component="img"
          height="194"
          image={data.image_url}
          alt={data.name}
        />
        <CardContent>
          {/* 주소 */}
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <img width="15" height="15" src={icons.place} alt="place-marker" /> &nbsp;
            {data.address}
          </Typography>
          {/* 평점 */}
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ mr: 1 }}>
              {data.rating}
            </Typography>
            <Rating
              name="rating-read"
              defaultValue={data.rating}
              size="small"
              precision={0.1}
              readOnly
            />
            <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
              ({data.review_count})
            </Typography>
          </Box>
          {/* 전화번호 */}
          <Typography>
            <img width="15" height="15" src={icons.phone} alt="phone--v1" /> &nbsp;
            {data.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* 추가 옵션? */}
      <CardActions disableSpacing>
        {/* 북마크 아이콘*/}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* 공유 아이콘*/}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* 지도 아이콘 */}
        <IconButton aria-label="marker" onClick={handleMapClick}>
          <MapIcon alt="place-marker--v1" />
        </IconButton>
        {/* 더보기 */}
        {/*
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        */}
      </CardActions>

      {/* 리뷰 영역 */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {data.sample_reviews}
          </Typography>
        </CardContent>
      </Collapse>

      {/* 지도(오버레이) */}
      {showMap && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.95)", // 반투명 배경
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}>
          <Map address={data.address} />
          &nbsp;
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <img width="15" height="15" src={icons.place} alt="place-marker" /> &nbsp;
            {data.address}
          </Typography>

          {/* 닫기 버튼 */}
          <IconButton
            onClick={handleMapClick}
            sx={{ position: "absolute", top: 10, right: 10 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}
