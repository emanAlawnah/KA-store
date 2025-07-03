import axios from 'axios'
import Loader from '../../componants/shared/Loader';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
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
   const {data,isLoading,isError,error,refetch}=useQuery({
    queryKey:['cartItems'],
    queryFn: async ()=>{
      const responce = await AxiosAuth.get('/Carts');
      return responce.data;
    },
    staleTime:0,
   })
   if(isLoading) return <Loader/>
   if(isError) return <p>error : {error.message}</p>
   
   const increseqty =async(id)=>{
    await AxiosAuth.patch(`/carts/increaseCount/${id}`);
    queryClient.setQueryData(['cartItems'],(oldData)=>{
      const newCart = oldData.cartResponse.map(p=> p.id === id ? {...p , count: p.count+1} : p);
      return{...oldData, cartResponse:newCart}
    })
    
   }

   const clearCart =async()=>{
     await AxiosAuth.delete('/carts/clearCart');
     queryClient.setQueryData(['cartItems'],(oldData)=>{
      return {...oldData,cartResponse:[]}
     })
   }


   const decreseqty= async(id)=>{
     await AxiosAuth.patch(`/Carts/decreaseCount/${id}`);
     const first =(oldData)=>{
      return oldData.cartResponse.map((p)=>p.id === id ?{...p,count:p.count-1}:p);
     }
     const secand =(cart)=>{
     return cart.filter((p)=>p.count>0);
     }
     queryClient.setQueryData(['cartItems'],(oldData)=>{
    const mapped = first(oldData);
    const filtered = secand(mapped);

      return{...oldData, cartResponse:filtered}
     })
   }


   


   
  return (
   <Box>
    <Typography variant='h3' gutterBottom>shopping cart</Typography>
    <Grid container spacing={4}>
      <Grid item size={{xs:12, md:7}}  >
        {
          data.cartResponse.map((cartproduct)=>
          <Card sx={{textAlign:'center',p:2, display:'flex', alignItems:'center', mb:2}}key={cartproduct.id}>
          <CardMedia component={'img'} image='https://placehold.co/70x50' alt='' sx={{borderRadius:'10px'}}>

          </CardMedia>
          <CardContent >
            <Typography variant='h4' fontSize={'25px'}>{cartproduct.name}</Typography>
            <Typography variant='h5' fontSize={'18px'} color='primary'>{cartproduct.price}$</Typography>
          </CardContent>
          <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <IconButton onClick={()=>{decreseqty(cartproduct.id)}}><Remove/></IconButton>
            <Typography>{cartproduct.count}</Typography>
            <IconButton onClick={()=>{increseqty(cartproduct.id)}}><Add/></IconButton>
            <IconButton
                  onClick={() => deleteMutation.mutate(cartproduct.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
          </Box>
         </Card>
          
          )
        }
       <Button onClick={()=>clearCart()} color='error'   variant="outlined"  disabled={data.cartResponse.length === 0} >clear cart <Delete/></Button>

      </Grid>
           
        <Grid item size={{xs:12, md:4}} >
          <Card sx={{p:2}}>
        <Typography variant='h4'>order summary</Typography>
        <Typography>the number of products :{data.cartResponse.reduce((total,item)=>total + item.count,0)} </Typography>
        <Typography>total price : {data.cartResponse.reduce((sum,item)=>sum + item.price * item.count,0 )}$</Typography>
        <Button variant='contained' sx={{width:'100%'}} component={Link} to='/checkout' viewTransition>process to checkout</Button>
        </Card>
      </Grid>
      
    </Grid>
   </Box>
  )
}
