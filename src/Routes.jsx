import {
  createBrowserRouter,
 
} from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorBage from "./pages/error/ErrorBage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import ResetPass from "./pages/resetpass/ResetPass";
import RegisterLayout from "./layout/RegisterLayout";
import ResetPassCode from "./pages/resetpasscode/ResetPassCode";
import Newpassword from "./pages/newpassword/Newpassword";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Checkout from "./pages/checkout/Checkout";
import ProtectedRouter from "./componants/protectedRouter/ProtectedRouter";
import Navproducts from "./pages/navboroducts/Navproducts";
import ContactUs from "./pages/contactUs/ContactUs";
import Category from "./pages/category/Category";
import AboutUs from "./pages/AboutUs/AboutUs";
import Profile from "./pages/profile/Profile";
import ProfileLayout from "./layout/ProfileLayout";
import Info from "./pages/info/Info";
import ChangPassword from "./pages/changPassword/ChangPassword";
import Orders from "./pages/orders/Orders";
const Routes = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      errorElement:<ErrorBage/>,
      children:[
        {
          index:true,
          element:<Home/>,
          viewTransition: true
        },
         
       
        {
            path:'/shop',
            element:<Shop/>
        },
         {
            path:'/product/:id',
            element:<ProductDetails/>,
            viewTransition: true

        },
        {
          
            path:'/cart',
            element:
            <ProtectedRouter>
               <Cart/>
            </ProtectedRouter>
            ,
             viewTransition: true
        },
        {
          path:'/checkout',
          element:
          <ProtectedRouter>
             <Checkout/>
          </ProtectedRouter>,
          viewTransition: true
          
          
        },

         {path:'/navproducts',
          element:<Navproducts/>,
          viewTransition: true
},

          {
          path:'/contactUs',
          element:<ContactUs/>,
          viewTransition: true

          },

          {
          path:'/AboutUs',
          element:<AboutUs/>,
          viewTransition: true

          },


          {
            path:'/category/:id',
            element:<Category/>,
            viewTransition:true,
          },
          

         
      ],
      },

  {
    path: '/auth',
    element: <RegisterLayout />,
    errorElement: <ErrorBage />,
    children: [
      {path: 'login', element: <Login />,viewTransition: true },
      {path: 'register', element: <Register /> },
      {path:'resetPassword', element: <ResetPass /> },
      {path:'verifycode',element: <ResetPassCode/> },
      {path:'newpassword', element:<Newpassword/> }
    ],
  },

 { path:'/profile',
  element:<ProfileLayout/>,
  errorElement: <ErrorBage />,
  children:[
     {
          index:true,
          element:<Profile/>,
          viewTransition: true
     },

    {path:'info', element:<Info/>},
    {path:'changPasword', element:<ChangPassword/>},
    {path:'Orders', element:<Orders/>}
  ]
 }

]);

export default Routes;



