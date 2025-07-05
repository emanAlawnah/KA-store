import styles from './caregories.module.css'
import axios from 'axios';
import { Box, Card, Grid, Typography } from '@mui/material';
import { data, Link } from 'react-router';
import Loader from '../shared/Loader';
import { useQueries, useQuery } from '@tanstack/react-query';
export default function Categories() {
   const fetchCategories =async()=>{
    const {data}=await axios.get('https://mytshop.runasp.net/api/categories');
    return data;
   }
   const {data,isLoading,isError,error} =useQuery({
    queryKey:['categories'],
    queryFn:fetchCategories,
    staleTime:1*60*60*1000,
    refetchOnWindowFocus:true,
    retry:3
   });
   console.log(data);
   if (isLoading) return <Loader/>
   if(isError)return <p>error : {error.message}</p>
   if (!data || !Array.isArray(data)) return <p>No categories found</p>;
  return (
    <Box className={styles.all}
  component="div"
  sx={{
    mt:'40px',
    minWidth: '100wh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    padding: '40px',
    '@media (max-width: 500px)': {
      padding: '1px',
      
    },
    marginBottom:'20px'
     
  }}
>
  <Grid
    className={styles.emana}
    container
    spacing={2}
    justifyContent="center"
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%'
      
    }}
  >
    {data.map((category) => (
      <Grid
        className={styles.v}
        sx={{ padding: 1 }}
        size={{xs:6,sm:4,md:3,lg:2,xl:2}}
        
        key={category.id}
      >
        <Link to={`/category/${category.id}`} style={{ textDecoration: 'none' }}>
        <Card
          className={styles.e}
          sx={{
            height: '125px',
            width: '125px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(230, 227, 255, 1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              color:'black'
            }}
          >
            
            <Typography gutterBottom fontSize={'13px'} component="div">
              {category.name}
            </Typography>
          </Box>
        </Card>
        </Link>
      </Grid>
    ))}
  </Grid>
</Box>
  )
}
