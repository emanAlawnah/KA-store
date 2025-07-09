import axios from 'axios';
import Loader from '../../componants/shared/Loader';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Add, Delete, Remove, ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router';
import AxiosAuth from '../../api/AxiosAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Cart() {
  const queryClient = useQueryClient();


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await AxiosAuth.delete(`/Carts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems']);
    },
    onError: (error) => {
      console.error("Error deleting item:", error.message);
    },
  });

  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const response = await AxiosAuth.get('/Carts');
      return response.data;
    },
    staleTime: 0,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  const cartItems = data.cartResponse;

 
  if (!cartItems.length) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          mt: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          height: '50vh',
        }}
      >
        <ShoppingCartOutlined sx={{ fontSize: 80, color: 'gray' }} />
        <Typography variant="h5" color="text.secondary">
          Your cart is empty
        </Typography>
        <Button
          sx={{ backgroundColor: '#4FC4CA' }}
          variant="contained"
          component={Link}
          to="/"
        >
          Go to Shop Now
        </Button>
      </Box>
    );
  }

  
  const increaseQty = async (id) => {
    await AxiosAuth.patch(`/carts/increaseCount/${id}`);
    queryClient.setQueryData(['cartItems'], (oldData) => {
      const newCart = oldData.cartResponse.map((p) =>
        p.id === id ? { ...p, count: p.count + 1 } : p
      );
      return { ...oldData, cartResponse: newCart };
    });
  };

 
  const decreaseQty = async (id) => {
    await AxiosAuth.patch(`/Carts/decreaseCount/${id}`);
    queryClient.setQueryData(['cartItems'], (oldData) => {
      const updated = oldData.cartResponse.map((p) =>
        p.id === id ? { ...p, count: p.count - 1 } : p
      );
      const filtered = updated.filter((p) => p.count > 0);
      return { ...oldData, cartResponse: filtered };
    });
  };


  const clearCart = async () => {
    await AxiosAuth.delete('/carts/clearCart');
    queryClient.setQueryData(['cartItems'], (oldData) => ({
      ...oldData,
      cartResponse: [],
    }));
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 1, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
      
        <Grid item xs={12} md={9}>
          {cartItems.map((cartproduct) => {
            const encodedName = encodeURIComponent(`products -${cartproduct.name}`);
            const imageURL = `https://mytshop.runasp.net/images/products/${encodedName}/${cartproduct.mainImg}`;

            return (
              <Card
                key={cartproduct.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  gap: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={imageURL}
                  alt={cartproduct.name}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />

                <Box flex={1}>
                  <Typography variant="h6">{cartproduct.name}</Typography>
                  <Typography color="primary" fontSize={16}>
                    {cartproduct.price}$
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton onClick={() => decreaseQty(cartproduct.id)}>
                    <Remove />
                  </IconButton>
                  <Typography>{cartproduct.count}</Typography>
                  <IconButton onClick={() => increaseQty(cartproduct.id)}>
                    <Add />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteMutation.mutate(cartproduct.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            );
          })}

          <Button
            onClick={clearCart}
            color="error"
            variant="outlined"
            disabled={cartItems.length === 0}
          >
            Clear Cart <Delete sx={{ ml: 1 }} />
          </Button>
        </Grid>

        
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Typography mb={1}>
              Number of products:{' '}
              {cartItems.reduce((total, item) => total + item.count, 0)}
            </Typography>
            <Typography mb={2}>
              Total price:{' '}
              {cartItems.reduce((sum, item) => sum + item.price * item.count, 0)}$
            </Typography>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to="/checkout"
              sx={{ backgroundColor: '#4FC4CA' }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
