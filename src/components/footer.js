import React from 'react';
import { Box, Typography, IconButton, Container, Stack } from '@mui/material';
import { Instagram, SchoolOutlined } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#fff', py: 4, boxShadow: '0px -1px 5px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Mat Jal R. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton color="primary" aria-label="instagram" href="https://www.instagram.com/sejong_univ/?hl=ko">
              <Instagram />
            </IconButton>
            <IconButton color="primary" aria-label="school" href="http://www.sejong.ac.kr/">
              <SchoolOutlined />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;