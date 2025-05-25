import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Fab, Fade } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Card from './card';
import restaurantData from './tmp1.json';

function ScrollTop({ children, containerRef }) {
  const trigger = useScrollTrigger({
    target: containerRef?.current ?? undefined,
    disableHysteresis: true,
    threshold: 1,
  });

  const handleClick = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  containerRef: PropTypes.object.isRequired,
};

export default function ScrollView({ selectedTags }) {
  const containerRef = React.useRef();

  const filteredData =
    selectedTags.length === 0
      ? restaurantData
      : restaurantData.filter((item) => selectedTags.includes(item.majorTag));

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          height: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 1,
          p: 2,
        }}
      >
        {filteredData.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </Box>

      <ScrollTop containerRef={containerRef}>
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}