import React, { useEffect } from 'react'
import styles from './products.module.css'
import { useState } from 'react'
import axios from 'axios';
import { Grade } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import Loader from '../shared/Loader';
export default function Products() {
   const [products,setproducts]=useState([]);
   const[isloading,setisloading]=useState(true);
   const getproduct=async()=>{
    const response=await axios.get(`https://mytshop.runasp.net/api/products`);
    console.log(response.data);
    setproducts(response.data);
    setisloading(false);
   }

   useEffect(()=>{
    getproduct();
   },[])
   if(isloading){
    return(
      <Loader/>
    )
   }
  return (
   
 <Grid container justifyContent="start">
     {
     products.map((product)=>
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
        <Box sx={{ flexGrow:1 }}>
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
        <Button size="small" component={Link } to={`/product/${product.id}`}>Learn More</Button>
      </CardActions>
      </Box>
    </Card>
     </Grid>
     )
                
}
        </Grid>
   
  );
}
