import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './regester.module.css'
import {  Apple, CalendarMonthOutlined, EmailOutlined, FacebookOutlined, Google, HttpsOutlined, PermIdentityOutlined } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router';
import { Bounce, toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function Register() {

  const regesetMutation=useMutation({
    mutationFn:async(values)=>{
      const responce =await axios.post(`https://mytshop.runasp.net/api/Account/register`,values);
      return responce.data;
    },
    onSuccess:(data)=>{
      
      toast.success('regesterd successfully', {
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
 navigate('/'); 
    },
    onError:(error)=>{
      if(error){
      

    toast.error('Please fix the highlighted errors', {
      position: "bottom-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });
      }else{
        toast.error('Registration failed', {
      position: "bottom-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });
      }
    console.error("Error :", error.message);

    }
  });
  const regesterform =async(values)=>{
      regesetMutation.mutate(values);
  }
  
  const {register ,handleSubmit,formState:{errors} }=useForm({mode:'onBlur'});
   
  return (
        <Box component={'div'} className={styles.regcont}>
          <Box className={styles.leftcont}>
             <Link to ='/'>
               <img src='/logoo.svg'/>
              </Link>
          </Box>
      
    <Box component={'div'} className={styles.rightcont}>

      <Box component={'div'}>
        <Box component={'h2'} className={styles.reg}>Create New Account</Box>
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
    <Box component={'form'} className={styles.formcont} onSubmit={handleSubmit(regesterform)}>
    
      <Box className={styles.namecont}>
          <TextField  className='textfild'
          {...register ("firstName",{
            required:'first name is required '
          })}
          label="First Name"
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
          helperText={errors.firstName?.message}
          error={errors.firstName}
        />
           <TextField
           {...register ("lastName",{
            required:'last name is required'
           })}
          
          label="Last Name"
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
              startAdornment: <InputAdornment position="start">
                <PermIdentityOutlined/>
              </InputAdornment>,
            },
          }}
          helperText={errors.lastName?.message}
          error={errors.lastName}
        />

      </Box>
      
      <Box className={styles.emacont}>
         <TextField
         {...register ("userName",{
          required:'username is required',
         })}
          label="User Name"
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
                <PermIdentityOutlined/>
              </InputAdornment>,
            },
          }}
           helperText={errors.userName?.message}
           error={errors.userName}
        />
          <TextField
          {...register ("email",{
            required:'email is required',
            minLength:{
              value:5,
              message:'email must be at least 5 characters'
            }
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
              </InputAdornment>,
            },
          }}
          helperText={errors.email?.message}
          error={errors.email}

          
        />
            
             <TextField
             {...register ("password",{
              required:'password is required',
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
          
            <TextField
            {...register ("confirmPassword",{
              required:'confirmPassword is requred'
            })}
             type='Password'
          label="Confirm Password"
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
                <HttpsOutlined/>
              </InputAdornment>,
            },
          }}
          helperText={errors.confirmPassword?.message}
          error={errors.confirmPassword}
        />

              <TextField
              {...register ("birthOfDate",{
                required:'birth Of Date is requirde'
              })}
              type='date'

          label="Birth Of Date"
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
                <CalendarMonthOutlined/>
              </InputAdornment>,
            },
          }}
           helperText={errors.birthOfDate?.message}
           error={errors.birthOfDate}

        />
        <Box component='div' sx={{width :'100%'}} className={styles.btnbox}>
           <Button variant="contained" type='submit' className={styles.regbtn} 
      sx={{
                color:'black',
                borderColor:grey[500],
                width :'50%',
                borderRadius:'30px'
             }}
      > {regesetMutation.isPending ?  'Loading...' : 'register' }</Button>
        </Box>

        
       
    

      </Box>
         
             
    </Box>
    <Box component='div' className={styles.haveanacount}>
       <Box component='p'>Already have an Account?</Box>
      <Link to='/auth/login'>Login</Link>
    </Box>
     
    </Box>
      
     </Box>
  )
}
