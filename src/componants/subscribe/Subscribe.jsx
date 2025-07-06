import { EmailOutlined } from '@mui/icons-material'
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Subscribe() {
  return (
    <Box sx={{mt:'20px',height:'50vh' ,backgroundColor:'#9E97E1',overflow: 'hidden',pt:'30px', pb:'20px',position:'relative'}}>
        <Box sx={{position:'absolute',bottom:'0%',left:'5%', zIndex: 0, }}>
          <img src='./images/Ellipse13.png'></img>
        </Box>
        <Typography sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center',color:'#16123F',position: 'relative',
          zIndex: 1,
          textAlign: 'center',}}>
            <h2> Subscribe Don't Miss a Deal</h2>
            <p>Sign up for the latest discounts, 
             offers, and shopping trends.</p>
        </Typography>
        <Box sx={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap:'20px',
}}>
              <TextField
                      
                      placeholder='user@email.com'
                      type='email'
                      id="outlined-start-adornment"
                       sx={{
                                            
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '30px',
                            backgroundColor: 'white',   
                        },
                        }}
                      
                      slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start">
                            <EmailOutlined />
                          </InputAdornment >,
                        },
                      }}
                      
                    />
                    <Button variant="solid" sx={{backgroundColor:'#4FC4CA', borderRadius:'20px',p:'15px'}}> click </Button>
        </Box>
    </Box>
  )
}
