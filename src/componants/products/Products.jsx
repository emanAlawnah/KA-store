import axios from 'axios';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import {  useViewTransitionState } from 'react-router';
import Loader from '../shared/Loader';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './products.module.css'
import { Favorite, FavoriteBorder, Scale } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import AxiosAuth from '../../api/AxiosAuth';
import { Bounce, toast } from 'react-toastify';


export default function Products({ limit = null, slider = false }) {
  const queryClient =useQueryClient();
  const [liked, setLiked] = useState(false);
  const togle=(id)=>{
    setLiked((prev)=>({...prev,[id]:!prev[id]}))
  }
  
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


  //  const addToCart =()=>{ 
  //   addToCartMutation.mutate{(data.id)};
  //  }

  const fetchProduct = async ()=>{
    const dummyProducts =[
      {id:'dummy1',
        name: 'Wireless Headphones',
        mainImg: '/images/product.webp',
        price:1000,
      },
        {id:'dummy2',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },
      {id:'dummy3',
        name: 'smart watch',
       mainImg: '/images/product.webp',
        price:1000,
      },
      {id:'dummy4',
        name: 'smart watch',
        mainImg: '/images/product.webp',
        price:1000,
      },
      {id:'dummy5',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },
      {id:'dummy6',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },
      {id:'dummy7',
        name: 'Wireless Headphones',
        mainImg: '/images/product.webp',
        price:1000,
      },
        {id:'dummy8',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },
      {id:'dummy9',
        name: 'smart watch',
       mainImg: '/images/product.webp',
        price:1000,
      },
      {id:'dummy10',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },
      {id:'dummy11',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },
      {id:'dummy12',
        name: 'smart watch',
        mainImg: '/images/product.webp',
         price:1000,
      },

    ];
    const{data}= await axios.get('https://mytshop.runasp.net/api/products');
    const products = data.data;
    const total =products.length;
    const needed = limit && total < limit ? limit - total : 0;
   const combined = [...products, ...dummyProducts.slice(0, needed)];

  return limit ? combined.slice(0, limit) : combined;
  }

   const {data:products ,isLoading,isError,error} =useQuery({
    queryKey:['products'],
    queryFn:fetchProduct,
    staleTime:1*60*60*1000,
    refetchOnWindowFocus:true,
    retry:3
   });
   

   if(isLoading)return <Loader/>
   if (isError) return <p>error : {error.message}</p>
   if (!isLoading && (!products  || !Array.isArray(products ))) {
  return <p>No products found</p>;
}
  const productCard =(product)=>(
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
    image={product.mainImg}
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
    <Typography sx={{textDecoration: 'none'}} fontSize={'14px'} fontWeight={600}>
      {product.name}
    </Typography>
    <Typography  fontSize={'13px'} sx={{ color: 'gray',textDecoration: 'none' }}>
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
   
     
  )


  return slider ? (
   
 <Swiper style={{ padding: '10px' }}
      modules={[Navigation]}
      spaceBetween={16}
      slidesPerView={1}
      navigation
      breakpoints={{
        500: { slidesPerView: 2 },
        800: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>{productCard(product)}</SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      {products .map((product) => (
        <Box key={product.id} sx={{ width: '220px' }}>{productCard(product)}</Box>
      ))}
    </Box>
   
  );
}
