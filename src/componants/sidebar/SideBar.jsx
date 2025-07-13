import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Button, Divider } from '@mui/material';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router';
import { Link } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import useUserInfo from '../useUserInfo';
import { Key, LocalMall, Logout, Person } from '@mui/icons-material';
export default function SideBar() {
  const navigate =useNavigate();
  const logout=()=>{
    const token=localStorage.getItem('token');
    localStorage.removeItem('token');
    navigate('/');
  }
    const queryClient =useQueryClient();
   const { data, isLoading, isError, error } = useUserInfo();
   const userName = data?.userName;
    function UploadAvatars() {
    const [avatarSrc, setAvatarSrc] = React.useState(()=>{
    return localStorage.getItem('avatarSrc');
  });

  

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgData =reader.result;
        setAvatarSrc(imgData);
        localStorage.setItem('avatarSrc',imgData)
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} 
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar alt="Upload new avatar" src={avatarSrc} />
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
  );
  }

  return (
    <Box sx={{mt:'20px',display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F2F2F2',
    gap:'10px',
    ml:'20px',
    p:'40px',
    borderRadius:'15px'
    }}>
      <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%'}}>
      <UploadAvatars/>
       {userName}
        <Divider sx={{ width: '100%', my: 2 }} />
      </Box>
     
    <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',width: '100%'}} >
      <Button component={RouterLink} sx={{textDecoration: 'none',color: '#16123F', display:'flex',alignItems:'center',justifyContent:'center',
    '&:hover': {
      color: '#4FC4CA',
    },
    '&:active': {
      color: '#2B9AA8',
      backgroundColor:'#4FC4CA'
    },
     }} to='info'> <Person/> <p>user information</p></Button>

  <Button component={RouterLink} sx={{textDecoration: 'none',color:'#16123F', display:'flex',alignItems:'center',justifyContent:'center',
   '&:hover': {
      color: '#4FC4CA',
    },
    '&:active': {
      color: '#2B9AA8', 
    },
        }} to='Orders'><LocalMall/><p>orders</p></Button>
        
          <Button component={RouterLink} sx={{textDecoration: 'none',color:'#16123F', display:'flex',alignItems:'center',justifyContent:'center',
   '&:hover': {
      color: '#4FC4CA',
    },
    '&:active': {
      color: '#2B9AA8', 
    },
        }} to='changPasword'> <Key/><p>change pasword</p></Button>

    <Divider sx={{ width: '100%', my: 2 }} />

    </Box>
     
    <Button onClick={logout}><Logout/></Button>
    </Box>
  )
}

