import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'
import Products from '../products/Products'

export default function BestSellers() {
  return (
    <Box sx={{pt:'40px',pb:'40px'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>Best Sellers</p>
            <Link to='/navproducts'>See all</Link>
        </Box>

        <Products limit={6} />
    </Box>
  )
}
