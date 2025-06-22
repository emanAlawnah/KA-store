import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../componants/shared/Loader';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { Link } from 'react-router';

export default function Cart() {
  const [product,setproduct]=useState();
  const[isloading,setisloading]=useState(true);

  
  const getProductFromCart=async()=>{
    const token =localStorage.getItem('token');
    const response= await axios.get(`https://mytshop.runasp.net/api/Carts`,{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    });
    console.log(response);
    setproduct(response.data.cartResponse);
    setisloading(false);
    
    
    
    
  }
     
  const increseqty= async(id)=>{
    const token =localStorage.getItem('token');

    const response =await axios.patch(`https://mytshop.runasp.net/api/Carts/increaseCount/${id}`,{},{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    });

    const updatedproduct =product.map((product)=>{
      if(product.id == id){
          return{...product,count :product.count + 1}
      }
      else{
        return product;
      }
  
    });
    setproduct(updatedproduct);
  }

  const decreseqty =async(id)=>{
    const token =localStorage.getItem('token');

    const response =await axios.patch(`https://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,{},{
      headers :{
        Authorization: `Bearer ${token}`,
      }
    });

    const updatedProduct = product.map((product)=>{
      if(product.id == id){
       return{...product,count :product.count - 1}
      }else{
        return product;
      }
     
    });
    const temp=updatedProduct.filter((product)=>product.count>0)
    
    setproduct(temp);
  }

  const removeIteam=async (id) =>{
    const token =localStorage.getItem('token');
    const response =await axios.delete(`https://mytshop.runasp.net/api/Carts/${id}`,{
      headers:{
       Authorization: `Bearer ${token}`,
      }
      
    });
      
      const remainProducts =product.filter((product)=>product.id !== id);
      setproduct(remainProducts);
  }

  const clearCart  =async()=>{
    const token =localStorage.getItem('token');
    const responce = await axios.delete('https://mytshop.runasp.net/api/Carts/clearCart',{
      headers:{
        Authorization:`Bearer ${token}`,
      }
    })
    console.log(responce);
    setproduct([]);
  }
  useEffect(()=>{
   getProductFromCart();
  },[])

  if(isloading){
    return <Loader/>
  }
  return (
   <Box>
    <Typography variant='h3' gutterBottom>shopping cart</Typography>
    <Grid container spacing={4}>
      <Grid item size={{xs:12, md:7}}  >
        {
          product.map((cartproduct)=>
          <Card sx={{textAlign:'center',p:2, display:'flex', alignItems:'center', mb:2}}key={cartproduct.id}>
          <CardMedia component={'img'} image='https://placehold.co/70x50' alt='' sx={{borderRadius:'10px'}}>

          </CardMedia>
          <CardContent >
            <Typography variant='h4' fontSize={'25px'}>{cartproduct.name}</Typography>
            <Typography variant='h5' fontSize={'18px'} color='primary'>{cartproduct.price}$</Typography>
          </CardContent>
          <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <IconButton onClick={()=>{decreseqty(cartproduct.id)}}><Remove/></IconButton>
            <Typography>{cartproduct.count}</Typography>
            <IconButton onClick={()=>{increseqty(cartproduct.id)}}><Add/></IconButton>
            <IconButton onClick={(e)=>{
              e.preventDefault();
              removeIteam(cartproduct.id);

            }} color='error'><Delete/></IconButton>
          </Box>
         </Card>
          
          )
        }
       <Button onClick={()=>clearCart()} color='error'   variant="outlined"  disabled={product.length === 0} >clear cart <Delete/></Button>

      </Grid>
           
        <Grid item size={{xs:12, md:4}} >
          <Card sx={{p:2}}>
        <Typography variant='h4'>order summary</Typography>
        <Typography>the number of products :{product.reduce((total,item)=>total + item.count,0)} </Typography>
        <Typography>total price : {product.reduce((sum,item)=>sum + item.price * item.count,0 )}$</Typography>
        <Button variant='contained' sx={{width:'100%'}} component={Link} to='/checkout'>process to checkout</Button>
        </Card>
      </Grid>
      
    </Grid>
   </Box>
  )
}
