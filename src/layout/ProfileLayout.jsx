import { Box, Grid, Toolbar } from '@mui/material';
import React from 'react';
import Navbar from '../componants/navbar/Navbar';
import SideBar from '../componants/sidebar/SideBar';
import { Outlet } from 'react-router';
import Footer from '../componants/footer/Footer';

export default function ProfileLayout() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
       <Toolbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Grid container sx={{gap:'20px',mt:'20px'}}>
          <Grid item xs={12} md={3}>
            <SideBar />
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ p: 3 }}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
