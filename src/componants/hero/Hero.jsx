import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';

const slides = [
  {
    id: 1,
    background: '#4fc4ca',
    btn: '30% OFF',
    title: 'Feel Every Beat. Hear the Difference.',
    subtitle: 'Experience immersive sound with our premium speaker collection',
    btn2: 'Buy now',
    image: '/heroimg.png',
  },
  {
    id: 2,
    background: '#9E97E1',
    btn: '30% OFF',
    title: 'Feel Every Beat. Hear the Difference.',
    subtitle: 'Experience immersive sound with our premium speaker collection',
    btn2: 'Buy now',
    image: '/heroimg.png',
  },
  {
    id: 3,
    background: '#6862A0',
    btn: '30% OFF',
    title: 'Feel Every Beat. Hear the Difference.',
    subtitle: 'Experience immersive sound with our premium speaker collection',
    btn2: 'Buy now',
    image: '/heroimg.png',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[current];

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '55vh' },
        width: '100%',
        mt: '20px',
        backgroundColor: currentSlide.background,
        color: 'white',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 1s ease-in-out',
        overflow: 'hidden',
        position:'relative',
        py: { xs: 4, md: 0 }, 
      }}
    >
    <Box sx={{position: 'absolute',
      top: '6%',
      left: '57%',}}>
        <img src='/music.png'></img>
      </Box>
      <Box sx={{position: 'absolute',
      top: '5%',
      left: '73%',}}>
        <img src='/Ellipse7.png'></img>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{justifyContent:'space-between'}}>
          
          <Grid item size={{xs:12,md:6}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  width: 'fit-content',
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '30px',
                }}
              >
                {currentSlide.btn}
              </Button>

              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: 'black' }}
              >
                {currentSlide.title}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ mb: 2, color: 'black' }}
              >
                {currentSlide.subtitle}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  width: 'fit-content',
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '30px',
                }}
              >
                {currentSlide.btn2}
              </Button>
            </Box>
          </Grid>

          {}
          <Grid item xs={12} md={5} sx={{ textAlign: 'center',position:'relative' }}>
         
  
  
  <img
    src={currentSlide.image}
    alt="Slide Visual"
    style={{
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '300px',
      objectFit: 'contain',
      position: 'relative',
      zIndex: 1,
    }}
  />
</Grid>
        </Grid>
      </Container>
    </Box>
  );
}



