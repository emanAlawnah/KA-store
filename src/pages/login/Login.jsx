import React, { useState } from 'react'
import styles from './login.module.css'
import { Apple, EmailOutlined, FacebookOutlined, Google, Height, HttpsOutlined, Mode, Mood } from '@mui/icons-material'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link, Navigate, replace, useNavigate } from 'react-router'
import { Bounce, toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function Login() {
  const queryClient = useQueryClient();
  const navigate=useNavigate();

  const loginMutation = useMutation ({
    mutationFn : async(values)=>{
      const responce =await axios.post(`https://mytshop.runasp.net/api/Account/Login`,values);
          return responce.data;

    },
     onSuccess: (data)=>{
    toast.success('logged in successfully', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
      localStorage.setItem("token", data.token);
      navigate('/');

  },
  onError: (error) => {
      toast.error('invalied data', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
      console.error("Error :", error.message);
    },
  });
 
  
  

  const {register ,handleSubmit,formState:{errors} }=useForm({mode:'onBlur'});
 

const loginform = async (values) => {
  loginMutation.mutate(values);
};
  return (
      <>
      <Box component={'div'} className={styles.logoncont} sx={{width:'100%'}} >
        <Box component ={'div'} className={styles.leftcont} sx={{}}>
         
          <Link to ='/'>
          <img src='/logoo.svg'/>
          </Link>
        </Box>

      <Box component={'div'} className={styles.rightcont}>

      <Box component={'div'}>
        <Box component={'h2'} className={styles.reg}>Login</Box>
        <Box component={'p'}
          sx={{
                color: 'gray',
                borderColor:grey[500],
                borderRadius :'15px',
             }}

        >Join us to track orders, save favorites, and get special offers.</Box>
        <Box component={'div'} className={styles.rgbtns}>
             <Button variant="outlined"  startIcon={<FacebookOutlined />}
             
             sx={{
                color:'#312d5f',
                borderColor:grey[500],
                borderRadius :'15px',
             }}
             >
            
              
              Facebook
            </Button>

             <Button variant="outlined" startIcon={< Google />} 
               sx={{
                color:'#312d5f',
                borderColor:grey[500],
                borderRadius :'15px',
             }}>
              Google
            </Button>

             <Button variant="outlined" startIcon={<Apple />}
               sx={{
                color:'#312d5f',
                borderColor:grey[500],
                borderRadius :'15px',
             }}
             >
              Apple ID
            </Button>
            
        </Box>
        <Typography variant="p" component="p" className={styles.dash}
          sx={{
                color:'gray',
                mt:'10px',
                mb:'30px',
               
             }}
        > ـــــــــــــــــــــــــــــــ or ـــــــــــــــــــــــــــــــ</Typography>
      </Box> 
      <Box component={'form'} className={styles.formcont} onSubmit={handleSubmit(loginform)}>
    
     
      
      
          <TextField
          {...register ("email",{
            required:'email is required '
          })}
          placeholder='user@email.com'
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
              </InputAdornment >,
            },
          }}
          helperText={errors.email?.message}
           error={errors.email}
        />

             <TextField
             {...register ("password",{
              required:'password is required'
             })}
             type='password'
          label="password"
          id="outlined-start-adornment"
          className={styles.textFieldstyle}
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
                <HttpsOutlined/>
              </InputAdornment>,
            },
          }}
          helperText={errors.password?.message}
          error={errors.password}
        />
        <Box component='div' sx={{color:'red ', margin: '10px 0'}}>
        {loginMutation.isError && 'Login failed. Please check your credentials.'}

        </Box>
        <Box component={'div'} className={styles.forgotpass}>
           <Link  to={'/auth/resetPassword'}>Forget Password?</Link>
        </Box>
       

            
             
        <Box component='div' sx={{width :'100%'}} className={styles.btnbox}>
           <Button variant="contained" type='submit' className={styles.regbtn} 
      sx={{
                 color:'black',
                borderColor:grey[500],
                width :'50%',
                borderRadius:'30px'
             }}
             >
           {loginMutation.isPending ? 'Loading...' : 'Login'}

      </Button>
        </Box>
        
       
    

      </Box>
      <Box component='div' className={styles.haveanacount}>
       <Box component='p'>Dont Have an Account??</Box>
      <Link to='/auth/register'>Create Account</Link>
      </Box> 
             
    </Box>
   
      </Box> 
      </>
  )
}
