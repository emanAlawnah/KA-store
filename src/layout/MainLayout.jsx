import React from 'react'
import Navbar from '../componants/navbar/Navbar'
import Footer from '../componants/footer/Footer'
import { Outlet } from 'react-router'
import { Box, Container, Toolbar } from '@mui/material'

export default function MainLayout() {
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar/>
        <Toolbar />
       <Box sx={{ flex: 1 }}>
        <Outlet/>
       </Box>
      
    
    <Footer/>
    
    </Box>
   
    
    
    </>
  )
}
