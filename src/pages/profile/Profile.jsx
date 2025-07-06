import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../componants/sidebar/SideBar'
import { WavingHand } from '@mui/icons-material'

export default function Profile() {
  return (
    <Box sx={{width:'60vw',height: '100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
           
         <WavingHand/>
         <h2>Welcome to your profile</h2>
        
         
    </Box>
  )
}
