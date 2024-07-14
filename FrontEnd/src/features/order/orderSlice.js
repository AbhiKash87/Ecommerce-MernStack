import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createOrder,fetchAllOrder, updateOrder} from './orderAPI'


const initialState = {
  orders: null,
  status: "idle",
  currentOrder:null,
  tempOrder:null,
  totalOrders:0

};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (newOrder) => {
    const response = await createOrder(newOrder);
    return response.data; 
  }
);
export const updateOrderAsync = createAsyncThunk(
  
  "order/updateOrder",
  async (newOrder) => {
    const response = await updateOrder(newOrder);
    return response.data; 
  }
);

export const fetchAllOrderAsync = createAsyncThunk(
  "user/fetchAllOrder",
  async ({pagination,sortOption}) => {
    const response = await fetchAllOrder({pagination,sortOption});
    return response.data; 
  }
);




export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state.orders)
    },
    reserCurrentOrder: (state) => {
      state.currentOrder = null
    },
    createTempOrder: (state,order) => {
      state.tempOrder = order;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(item=>item.id === action.payload.id)
        state.orders[index] = action.payload;
      })
      .addCase(fetchAllOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrderAsync.fulfilled, (state, action) => {
          state.status = "idle";
          // console.log(action.payload)
          state.orders = action.payload.orders;
          state.totalOrders = action.payload.totalOrders
      })
     
    
  },
});

export const { increment,reserCurrentOrder,createTempOrder} = orderSlice.actions;
export default orderSlice.reducer;


