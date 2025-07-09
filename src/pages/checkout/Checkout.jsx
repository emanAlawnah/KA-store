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
    <Box sx={{mt:'15px',height:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
     <Card sx={{ padding:'50px',borderRadius:'15px',boxShadow:'5' }}>
       <Typography sx={{fontSize:'30px',fontWeight:'bold'}} variant='h2' >Checkout</Typography>
       <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end'}}>
         <FormControl >
       <RadioGroup value={paymentMethod} onChange={handelpayment}>
        <FormControlLabel value='Visa' control={<Radio/>} label='visa'/>
        <FormControlLabel value='Cash' control={<Radio/>} label='cash on delevary'/>

       </RadioGroup>
       </FormControl>
       
        <Button sx={{backgroundColor:'#4FC4CA'}} onClick={handelpay} variant='contained'>confirm payment</Button>  
       </Box>
                
     </Card>
      
    </Box>
  )
}
