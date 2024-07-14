/* eslint-disable no-unused-vars */

import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import Home from "./Pages/Home";
import LogInPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import LayOut from "./features/Navbar/LayOut";
import Protected from "./features/Auth/Component/Protected";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LogOut from "./features/Auth/Component/LogOut";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchAllCartItemsByUserIdAsync } from "./features/Cart/cartSlice";
import { useEffect } from "react";
import PageNotFound404 from "./Pages/PageNotFound404";
import StripeCheckOut from "./Pages/StripeCheckOut";
import OrderSuccessPage from "./Pages/OrderSuccessPage";
import UserOrders from "./features/User/Component/UserOrders";
import UserProfile from "./features/User/Component/UserProfile";
import { fetchLoggedInUserAsync, updateUserInfo } from "./features/User/userSlice";
import ForgotPassword from "./features/Auth/Component/ForgotPassword";
import ProtectedAdmin from "./features/Auth/Component/ProtectedAdmin";
import AdminHome from "./Pages/AdminHome";
import AdminProductDetailPage from "./Pages/AdminProductDetailPage";
import ProductForm from "./features/Admin/Components/ProductForm";
import AdminProductFormPage from "./Pages/AdminProductFormPage";
import AdminOrdersPage from "./Pages/AdminOrdersPage";
import {updateToken} from './features/Auth/AuthSlice'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "",
        element: 
                  <Protected>
                    <Home />  
                  </Protected>,
      },
      {
        path: "admin",
        element: <ProtectedAdmin>
                    <AdminHome/>
                  </ProtectedAdmin>,
      },
      {
        path: "login",
        element: <LogInPage />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "cart",
        element: <Protected><CartPage /></Protected>,
      },
      {
        path: "stripe-checkout",
        element: <Protected><StripeCheckOut/></Protected>,
      },
      {
        path: "checkout",
        element: <Protected><CheckOut /></Protected>,
      },
      {
        path: "product-details/:product_id",
        element: <Protected><ProductDetailPage /></Protected>,
      },
      {
        path: "admin/product-details/:product_id",
        element: <ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>,
      },
      {
        path: "admin/add-product-form",
        element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>,
      },
      {
        path: "admin/orders",
        element: <ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>,
      },
      {
        path: "admin/product-form/edit/:id",
        element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>,
      },
      {
        path: "order-success/:orderId",
        element: <OrderSuccessPage />
      },
      {
        path: "orders",
        element: <Protected><UserOrders /></Protected>
      },
      {
        path: "profile",
        element: <Protected><UserProfile/></Protected>
      },
      {
        path: "Forget-Password",
        element: <ForgotPassword></ForgotPassword>
      },
      {
        path: "*",
        element: <PageNotFound404/>
      }
    ],
  },
]);

function App() {
  const token = useSelector((state) => state.auth.loggedINUserToken);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(1);
    // const checkIfToken = localStorage.getItem('token');
    if(token){
      console.log(4)
      dispatch(fetchLoggedInUserAsync());
      dispatch(fetchAllCartItemsByUserIdAsync());
    }else{
      const checkIfToken = localStorage.getItem('token');
      if(checkIfToken){
        console.log(2);
        dispatch(updateToken(checkIfToken));
      }
      dispatch(updateUserInfo())
      dispatch(clearCart());
    }
      
  },[token,dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
