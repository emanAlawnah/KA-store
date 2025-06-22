import { Box, Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

export default function Checkout() {
  const [paymentMethod,setpaymentMethod]=useState('Visa');
  const handelpayment=(event)=>{
    setpaymentMethod(event.target.value);
  }
  const handelpay=async()=>{
    const token =localStorage.getItem('token');
  const Response= await axios.post(`https://mytshop.runasp.net/api/CheckOuts/Pay`,{PaymentMethod:paymentMethod},{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  console.log(Response);
  if(paymentMethod == 'Visa'){
    location.href = Response.data.url;
  }
  }
  return (
    <Box sx={{mt:3}}>
     <Card sx={{ p:2 }}>
       <Typography variant='h2' >Checkout</Typography>
       <FormControl >
       <RadioGroup value={paymentMethod} onChange={handelpayment}>
        <FormControlLabel value='Visa' control={<Radio/>} label='visa'/>
        <FormControlLabel value='Cash' control={<Radio/>} label='cash on delevary'/>

       </RadioGroup>
       </FormControl>
       
                      
     </Card>
     <Button onClick={handelpay} variant='contained'>confirm payment</Button>  
    </Box>
  )
}
