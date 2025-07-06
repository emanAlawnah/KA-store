import { Box, Typography } from '@mui/material'
import React from 'react'
import AxiosAuth from '../../api/AxiosAuth'
import { useQuery } from '@tanstack/react-query';
import Loader from '../../componants/shared/Loader';

export default function Orders() {
 const fetchorder =async()=>{
  const {data} =await AxiosAuth.get('/Orders');
  return data;
 }
 const {data,isLoading,isError,error}=useQuery({
  queryKey:['orders'],
  queryFn:fetchorder,
  staleTime:1*60*60*1000,
  refetchOnWindowFocus:true,
  retry:3
 });

 if(isLoading) return <Loader/>
 if(isError) return<p>error: {error.message}</p>
  if (!data ) return <p>No Orders found</p>;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {data.map((order) => (
        <Box key={order.id} sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography><strong>Status:</strong> {order.orderStatus}</Typography>
          <Typography><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</Typography>
          <Typography><strong>Shipped:</strong> 
            {order.shippedDate === "0001-01-01T00:00:00" ? 'Not shipped yet' : new Date(order.shippedDate).toLocaleDateString()}
          </Typography>
          <Typography><strong>Total Price:</strong> ${order.totalPrice}</Typography>
          <Typography><strong>Payment:</strong> {order.paymentMethodType}</Typography>
        </Box>
      ))}
    </Box>
  );
}
