import axios from 'axios';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link, useViewTransitionState } from 'react-router';
import Loader from '../shared/Loader';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from './products.module.css'
import { Favorite, FavoriteBorder, Scale } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';


export default function Products({ limit = null, slider = false }) {
  const [liked, setLiked] = useState(false);
  const togle=(id)=>{
    setLiked((prev)=>({...prev,[id]:!prev[id]}))
  }
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
    const total =data.length;
    const needed = limit && total < limit ? limit - total : 0;
  const combined = [...data, ...dummyProducts.slice(0, needed)];

  return limit ? combined.slice(0, limit) : combined;
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
      width:'20px',
      height:'20px',
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '6px',
      boxShadow: 1,
      cursor: 'pointer',
      opacity: 0,
      transform: 'scale(0.8)',
      transition: 'all 0.3s ease',
      zIndex: 1,
      
    }}
    onClick={(e)=>{ e.stopPropagation(); 
      
    togle(product.id);}}
  >
    {liked[product.id]?( <Favorite fontSize="small" sx={{ color: 'gray' }} />):(<FavoriteBorder fontSize="small" sx={{ color: 'black' }} />)}
    
  </Box>


  <CardMedia
    component="img"
    alt="product img"
    image={product.mainImg}
    sx={{
      height: '180px',
      objectFit: 'cover',
    }}
  />

  
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
        component={Link}
        to={`/product/${product.id}`}
        viewTransition
      >
        Details
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
      {data.map((product) => (
        <SwiperSlide key={product.id}>{productCard(product)}</SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {data.map((product) => (
        <Box key={product.id}>{productCard(product)}</Box>
      ))}
    </Box>
   
  );
}
