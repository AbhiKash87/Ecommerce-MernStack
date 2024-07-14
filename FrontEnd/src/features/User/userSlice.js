import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  fetchLoggedInUserOrder,updateUser,fetchLoggedInUser} from './userAPI'


const initialState = {
  userOrders: null,
  status: "idle",
  userInfo:null       //this will have more information about logged in user
};

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async () => {
      const response = await fetchLoggedInUser();
      return response.data; 
    }
);
export const updateUserAsync = createAsyncThunk(
    "user/updateUser",
    async (updateData) => {
      const response = await updateUser(updateData);
      return response.data; 
    }
);

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async () => {
    const response = await fetchLoggedInUserOrder();
    return response.data; 
  }
);


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        increment: (state) => {
        state.value += 1;
        },
        updateUserInfo: (state)=>{
            state.userInfo = null;
        }
    },

    extraReducers: (builder) => {
        builder
        
        .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
            state.status = "idle";
            // this information can be different from normal user login
            state.userOrders = action.payload;
        })
        
        .addCase(fetchLoggedInUserAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.userInfo = action.payload;
        })

        .addCase(updateUserAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.status = "idle";
            // this information can be different from normal user login
            state.userInfo = action.payload;
        })
        
        
        
    }
});

export const { increment,updateUserInfo} = userSlice.actions;
export default userSlice.reducer;


