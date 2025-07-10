import { Box, Typography } from '@mui/material';
import React from 'react';
import AxiosAuth from '../../api/AxiosAuth';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../componants/shared/Loader';

export default function Orders() {
  
 const{data:detailedOrders}=useQuery({
  queryKey:['userOrdersWithDetails'],
 })

  if (!detailedOrders || detailedOrders.length === 0)
  return <p>No Approved Orders Found</p>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {detailedOrders.map((order) => (
        <Box key={order.id} sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography>Status: {order.orderStatus}</Typography>
          <Typography>Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
          <Typography>Shipped:
            {order.shippedDate === "0001-01-01T00:00:00"
              ? 'Not shipped yet'
              : new Date(order.shippedDate).toLocaleDateString()}
          </Typography>
          <Typography><strong>Total Price:</strong> ${order.totalPrice}</Typography>
          <Typography><strong>Payment:</strong> {order.paymentMethodType}</Typography>

         
          <Box sx={{ mt: 2, pl: 2 }}>
            <Typography fontWeight="bold">Products:</Typography>
            {order.items?.map((item, idx) => (
              <Typography key={idx}>- {item.productName} (ID: {item.productId})</Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
