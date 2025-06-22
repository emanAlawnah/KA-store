import React, { useState } from 'react'
import styles from './caregories.module.css'
import axios from 'axios';
import { useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { data } from 'react-router';
export default function Categories() {
    const [categories,setcategories]=useState([]);
    const getcategories =async()=>{
       const responce =await axios.get(`https://mytshop.runasp.net/api/categories`);
       console.log(responce.data);
       setcategories(responce.data);
    }

    useEffect(()=>{
        getcategories();
    },[])
  return (
    <Box component={'div'} sx={{display:'flex',justifyContent:'center' , alignItems:'center',gap:'3px', padding:'40px' }}>
    
    <Grid  className={styles.emana}container spacing={3}  justifyContent="start">
    {
    categories.map((category)=>
        <Grid className={styles.v} sx={{padding:1,justifyContent:'center',alignItems:'center' , gap:'10px'}} item size={{xs:5,sm:4,md:2,lg:2,xl:2}} key={category.id} >
        <Card  className={styles.e}   sx={{
          height: '120px',
          display: 'flex',
          maxWidth:'150px',
          flexDirection: 'column',
          background:'rgba(230, 227, 255, 1)',
           width: '120px',
    
    borderRadius: '50%',
    overflow: 'hidden', 
    
    alignItems: 'center',
    justifyContent: 'center',
         

          
        }}>
      <CardActionArea  sx={{ flexGrow:0 }}>
        <CardMedia
        //   component="img"
        //   height="140"
        //   image="/static/images/cards/contemplative-reptile.jpg"
        //   alt="green iguana"
        />
        <CardContent sx={{display:'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center'}} >
          <Typography gutterBottom fontSize={'13px'} component="div">
            {category.name}
          </Typography>
          {/* <Button size='small'>details</Button> */}
        </CardContent>
      </CardActionArea>
    </Card>
        </Grid>
    
        )
    }
    </Grid>
    </Box>
  );
}
