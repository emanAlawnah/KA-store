import axios from 'axios';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link, useViewTransitionState } from 'react-router';
import Loader from '../shared/Loader';
import { useQuery } from '@tanstack/react-query';
export default function Products({ limit = null }) {

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
  
  return (
   
 <Grid container justifyContent="start" spacing={2}>
     {
     data.map((product)=>
      <Grid  sx={{padding:1,justifyContent:'center',alignItems:'center' , gap:'10px'}} item size={{xs:6,sm:4,md:3}} key={product.id} >
        
       <Card
  sx={{
   
    maxWidth: '312px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    transition: 'all .3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  }}
>
  

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

     </Grid>
     )
                
}
        </Grid>
   
  );
}
