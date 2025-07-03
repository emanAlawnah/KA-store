import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import Themecontexprovider from './context/Themecontext.jsx';

createRoot(document.getElementById('root')).render(
  <>
   <Themecontexprovider>
    <App />
    <ToastContainer/>
  </Themecontexprovider>
    
  </>
 
  
)
