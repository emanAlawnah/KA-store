import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
export default function SideBar() {
    const queryClient =useQueryClient();
    const userInfo =queryClient.getQueryData(['userInfo']);
   const userName = userInfo?.userName;
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
      tabIndex={-1} // prevent label from tab focus
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
    gap:'15px',
    ml:'20px',
    p:'40px',
    borderRadius:'15px'
    }}>
     <UploadAvatars/>
     {userName}
        
     <Button component={RouterLink} sx={{textDecoration: 'none',color: '#16123F',
    '&:hover': {
      color: '#4FC4CA',
    },
    '&:active': {
      color: '#2B9AA8',
      backgroundColor:'#4FC4CA'
    },
     }} to='info'>user information</Button>

  <Button component={RouterLink} sx={{textDecoration: 'none',color:'#16123F',
   '&:hover': {
      color: '#4FC4CA',
    },
    '&:active': {
      color: '#2B9AA8', 
    },
        }} to='Orders'>orders</Button>
        
          <Button component={RouterLink} sx={{textDecoration: 'none',color:'#16123F',
   '&:hover': {
      color: '#4FC4CA',
    },
    '&:active': {
      color: '#2B9AA8', 
    },
        }} to='changPasword'>change pasword</Button>
   
    </Box>
  )
}

