import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { grey } from '@mui/material/colors'

import styles from './resetpasscode.module.css'
import { Link, useNavigate } from 'react-router';
export default function ResetPassCode() {
         const{register,handleSubmit}=useForm();
         const navigate =useNavigate();

         const ResetPas =(data)=>{
          localStorage.setItem("verifyCode", data.code);

          navigate('/auth/newpassword');

          };

  return (
    <>
    <Box component={'div'} className={styles.forgetpass}>
    <Box component={'div'} className={styles.leftside}>
      
    </Box>
    <Box component={'div'} className={styles.rightside}>
     <Box component={'div'} className={styles.first}>
    <h2>Step 2</h2>
    <h2>Enter Verification Code</h2>
    <Box component={'p'}  sx={{
                    color: 'gray',
                    borderColor:grey[500],
                    borderRadius :'15px',
                 }}
    >We have sent OTP code via email,please enter it below to reset your password.</Box>
     </Box>
      
      <Box component={'form'} onSubmit={handleSubmit(ResetPas)}>
          <TextField
                   {...register ("code")}
                   placeholder='xxxxx'
                   type='text'
                   label="Verification Code"
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
                       </InputAdornment>,
                     },
                   }}
                 />
                 <Box className={styles.didntgetCode}>
                    <p>Didn’t get a code?</p>
                    <Link to='/auth/resetPassword'>Resend code</Link>
                 </Box>
                 
                 <Box component='div' sx={{width :'100%'}} className={styles.btnbox}>
                   
                    <Button variant="contained" type='submit' className={styles.regbtn}
                    sx={{
                                color:'black',
                                backgroundColor:'#48436a',
                                width :'50%',
                                borderRadius:'30px'
                            }}
                         >Continue
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
