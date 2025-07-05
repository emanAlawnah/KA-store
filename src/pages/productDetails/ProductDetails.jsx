import styles from './productDetails.module.css'
import { useParams } from 'react-router'
import axios from 'axios';
import Loader from '../../componants/shared/Loader';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosAuth from '../../api/AxiosAuth';
import { Bounce, toast } from 'react-toastify';
export default function ProductDetails() {
    const queryClient = useQueryClient(); 

    const{id}=useParams('id');
    
 

    const addToCrrtNutation= useMutation({
        mutationFn : (productid)=>{
            return AxiosAuth.post(`/Carts/${productid}`,{});
        },
        onSuccess:()=>{
            
          queryClient.invalidateQueries({queryKey:['cartItems']});
           
        toast.success("added to cart successfully");

        },
        onError:()=>{
            console.log(`...error`,error.message)
        }
    })
 
    const fetchProductDetails = async ()=>{
        const {data}= await axios.get(`https://mytshop.runasp.net/api/products/${id}`);
        return data;
    }
    const {data,isLoading,isError,error}=useQuery({
        queryKey: ['product', id],
        queryFn:fetchProductDetails,
        staleTime:1*60*60*1000,
        refetchOnWindowFocus:true,
        retry:3
    })
    if(isLoading) return <Loader/>
    if(isError) return <p>error :{error.message}</p>
  return (
    <Card sx={{mt:'100px'}}>
        <CardContent>
            <Typography component={'h5'}>
                {data.name}
            </Typography>
            <CardMedia
          component="img"
        
        height="140"
        image={data.mainImg}
        />
        <Typography>
            {data.description}
        </Typography>
        <Button onClick={()=>addToCrrtNutation.mutate(data.id)}
            disabled={addToCrrtNutation.isPending}>
           {addToCrrtNutation.isPending?'adding....':'add to cart'}
        </Button>
        </CardContent>
    </Card>
  )
}
