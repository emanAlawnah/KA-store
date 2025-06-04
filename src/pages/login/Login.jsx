import React from 'react'
import styles from './login.module.css'
import { Apple, EmailOutlined, FacebookOutlined, Google, Height, HttpsOutlined } from '@mui/icons-material'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

export default function Login() {
  const {register ,handleSubmit }=useForm();
  const loginform =async(values)=>{
  const responce= await axios.post(`http://mytshop.runasp.net/api/Account/Login`,values);
  }
  return (
      <>
      <Box component={'div'} className={styles.logoncont} sx={{width:'100%'}} >
        <Box component ={'div'} className={styles.leftcont} sx={{}}>
          
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
      <Box component={'form'} className={styles.formcont} onSubmit={handleSubmit (loginform)}>
    
     
      
      
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
              </InputAdornment >,
            },
          }}
        />

             <TextField
             {...register ("password")}
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
        />
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
      >Login</Button>
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
