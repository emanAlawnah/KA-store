import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function PreFetchUserInfo() {
      const fetchUserInfo= async()=>{
       const {data}= await AxiosAuth.get('/Account/userinfo');
       return data;
    }
   
    const {data,}=useQuery({
    queryKey:['userInfo'],
    queryFn:fetchUserInfo,
    staleTime: 15 * 60 * 1000, 
    refetchOnWindowFocus: false,
    enabled: !!localStorage.getItem('token'),
     })  
   return null

}
