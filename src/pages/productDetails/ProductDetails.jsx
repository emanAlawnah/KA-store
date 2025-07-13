import styles from './productDetails.module.css';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import Loader from '../../componants/shared/Loader';
import { Box, Button, CardMedia, Grid, Typography, Avatar, Rating, CircularProgress } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AxiosAuth from '../../api/AxiosAuth';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Products from '../../componants/products/Products';
import useFetchOrders from '../../hooks/useFetchOrders';

export default function ProductDetails() {
  
  
const {
  data: detailedOrders = [],
  isLoading: loadingOrders,
  isError: errorOrders,
  error: fetchOrderError
} = useFetchOrders();

  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedImg, setSelectedImg] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [activeRating, setActiveRating] = useState({});
  const isLogiedin = Boolean(localStorage.getItem('token'));
  
  const rateMutation = useMutation({
    mutationFn: ({ productId, rating, comment }) =>
      AxiosAuth.post(`/products/${productId}/Reviews/Create`, {
        rate: rating,
        comment: comment || '',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['userOrdersWithDetails']);
      setRatings({});
      setComments({});
      toast.success("Review added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId) => AxiosAuth.post(`/Carts/${productId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
      toast.success("Added to cart successfully");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Error adding to cart");
    },
  });

  const fetchProductDetails = async () => {
    const { data } = await axios.get(`https://mytshop.runasp.net/api/products/${id}`);
    return data;
  };



  const { data: productData, isLoading: loadingProduct, isError: errorProduct, error } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProductDetails,
    staleTime: 60 * 60 * 1000,
  });


  if (loadingProduct ) return <Loader />;
  if (errorProduct ) return <p>Error loading data</p>;

  const imgBaseUrl = `https://mytshop.runasp.net/images/products/products%20-${productData.name}/`;
  const thumbnails = Array(4).fill(productData.mainImg);
  const selectedImage = selectedImg || productData.mainImg;

  
const purchasedProducts = {};
if (Array.isArray(detailedOrders)) {
  detailedOrders.forEach(order => {
    order.items?.forEach(item => {
      if (!purchasedProducts[item.productId]) {
        purchasedProducts[item.productId] = {
          ...item,
          orderDate: order.orderDate,
          orderId: order.id,
        };
      }
    });
  });
}


  const handleRatingChange = (productId, newValue) => {
    setRatings(prev => ({ ...prev, [productId]: newValue }));
  };

  const handleCommentChange = (productId, comment) => {
    setComments(prev => ({ ...prev, [productId]: comment }));
  };

  const handleSubmitRating = (productId) => {
    if (ratings[productId]) {
      rateMutation.mutate({
        productId,
        rating: ratings[productId],
        comment: comments[productId] || '',
      });
    }
  };

  return (
    <Box sx={{ mt: 4, px: { xs: 2, md: 6 }, maxWidth: '100%' }}>
      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1, flexShrink: 0 }}>
              {thumbnails.map((thumb, idx) => (
                <CardMedia
                  key={idx}
                  component="img"
                  image={`${imgBaseUrl}${thumb}`}
                  alt={`thumbnail-${idx}`}
                  onClick={() => setSelectedImg(thumb)}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    border: selectedImage === thumb ? '2px solid #4FC4CA' : '1px solid #ccc',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Box>
            <CardMedia
              component="img"
              image={`${imgBaseUrl}${selectedImage}`}
              alt="Main Product"
              sx={{
                flex: 1,
                borderRadius: 2,
                maxHeight: 400,
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Grid>

        <Grid xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">{productData.name}</Typography>
            <Typography color="text.secondary">{productData.description}</Typography>
            <Typography variant="h5" color="primary">${productData.price}</Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#4FC4CA', width: 'fit-content' }}
              onClick={() => addToCartMutation.mutate(productData.id)}
              disabled={addToCartMutation.isPending}
            >
              {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
            </Button>
            {Array.isArray(productData.reviews) && productData.reviews.length > 0 && (
              <Box sx={{ mt: 4, width:{sm:'350px',md:'650px'} }}>
                <Typography variant="h6">Reviews</Typography>
                {productData.reviews.map((review) => (
                  <Box key={review.id} sx={{ display: 'flex', gap: 2, p: 2, border: '1px solid #ddd', borderRadius: '10px', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#4FC4CA' }}>
                      {review.reviewerName?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">{`User ${review.id}`}</Typography>
                      <Typography>{review.comment}</Typography>
                      <Rating value={review.rate} readOnly precision={0.5} size="small" />
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      
      <Box sx={{ mt: 6 }}>
      {isLogiedin }
    {purchasedProducts[id] && isLogiedin && !loadingOrders && (
    <Box sx={{ mt: 6, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
    <Typography variant="h5" gutterBottom>Rate This Product</Typography>
    <Typography>Purchased on: {new Date(purchasedProducts[id].orderDate).toLocaleDateString()}</Typography>
    
    <Rating
      name={`rating-${id}`}
      value={ratings[id] || 0}
      precision={0.5}
      onChange={(e, newValue) => handleRatingChange(id, newValue)}
      onChangeActive={(e, newHover) =>
        setActiveRating(prev => ({ ...prev, [id]: newHover }))
      }
    />

    <textarea
      value={comments[id] || ''}
      onChange={(e) => handleCommentChange(id, e.target.value)}
      placeholder="Add a comment (optional)"
      style={{ width: '100%', marginTop: 10, padding: 8, borderRadius: 4 }}
    />

    <Button
      variant="contained"
      sx={{ mt: 2 }}
      disabled={!ratings[id] || rateMutation.isPending}
      onClick={() => handleSubmitRating(id)}
    >
      {rateMutation.isPending ? <CircularProgress size={20} /> : 'Submit Rating'}
    </Button>
  </Box>
)}

      </Box>

    
      <Box sx={{ pt: 6, pb: 6, mt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight="bold">Similar Products</Typography>
          <Link to="/navproducts">See all</Link>
        </Box>
        <Products limit={6} slider={true} />
      </Box>
    </Box>
  );
}
