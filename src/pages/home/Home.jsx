import { Button, IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

import React from 'react'
import Categories from '../../componants/categories/Categories';
import Products from '../../componants/products/Products';
export default function Home() {
  return (
    <>
    <Categories/>
    <Products/>

  
    </>
    
  )
}
