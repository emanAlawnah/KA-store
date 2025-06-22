import React, { useEffect, useState } from 'react'
import styles from './productDetails.module.css'
import { useParams } from 'react-router'
import axios from 'axios';
import Loader from '../../componants/shared/Loader';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
export default function ProductDetails() {
    const{id}=useParams('id');
    const[product,setproduct]=useState(null);
    const[isloading,setisloading]=useState(true);
    const addToCard=async(id)=>{
        const userToken =localStorage.getItem('token');
       const response=await axios.post(`https://mytshop.runasp.net/api/Carts/${id}`,{},
        {
            headers:{
                Authorization:`Bearer ${userToken}`
            }
        }
       );

    }
    const getproductDetails=async()=>{
        const response=await axios.get(`https://mytshop.runasp.net/api/products/${id}`);
        setproduct(response.data);
        setisloading(false);
    }
    useEffect(()=>{
        getproductDetails();
    },[])
    if(isloading){
        return(
            <Loader/>
        )
    }
  return (
    <Card>
        <CardContent>
            <Typography component={'h5'}>
                {product.name}
            </Typography>
            <CardMedia
          component="img"
        
        height="140"
        image={product.mainImg}
        />
        <Typography>
            {product.description}
        </Typography>
        <Button onClick={()=>addToCard(product.id)}>
            add to card
        </Button>
        </CardContent>
    </Card>
  )
}
