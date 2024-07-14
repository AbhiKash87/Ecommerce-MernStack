import { configureStore } from '@reduxjs/toolkit';

import productReducer from '../features/Product/productSlice'
import authReducer from '../features/Auth/AuthSlice'
import cartReducer from '../features/Cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import userReducer from '../features/User/userSlice'


export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
    user: userReducer

  },
});