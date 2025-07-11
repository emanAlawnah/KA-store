import { Box, Container, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, Email, LocationOn, Phone, ChatBubbleOutline, Copyright } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router';

export default function Footer() {
  return (
<Box sx={{ backgroundColor: 'black', color: 'white', mt: 5, pt: 5 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">Company</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Blog</Link>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Returns</Link>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Order Status</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">Info</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>How it Works?</Link>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Our Promises</Link>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>FAQ</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">Contact Us</Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <LocationOn />
              <Typography variant="body2">123 Main Street, Anytown, USA</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Phone />
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Email />
              <Typography variant="body2">KastoreSupport@gmail.com</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight="medium">Sign up for News and Updates</Typography>
            <TextField
              fullWidth
              placeholder="Email address"
              variant="outlined"
              sx={{ mt: 1, backgroundColor: 'white', borderRadius: '8px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" gap={1} mt={2}>
              <Facebook />
              <Twitter />
              <Instagram />
              <YouTube />
            </Box>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" mt={4}>
          <Grid item>
            <Box display="flex" gap={2}>
              <img src="/images/paypal.svg" alt="paypal" height={30} />
               <img src="/images/mastercard.svg" alt="mastercard" height={30} />
              <img src="/images/visa.svg" alt="mastercard" height={30} />
              <img src="/images/mastercard.svg" alt="mastercard" height={30} />
            </Box>
          </Grid>
          <Grid item>
            <IconButton>
              <ChatBubbleOutline sx={{ color: 'white' }} />
            </IconButton>
          </Grid>
        </Grid>

        <Box mt={4} py={2} borderTop="1px solid rgba(255,255,255,0.2)">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center" gap={1}>
                <Copyright/>
                <Typography variant="body2">2025 Ka store.</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" gap={3}>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Cookies</Link>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy</Link>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Conditions</Link>
                <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Imprint</Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
