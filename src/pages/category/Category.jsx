import { Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import Loader from '../../componants/shared/Loader';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosAuth from '../../api/AxiosAuth';

export default function Category() {
  const queryClient = useQueryClient(); 

    const{id}=useParams('id');
   
 

 
    const fetchcategory = async ()=>{
        const {data}= await axios.get(`https://mytshop.runasp.net/api/categories/${id}`);
        return data;
    }
    const {data,isLoading,isError,error}=useQuery({
        queryKey: ['category', id],
        queryFn:fetchcategory,
        staleTime:1*60*60*1000,
        refetchOnWindowFocus:true,
        retry:3
    })
    if(isLoading) return <Loader/>
    if(isError) return <p>error :{error.message}</p>
  return (
    <Card sx={{mt:'40px'}}>
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

        </CardContent>
    </Card>
  )
}
