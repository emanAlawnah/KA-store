import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import styles from './regester.module.css'
import {  Apple, CalendarMonthOutlined, EmailOutlined, FacebookOutlined, Google, HttpsOutlined, PermIdentityOutlined } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router';

export default function Register() {

  const {register ,handleSubmit }=useForm();

  const regesterform = async(values)=>{
     const responce = await axios.post(`http://mytshop.runasp.net/api/Account/register`,values);
  }
  return (
        <Box component={'div'} className={styles.regcont}>
          <Box className={styles.leftcont}>
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
          {...register ("firstName")}
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
        />
           <TextField
           {...register ("lastName")}
          
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
        />

      </Box>
      
      <Box className={styles.emacont}>
         <TextField
         {...register ("userName")}
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
        />
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

            <TextField
            {...register ("confirmPassword")}
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
        />

              <TextField
              {...register ("birthOfDate")}
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
        />
        <Box component='div' sx={{width :'100%'}} className={styles.btnbox}>
           <Button variant="contained" type='submit' className={styles.regbtn}
      sx={{
                 color:'black',
                borderColor:grey[500],
                width :'50%',
                borderRadius:'30px'
             }}
      >Regester</Button>
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
