import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import AxiosAuth from '../../api/AxiosAuth'
import { useQuery } from '@tanstack/react-query';
import Loader from '../../componants/shared/Loader';
import { EmailOutlined, PermIdentityOutlined } from '@mui/icons-material';
import { grey } from '@mui/material/colors'

import styles from './info.module.css'
export default function Info() {
    const fetchUserInfo= async()=>{
       const {data}= await AxiosAuth.get('/Account/userinfo');
       return data;
    }

     const {data,isLoading,isError,error}=useQuery({
      queryKey:['userInfo'],
      queryFn:fetchUserInfo,
      staleTime:1000*60*60*1000,
      refetchOnWindowFocus:true,
      retry:3
     })
     if(isLoading) return <Loader/>
     if(isError) return<p>error : {error.message}</p>
     if (!data) return <p>No user info found</p>;
     
  return (
     <Box sx={{display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'center'}}>
       <Typography variant='h2' sx={{ fontSize: '20px', fontWeight: 'bold',mb:'15px' }}>
         user information
       </Typography>
      <Box sx={{display:'flex',flex:'wrap'}}>
         <TextField
         value={data.firstName}
         disabled={true}
         className='textfild'
          label="First Name"
          id="outlined-start-adornment"
              sx={{
               m: 1,
               width: '50%',
               color: 'warning',
                borderColor:grey[500],
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', 
              }
            }}
          slotProps={{
            input: {
              
              startAdornment: <InputAdornment position="start" sx={{borderRadius:'16px'}} >
                <PermIdentityOutlined/>
              </InputAdornment>,
            },
          }}
         
        />

          <TextField 
           value={data.lastName}
           disabled
          className='textfild'
          label="last Name"
          id="outlined-start-adornment"
              sx={{
               m: 1,
               width: '50%',
               color: 'gray',
                borderColor:grey[500],
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', 
              }
            }}
          slotProps={{
            input: {
              
              startAdornment: <InputAdornment position="start" sx={{borderRadius:'16px'}} >
                <PermIdentityOutlined/>
              </InputAdornment>,
            },
          }}
         
        />

         
         

      </Box>
          <TextField 
           value={data.userName}
           disabled={true}
          className='textfild'
          label="userName"
          id="outlined-start-adornment"
              sx={{
               m: 1,
               width: '100%',
               color: 'gray',
                borderColor:grey[500],
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', 
              }
            }}
          slotProps={{
            input: {
              
              startAdornment: <InputAdornment position="start" sx={{borderRadius:'16px'}} >
                <PermIdentityOutlined/>
              </InputAdornment>,
            },
          }}
         
        />
           <TextField
        
          value={data.email}
          
          type='email'
          label="User Email"
          id="outlined-start-adornment"
           sx={{
               m: 1,
               width: '98%',
               color: 'gray',
                borderColor:grey[500],
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px', 
              }
            }}
          
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>,
            },
          }}
        

          
        />
        <TextField
  type="date"
  label="Date of Birth"
  value={data.birthOfDate?.split('T')[0] || ''} 
  disabled
  sx={{
    m: 1,
    width: '50%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
    }
  }}
  slotProps={{
    shrink: true, 
  }}
  input={{
    sx: {
      '& input.Mui-disabled': {
        color: 'black'
      }
    }
  }}
/>

       

       
    </Box>
  )
}
