import { configureStore } from '@reduxjs/toolkit';

import productReducer from '../features/Product/productSlice'
import authReducer from '../features/Auth/AuthSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user:authReducer
  },
});