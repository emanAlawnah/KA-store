import { Button, Container, IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

import React from 'react'
import Categories from '../../componants/categories/Categories';
import Products from '../../componants/products/Products';
import Hero from '../../componants/hero/Hero';
import BestSellers from '../../componants/BestSellers/BestSellers';
import NewSec from '../../componants/newSec/NewSec';
import AppleProduct from '../../componants/apleProduct/AppleProduct';
import Subscribe from '../../componants/subscribe/Subscribe';
export default function Home() {
  return (
    <>
    
     <Container>
        <Hero/>
     </Container>
   
     <Container>
          <Categories/>

     </Container>

     <Container>
     <BestSellers/>

     </Container>
      <NewSec/>
      <Container>
        <AppleProduct/>
      </Container>
      <Subscribe/>
   


  
    </>
    
  )
}
