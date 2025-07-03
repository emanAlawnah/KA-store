import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Usefetch from "../hooks/Usefetch";

export const Cartcontext =createContext(null);

const Cartcontextprovider =({children})=> {
  
    const [cartItems,setcartItems]=useState(0);
    const getItems=async()=>{
      const token =localStorage.getItem('token');
      try{
           const responce = await axios.get('https://mytshop.runasp.net/api/Carts',{
        headers:{
            Authorization:`Bearer ${token}`,
        }
      })
            setcartItems(responce.data.cartResponse.length);

      } catch(err){
        <p>error : {err.message}</p>
      }
    
    }

    useEffect(()=>{
        getItems();
    },[])
   return <Cartcontext.Provider value={{cartItems,setcartItems}}>
    {children}
   </Cartcontext.Provider>
}

export default Cartcontextprovider;