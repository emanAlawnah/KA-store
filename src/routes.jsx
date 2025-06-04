import {
  createBrowserRouter,
 
} from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorBage from "./pages/error/ErrorBage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import ResetPass from "./pages/resetpass/ResetPass";
import RegisterLayout from "./layout/RegisterLayout";
import ResetPassCode from "./pages/resetpasscode/ResetPassCode";
import Newpassword from "./pages/newpassword/Newpassword";
const routes = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      errorElement:<ErrorBage/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },

       
        {
            path:'/shop',
            element:<Shop/>
        },

        {
            path:'/cart',
            element:<Cart/>
        },

         
      ],
      },

  {
    path: '/auth',
    element: <RegisterLayout />,
    errorElement: <ErrorBage />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {path:'resetPassword', element: <ResetPass /> },
      {path:'verifycode',element: <ResetPassCode/> },
      {path:'newpassword', element:<Newpassword/> }
    ],
  },
]);

export default routes;



