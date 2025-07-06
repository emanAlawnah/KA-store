import React from 'react'  // Added missing React import
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import AxiosAuth from '../../api/AxiosAuth'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, Navigate, useNavigate } from 'react-router'  // Fixed import
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styles from './changepassword.module.css'

export default function ChangePassword() {
  const navigate =useNavigate();
  
  const [showPasswords, setShowPasswords] = React.useState({
    old: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await AxiosAuth.patch('/Account/ChangePassword', {
        OldPassword: data.oldPassword,
        NewPassword: data.newPassword,
        ConfirmNewPassword: data.confirmPassword
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
      navigate('/Profile/info');
    },
    onError: (error) => {
      const serverErrors = error.response?.data;
      
      
      if (Array.isArray(serverErrors)) {
        const errorMessage = serverErrors.map(e => e.description).join(', ');
        toast.error(errorMessage || "Password change failed");
      } else if (serverErrors?.message) {
        toast.error(serverErrors.message);
      }
    }
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box sx={{width:'100%'}} className={styles.forgetpass} >
      <Box sx={{width:'70%',height:'fit-content'}} className={styles.rightside}>
        <Box sx={{ml:'10px'}} className={styles.first}>
          <Typography variant="h5">Set a New Password</Typography>
          <Typography variant="body2" color="textSecondary">
            Create a strong password to secure your account.
          </Typography>
        </Box>
      
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="old-password">Old Password</InputLabel>
            <OutlinedInput
              
              {...register("oldPassword", { required: "Old password is required" })}
              id="old-password" 
              type={showPasswords.old ? 'text' : 'password'}
              error={!!errors.oldPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('old')}
                    edge="end"
                  >
                    {showPasswords.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
             sx={{
              borderRadius: '30px',
             
            }}
            />
            {errors.oldPassword && (
              <Typography color="error" variant="caption">
                {errors.oldPassword.message}
              </Typography>
            )}
          </FormControl>

         
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="new-password">New Password</InputLabel>
            <OutlinedInput
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
              
              })}
              id="new-password"  
              type={showPasswords.new ? 'text' : 'password'}
              error={!!errors.newPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
              sx={{
              borderRadius: '30px',
             
            }}
            />
            {errors.newPassword && (
              <Typography color="error" variant="caption">
                {errors.newPassword.message}
              </Typography>
            )}
            <Typography variant="caption" color="textSecondary">
              Must be at least 8 characters with uppercase, lowercase, number, and special character
            </Typography>
          </FormControl>

         
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: value => 
                  value === newPassword || "Passwords do not match"
              })}
              id="confirm-password" 
              type={showPasswords.confirm ? 'text' : 'password'}
              error={!!errors.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              sx={{
              borderRadius: '30px',
             
            }}
            />
            {errors.confirmPassword && (
              <Typography color="error" variant="caption">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </FormControl>

          <Box mt={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              disabled={mutation.isLoading}
              
              sx={{backgroundColor:'#4FC4CA'}}
            >
              {mutation.isLoading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </Box>
        </form>

        
      </Box>
    </Box>
  );
}