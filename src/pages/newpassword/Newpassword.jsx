import React from 'react'
import styles from './newpassword.module.css'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
export default function Newpassword() {
      const navigate=useNavigate();
      const mutation=useMutation({
        mutationFn:async(data)=>{
          const email =localStorage.getItem("userEmail");
          const code =localStorage.getItem("verifyCode");
           const payload = {
              email,
              code,
              password: data.password,
             ConfirmPassword: data.ConfirmPassword,
            };
            const response =await axios.patch(`https://mytshop.runasp.net/api/Account/SendCode`, payload);
            return response.data;
        },
        onSuccess:()=>{
           localStorage.removeItem('userEmail');
           localStorage.removeItem('verifyCode');
           navigate("/auth/login");
           toast.success("Password reset successfully");
           navigate("/auth/login");
        },
        onError:(error)=>{
           toast.error(
      error?.response?.data?.message ||
      error?.response?.data?.Message ||
      "Something went wrong"
    );
        }
      });

      const ResetPas=(data)=>{
        mutation.mutate(data);
      }
      const [showPassword, setShowPassword] = React.useState(false);
      
      const handleClickShowPassword = () => setShowPassword((show) => !show);
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
  };


  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


    const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

   


  return (
    <>
    <Box component={'div'} className={styles.forgetpass}>
      
    <Box component={'div'} className={styles.leftside}>
        <Link to ='/'>
           <img src='/logoo.svg'/>
        </Link>
    </Box>
    <Box component={'div'} className={styles.rightside}>
     <Box component={'div'} className={styles.first}>
    <h2>Step 3</h2>
    <h2>Set a New Password</h2>
    <Box component={'p'}  sx={{
                    color: 'gray',
                    borderColor:grey[500],
                    borderRadius :'15px',
                 }}
    > Create a strong password to secure your account.</Box>
     </Box>
      
      <Box component={'form'} onSubmit={handleSubmit(ResetPas)}>
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
           
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          {...register("password")}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

          
        </FormControl>
         <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            
          <InputLabel htmlFor="outlined-adornment-password">conferm Password</InputLabel>
          <OutlinedInput
          {...register("ConfirmPassword")}
            id="outlined-adornment-passwordd"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <Box component={'p' } 
            sx={{
                    color: 'gray',
                    borderColor:grey[500],
                    borderRadius :'15px',
                 }}>Must be at least 8 characters long</Box>
          
        </FormControl>
                 
                 
                 <Box component='div' sx={{width :'100%'}} className={styles.btnbox}>
                   
                    <Button variant="contained" type='submit' className={styles.regbtn}
                    sx={{
                                color:'black',
                                backgroundColor:'#48436a',
                                width :'50%',
                                borderRadius:'30px'
                            }}
                         >Reset Password
                    </Button>
                 
           
                    </Box>

     </Box>

      <Box component='div' className={styles.haveanacount}>
       <Box component='p'>go to login</Box>
       <Link to='/auth/login'>Login</Link>
    </Box>       
    </Box>
    </Box>
    
    </>
  )
}
