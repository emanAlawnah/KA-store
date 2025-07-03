import React, { useState } from 'react'
import styles from './resetpass.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { EmailOutlined } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { grey } from '@mui/material/colors'

import axios from 'axios'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Bounce, toast } from 'react-toastify'


export default function ResetPass() {
  const navigate =useNavigate();
  
  const ResetPassMutation = useMutation({
    mutationFn :async(values)=>{
      const response = await axios.post(`https://mytshop.runasp.net/api/Account/ForgotPassword`,values);
       return response.data;
    },
    
   onSuccess: (_, variables) =>{
toast.success('Please check your email', {
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
     localStorage.setItem("userEmail", variables.email);
     navigate('/auth/verifycode');
    },

    onError:(err)=>{
      toast.error('Please enter a valied email', {
      position: "bottom-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });
    console.error('error: ',err.message);
    }
  })
  const {register ,handleSubmit,formState:{errors} }=useForm({mode:'onBlur'});
  
  const ResetPas =async(values)=>{
    ResetPassMutation.mutate(values);
  }
  return (
   <>
    <Box component={'div'} className={styles.forgetpass}>
    <Box component={'div'} className={styles.leftside}>
      
    </Box>
    <Box component={'div'} className={styles.rightside}>
     <Box component={'div'} className={styles.first}>
    <h2>Step 1</h2>
    <h2>Forget Password</h2>
    <Box component={'p'}  sx={{
                    color: 'gray',
                    borderColor:grey[500],
                    borderRadius :'15px',
                 }}
    >Please enter your phone number and we’ll send you a recovery code.</Box>
     </Box>
      
      <Box component={'form'} onSubmit={handleSubmit(ResetPas)}>
          <TextField
                   {...register ("email",{ required: true })}
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
                 />
                 
                 <Box component='div' sx={{width :'100%'}} className={styles.btnbox}>
                   
                    <Button variant="contained" type='submit' className={styles.regbtn}
                    sx={{
                                color:'black',
                                backgroundColor:'#48436a',
                                width :'50%',
                                borderRadius:'30px'
                            }}
                         >Send Code
                    </Button>
                 
           
                    </Box>

     </Box>

      <Box component='div' className={styles.haveanacount}>
       <Box component='p'>Remembered your password?</Box>
       <Link to='/auth/login'>Login</Link>
    </Box>       
    </Box>
    </Box>
   </>
  )
}
