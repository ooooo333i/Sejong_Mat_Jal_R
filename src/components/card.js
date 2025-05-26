import React from "react";
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
  Avatar, IconButton, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,

} from "@mui/icons-material";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function UpdateCard({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // 아이콘 URL
  const icons = {
    phone: "https://img.icons8.com/ios-glyphs/15/phone--v1.png",
    place: "https://img.icons8.com/pastel-glyph/15/place-marker.png",
    star: "https://img.icons8.com/fluency/15/star--v1.png",
  };

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300, minHeight: 420, m: 1 }}>
      <CardActionArea component="a" href={data.detail_link}>
        <CardHeader
          title={data.name}
          subheader={data.majorTag}
        />
        <CardMedia
          component="img"
          height="194"
          image={data.image_url} // 나중에 data.image로 대체 가능
          alt={data.name}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <img width="15" height="15" src={icons.place} alt="place-marker" /> &nbsp;
            {data.address}
          </Typography>

          <Box display="flex" alignItems="center">
            {data.rating} &nbsp;
            <Rating name="rating-read" defaultValue={data.rating} size="small" precision={0.1} readOnly />
          </Box>

          <Typography>
            <img width="15" height="15" src={icons.phone} alt="phone--v1" /> &nbsp;
            {data.phone}
          </Typography>

          <Typography><a href={data.detail_link} target="_blank" rel="noopener noreferrer">

          </a>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" sx={{ mt: 2 }}>
            이 식당은 {data.majorTag} 분류에 속하며, 지도 좌표는 위도 {data.location.lat}, 경도 {data.location.lng}입니다.
            {data.sample_reviews}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
