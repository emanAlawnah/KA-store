import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import styles from './newSec.module.css'
export default function NewSec() {
  return (
 

      <Box sx={{mt:'20px',height:'50vh' ,width:'100vw',backgroundColor:'#E8E6FF',overflow: 'hidden',pt:'30px', pb:'20px'}}>
           <Container disableGutters sx={{ height: '100%' }}  direction={{ xs: 'column', md: 'row' }}>

        <Grid container spacing={2} sx={{ height:'100%' ,width:'100%'  }}
    >
        <Grid   size={{xs:12,md:6}} sx={{ height: { xs: '66.66%', md: '100%' }, 
            display: 'flex',gap:'15px',
            flexDirection: { xs: 'row', sm: 'column' }}}>
        <Box sx={{
         width: { xs: '50%', sm: '100%' }, 
         height: { xs: '100%', sm: '50%' },
        display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', 
                alignItems: 'flex-start', }}  
         className={styles.i1}>
            <Typography sx={{display:'flex',alignItems:'end',justifyContent:'center'}}>
                <h2>Hear it.Share it.</h2>
            </Typography>
        
        </Box>

        <Box sx={{height:'100%',display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', 
                alignItems: 'flex-start',
        width: { xs: '50%', sm: '100%' }, 
         height: { xs: '100%', sm: '50%' } 
        }} className={styles.i2}>
            <Typography>
            <h2> AirPods Pro 2.</h2>
            </Typography>
        </Box>
        </Grid>



        <Grid  item size={{x:12,md:6}} sx={{ 
            height: { xs: '33.33%', md: '100%' },
            
          }}>
        <Box  sx={{height:'100%', display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', 
                width: { xs: '100%', sm: '100%' }, 
               height: { xs: '100%', sm: '100%' },
                alignItems: 'center',  }} className={styles.i3}>
            <Typography sx={{color:'white',display:'flex',alignItems:'end',justifyContent:'center'}}>
                <h2>Get Yours Now for $250 </h2>
            </Typography>
        </Box>
        </Grid>



        </Grid>
            </Container>
        

        </Box>
   
    
  )
}
