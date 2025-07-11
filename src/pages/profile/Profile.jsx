import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../componants/sidebar/SideBar'
import { WavingHand } from '@mui/icons-material'
import useUserInfo from '../../componants/useUserInfo'
import Loader from '../../componants/shared/Loader'

export default function Profile() {
  const {data,isLoading, isError, error}=useUserInfo();
      if(isLoading) return <Loader/>
       if(isError) return<p>error : {error.message}</p>
       if (!data) return <p>No user info found</p>;
  return (
    <Box sx={{width:'60vw',height: '100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
           
         <WavingHand/>
         <h2>Welcome {data.userName}</h2>
        
         
    </Box>
  )
}
