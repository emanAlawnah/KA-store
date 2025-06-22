import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import { ThemeProvider } from '@mui/material';
import theme from './theme/index.js';

import './index.css'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App />
    <ToastContainer/>
  </ThemeProvider>,
)
