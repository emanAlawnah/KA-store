import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, Navigate, useNavigate } from 'react-router';
import Register from '../../pages/register/Register';
import Login from '../../pages/login/Login';
import Cart from '../../pages/cart/Cart';
import { ThemeContext } from '@emotion/react';
import { DarkMode, LightMode, Style } from '@mui/icons-material';
import { Themecontext } from '../../context/Themecontext';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosAuth from '../../api/AxiosAuth';
import styles from './navbar.module.css'
import AboutUs from '../../pages/AboutUs/AboutUs';

const path = {
  Home :'/',
  contactUs:'/contactUs',
  AboutUs:'/AboutUs',
  products:'/navproducts',
  register: '/auth/register',
  login: '/auth/login',
  cart: '/cart',
};

const pagesGest = ['Home','products','AboutUs','contactUs'];
const pageGestt=['register', 'login'];
const pageAuth = ['Home','products','AboutUs','contactUs','cart'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const allGuestPages = [...pagesGest, ...pageGestt];
function Navbar() {
   const queryClient = useQueryClient();
   const fetchCartItems = async ()=>{
    const {data}=await AxiosAuth.get(`/Carts`);
    return data;

   }
   useQuery({
    queryKey:['cartItems'],
    queryFn:fetchCartItems,
    staleTime:10000,
   })

   const data = queryClient.getQueryData(['cartItems']);
   const cartItems = data?.cartResponse?.length || 0;

  const {mode,togle}=React.useContext(Themecontext);
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const islogedIn=Boolean(localStorage.getItem('token'));
  const navigate =useNavigate();
  const Logout =()=>{
    const token =localStorage.getItem('token')
    localStorage.removeItem('token');
    navigate('/auth/login');
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" className={styles.navbar} sx={{ background: '#4fc4ca' }}>
  <Container maxWidth="xl">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      
      {/* logo */}
      <Box component={Link} to='/' sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src='/logo.svg'
          alt='logo'
          style={{ height: '40px', display: 'flex' }}
        />
      </Box>

      {/* pages */}
      <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' }, gap: 2 }}>
        {(islogedIn ? pageAuth : pagesGest).map((page) => (
          <Button
            key={page}
            component={Link}
            to={path[page]}
            sx={{ my: 2, color: 'black', textTransform: 'capitalize' }}
          >
            {page === 'cart' ? `cart (${cartItems})` : page}
          </Button>
        ))}
      </Box>

      {/* on mobile */}
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="menu"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {(islogedIn ? pageAuth : allGuestPages).map((page) => (
            <MenuItem component={Link} to={path[page]} key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                {page === 'cart' ? `cart (${cartItems})` : page}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Login Regester*/}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,flexShrink: 0,
    minWidth: 'fit-content' }}>
        {!islogedIn &&
          pageGestt.map((page) => (
            <Button
              key={page}
              component={Link}
              to={path[page]}
              sx={{ color: 'black', display: { xs: 'none', md: 'inline-flex' } }}
            >
              {page}
            </Button>
          ))
        }

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
          <IconButton onClick={togle}>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
        </MenuItem>

        {settings
          .filter(setting => setting !== 'Logout' || islogedIn) 
          .map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => {
                handleCloseUserMenu();
                if (setting === 'Logout') Logout();
              }}
            >
              <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
        ))}


        </Menu>
      </Box>

    </Toolbar>
  </Container>
</AppBar>

  );
}
export default Navbar;
