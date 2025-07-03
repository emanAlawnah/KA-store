import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Usefetch(url) {
    const [Data,setData]=useState([]);
    const[isLoader,setIsLoader]=useState(true);
    const[error,setError]=useState(null);
    
    const getData=async()=>{
        try{
        const responce =await axios.get(url);
        setData(responce.data);
        }

        catch(err){
            setError(err);
        } finally{
            setIsLoader(false);
        }
        
    }

    useEffect(()=>{
        getData();
    },[])

    return{Data,isLoader,error}
  
}
