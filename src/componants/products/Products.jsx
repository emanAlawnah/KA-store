import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, Pagination } from '@mui/material';
import Loader from '../shared/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import AxiosAuth from '../../api/AxiosAuth';
import { Bounce, toast } from 'react-toastify';

export default function Products({ limit = null, slider = false }) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState({});
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  const togle = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCartMutation = useMutation({
    mutationFn: async (productid) => {
      const isLogidIn = Boolean(localStorage.getItem('token'));
      if (!isLogidIn) {
        toast.error('please login or register to add to the cart', { transition: Bounce });
        throw new Error("User is not logged in");
      }
      return await AxiosAuth.post(`/Carts/${productid}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems']);
      toast.success("added to cart successfully");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred while adding to cart");
    }
  });

  const fetchProduct = async () => {
    const dummyProducts = [...Array(30)].map((_, i) => ({
      id: `dummy${i + 1}`,
      name: i % 2 === 0 ? 'Wireless Headphones' : 'Smart Watch',
      mainImg: '/images/product.webp',
      price: 1000,
    }));

    const { data } = await axios.get('https://mytshop.runasp.net/api/products');
    const realProducts = data.data || [];
    const combined = [...realProducts, ...dummyProducts];
    return limit ? combined.slice(0, limit) : combined;
  };

  const { data: products, isLoading, isError, error } = useQuery({
   queryKey: ['products', limit],
    queryFn: fetchProduct,
    staleTime: 3600000,
    refetchOnWindowFocus: true,
    retry: 3,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;
  if (!products || !Array.isArray(products)) return <p>No products found</p>;

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = slider ? products : products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const productCard = (product) => (
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
          '& .heart-icon': { opacity: 1, transform: 'scale(1)' }
        }
      }}
    >
      <Box
        className="heart-icon"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          height: '25px',
          width: '25px',
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '3px',
          boxShadow: 1,
          cursor: 'pointer',
          opacity: 0,
          transform: 'scale(0.8)',
          transition: 'all 0.3s ease',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => {
          e.stopPropagation();
          togle(product.id);
        }}
      >
        {liked[product.id]
          ? <Favorite fontSize="small" sx={{ color: 'gray' }} />
          : <FavoriteBorder fontSize="small" sx={{ color: 'black' }} />}
      </Box>

      <Link component={RouterLink} to={`/product/${product.id}`} underline="none" sx={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia component="img" alt="product img" image={product.mainImg} sx={{ height: '180px', objectFit: 'cover' }} />
      </Link>

      <CardContent sx={{ paddingBottom: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Typography fontSize={'14px'} fontWeight={600}>{product.name}</Typography>
        <Typography fontSize={'13px'} sx={{ color: 'gray' }}>Product Description</Typography>
      </CardContent>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px 8px 16px' }}>
        <Typography fontSize={'14px'}>{product.price}$</Typography>
        <CardActions sx={{ padding: 0 }}>
          <Button size="small" sx={{ width: 'fit-content' }} onClick={() => addToCartMutation.mutate(product.id)}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 13L16.5 16.5M14.5 13H16.5C17.0523 13 17.5 12.5523 17.5 12V6M14.5 13H13H8.5H7.11803C6.73926 13 6.393 12.786 6.22361 12.4472L3.72361 7.44721C3.39116 6.78231 3.87465 6 4.61803 6H8.5H13H17.5M16.5 16.5H6M16.5 16.5H17.5M17.5 6L18.2236 4.55279C18.393 4.214 18.7393 4 19.118 4H20.5" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M7 19C7 20.1046 6.10457 21 5 21C3.89543 21 3 20.1046 3 19C3 17.8954 3.89543 17 5 17C6.10457 17 7 17.8954 7 19Z" stroke="#000000" stroke-width="2"></path> <path d="M20 19C20 20.1046 19.1046 21 18 21C16.8954 21 16 20.1046 16 19C16 17.8954 16.8954 17 18 17C19.1046 17 20 17.8954 20 19Z" stroke="#000000" stroke-width="2"></path> </g></svg>
          </Button>
        </CardActions>
      </Box>
    </Card>
  );

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
    <Box sx={{display:'flex',flexDirection:'column'}}>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {currentProducts.map((product) => (
          <Box key={product.id} sx={{ width: '220px' }}>
            {productCard(product)}
          </Box>
        ))}
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
