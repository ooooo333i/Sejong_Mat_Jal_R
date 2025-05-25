import React from "react";
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
  Avatar, IconButton, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";

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

export default function UpdateCard({data}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 300, minWidth: 300, minHeight: 420, m: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {data.name[0]} {/* 이름 첫 글자 */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
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
          {data.address}
        </Typography>
        <Typography>{data.majorTag} ⭐ 평점: {data.rating} </Typography>
      </CardContent>
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
            <a href={data.detail_link} target="_blank" rel="noopener noreferrer">
              상세페이지
            </a>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
