import { Box, CardActions, Grid } from '@mui/material'
import React, { useState } from 'react'
import {  useParams } from 'react-router'
import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import axios from 'axios';
import Loader from '../../componants/shared/Loader';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosAuth from '../../api/AxiosAuth';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Bounce, toast } from 'react-toastify';

export default function Category() {
  const queryClient = useQueryClient(); 

  const addToCartMutation  = useMutation({
    
    mutationFn:async (productid)=>{
      const isLogidIn = Boolean(localStorage.getItem('token'));
      if (!isLogidIn) {
        toast.error('please login or register to add to the cart', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        throw new Error("User is not logged in");
    }
      return await AxiosAuth.post(`/Carts/${productid}`,{});
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([{queryKey:['cartItems']}]);
      toast.success("added to cart successfully");  
    },
    onError:()=>{
      toast.error(error.message || "An error occurred while adding to cart");
    }

  })

  const [liked, setLiked] = useState(false);
    const togle=(id)=>{
      setLiked((prev)=>({...prev,[id]:!prev[id]}))
    }
  

    const{id}=useParams('id');
   
 

 
    const fetchcategory = async ()=>{
        const {data}= await axios.get(`https://mytshop.runasp.net/api/categories/${id}`);
        return data;
    }
    const {data:categoryData,isLoading:categoryLoding,isError:categoryIsError,error:categoryerror}=useQuery({
        queryKey: ['category', id],
        queryFn:fetchcategory,
        staleTime:1*60*60*1000,
        refetchOnWindowFocus:true,
        retry:3
    })

    const fetchCategoryProducts= async()=>{
      const {data}= await axios.get(`https://mytshop.runasp.net/api/categories/1/products`);
      return data;
    }

    const {data:productdata,isLoading:productIsLoading,isError:productIsError,error:productError}=useQuery({
      queryKey:['categoryproducts',id],
      queryFn:fetchCategoryProducts,
      staleTime:1*60*60*1000,
      refetchOnWindowFocus:true,
      retry:2
    })
    if(productIsLoading) return <Loader/>
    if(categoryLoding) return <Loader/>
    if(categoryIsError) return <p>error :{categoryerror.message}</p>
    if(productError) return <p>error :{productError.message}</p>
    
  return (
    <Box sx={{mt:'20px'}}>
 
     <Typography component={'h5'}>
     {categoryData.name}
     </Typography>
      
      <Grid container spacing={2}>
       
          {
            productdata.map((product)=>{
            const encodedName = encodeURIComponent(`products -${product.name}`);
             const imageURL = `https://mytshop.runasp.net/images/products/${encodedName}/${product.mainImg}`;
               return(
              <Grid sx={{mt:'20px'}} xs={12} sm={6} md={4} lg={3} item key={product.id}>
                   <Card
                sx={{
                  position: 'relative',
                  maxWidth: '312px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '15px',
                  transition: 'all .3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    '& .heart-icon':{
                    opacity:1,
                    transform:'Scale(1)',
                  }
                  }
                  
                }}
              >
                <Box
                  className="heart-icon"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  height:'25px',
                  width:'25px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '3px',
                    boxShadow: 1,
                    cursor: 'pointer',
                    opacity: 0,
                    transform: 'scale(0.8)',
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    
                  }}
                  onClick={(e)=>{ e.stopPropagation(); 
                    
                  togle(product.id);}}
                >
                  {liked[product.id]?( <Favorite fontSize="small" sx={{ color: 'gray' }} />):(<FavoriteBorder fontSize="small" sx={{ color: 'black' }} />)}
                  
                </Box>
              
                  <Link component={RouterLink} to={`/product/${product.id}`} underline="none" sx={{ textDecoration: 'none', color: 'inherit' }}>

                <CardMedia
                  component="img"
                  alt="product img"
                  image={imageURL}
                  sx={{
                    height: '180px',
                    objectFit: 'cover',
                  }}
                />
              
                </Link>
                  <CardContent
                  sx={{
                    paddingBottom: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <Typography fontSize={'14px'} fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography fontSize={'13px'} sx={{ color: 'gray' }}>
                    Product Description
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px 8px 16px',
                  }}
                >
                  <Typography fontSize={'14px'}>{product.price}$</Typography>
                  <CardActions sx={{ padding: 0 }}>
                  <Button
                    size="small"
                    sx={{ width: 'fit-content'}}
                    onClick={() => addToCartMutation.mutate(product.id)}
                    viewTransition
                  >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  </Button>
                </CardActions>
                </Box>
              </Card>
              </Grid>
             
               )
            })
          }
    
      </Grid>
            
    </Box>
    
  )
}
