import React, { useState } from "react";
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
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
  const [showMap, setShowMap] = useState(false);

  const handleMapClick = () => {
    setShowMap(!showMap);
  };

  const icons = {
    phone: "https://img.icons8.com/ios-glyphs/15/phone--v1.png",
    place: "https://img.icons8.com/pastel-glyph/15/place-marker.png",
    star: "https://img.icons8.com/fluency/15/star--v1.png",
  };

  return (
    <Card sx={{
      maxWidth: 300,
      minWidth: 320,
      minHeight: 450,
      m: 1,
      position: "relative", // 부모를 기준으로 오버레이 배치
      overflow: "hidden"
    }}>
      <CardActionArea component="a" href={data.detail_link} target="_blank" sx={{ height: 400 }}>
        {/* 카드 헤더 */}
        <CardHeader title={data.name} subheader={data.majorTag} sx={{
          height: 90,
          alignItems: 'flex-start',
          '& .MuiCardHeader-content': {
            overflow: 'hidden'
          },
          '& .MuiCardHeader-title': {
            fontSize: '1.4rem',
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.875rem',
            marginTop: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }} />
        {/* 카드 내용 */}
        <CardMedia
          component="img"
          height="210"
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
              {data.rating ? data.rating : "미제공"}
            </Typography>
            {data.rating ? (
              <>
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
              </>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                (평점 정보 없음)
              </Typography>
            )}
          </Box>
          {/* 전화번호 */}
          <Typography>
            <img width="15" height="15" src={icons.phone} alt="phone--v1" /> &nbsp;
            {data.phone || "미제공"}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* 추가 옵션 */}
      <CardActions disableSpacing>
        {/* 지도 아이콘 */}
        <IconButton aria-label="marker" onClick={handleMapClick}>
          <MapIcon alt="place-marker--v1" />
        </IconButton>
      </CardActions>

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