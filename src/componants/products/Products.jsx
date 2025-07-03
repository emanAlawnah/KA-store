import React, { useContext, useEffect } from 'react'
import styles from './products.module.css'
import { useState } from 'react'
import axios from 'axios';
import { Grade } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link, useViewTransitionState } from 'react-router';
import Loader from '../shared/Loader';
import { Cartcontext } from '../../context/Cartcontext';
import Usefetch from '../../hooks/Usefetch';
import { useQuery } from '@tanstack/react-query';
export default function Products() {

  const fetchProduct = async ()=>{
    const{data}= await axios.get('https://mytshop.runasp.net/api/products');
    return data;
  }

   const {data,isLoading,isError,error} =useQuery({
    queryKey:['products'],
    queryFn:fetchProduct,
    staleTime:1*60*60*1000,
    refetchOnWindowFocus:true,
    retry:3
   });
   

   if(isLoading)return <Loader/>
   if (isError) return <p>error : {error.message}</p>
   if (!isLoading && (!data || !Array.isArray(data))) {
  return <p>No products found</p>;
}
  
  return (
   
 <Grid container justifyContent="start">
     {
     data.map((product)=>
      <Grid  sx={{padding:1,justifyContent:'center',alignItems:'center' , gap:'10px'}} item size={{xs:6,sm:4,md:2,lg:2,xl:2}} key={product.id} >
        
       <Card sx={{ maxWidth: 345,
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        transition:'all .3s ease',
        '&:hover':{
          transform: 'translateY(-5px)', 
        },
        }}>
        <Box sx={{ flexGrow:1, display:'flex', flexDirection:'column', justifyContent:'end', alignItems:'center' }}>
       <CardMedia
        component="img"
        alt="product img"
        height="140"
        image={product.mainImg}
      />
      <CardContent>
        <Typography gutterBottom fontSize={'14px'} component="div">
          {product.name}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`} viewTransition>details</Button>
      </CardActions>
      </Box>
    </Card>
     </Grid>
     )
                
}
        </Grid>
   
  );
}
