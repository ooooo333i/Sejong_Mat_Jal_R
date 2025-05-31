import React from 'react';
import { Box, Typography, IconButton, Container, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

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
            © 2020 Mat Jal R. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton color="primary" aria-label="facebook">
              <Facebook />
            </IconButton>
            <IconButton color="primary" aria-label="twitter">
              <Twitter />
            </IconButton>
            <IconButton color="primary" aria-label="instagram">
              <Instagram />
            </IconButton>
            <IconButton color="primary" aria-label="linkedin">
              <LinkedIn />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;