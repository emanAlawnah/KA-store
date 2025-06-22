import React from 'react'
import Navbar from '../componants/navbar/Navbar'
import Footer from '../componants/footer/Footer'
import { Outlet } from 'react-router'
import { Container } from '@mui/material'

export default function MainLayout() {
  return (
    <>
    
     <Navbar/>
    <Container>
      <Outlet/>
    </Container>
    
    <Footer/>
    
    </>
  )
}
