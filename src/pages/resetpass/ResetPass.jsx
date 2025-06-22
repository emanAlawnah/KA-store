import React, { useState } from 'react'
import styles from './resetpass.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { EmailOutlined } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { grey } from '@mui/material/colors'

import axios from 'axios'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'


export default function ResetPass() {
    const {register,handleSubmit}=useForm();
    const [error,seterror]=useState('');
    const [isloading,setisloading]=useState(false);
    const navigate =useNavigate();
    const ResetPas = async(values)=>{
        try{
        const response = await axios.post(`https://mytshop.runasp.net/api/Account/ForgotPassword`,values);
        if (response.status === 200) {
            localStorage.setItem("userEmail",values.email)
            navigate('/auth/verifycode');
        }

        }catch(err){
         seterro(err.message || "Something went wrong");

        }finally {
       setisloading(true); }

    }
    if(isloading){
        return<><p>pls waite</p></>
    }
    if(error){
        return <div>{error}</div>
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
                   {...register ("email")}
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
