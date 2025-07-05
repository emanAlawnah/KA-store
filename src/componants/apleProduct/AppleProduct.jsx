import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'
import Products from '../products/Products'

export default function AppleProduct() {
  return (
    
    <Box sx={{pt:'60px',pb:'60px'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontWeight: 'bold' }}>Apple Products</p>
            <Link to='/navproducts'>See all</Link>
        </Box>

        <Products limit={6} slider={true} />
    </Box>
  
  )
}



