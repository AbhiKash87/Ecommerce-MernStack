import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createUser} from './AuthAPI'


const initialState = {
  loggedINUser: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "user/fetchAllProduct",
  async (userData) => {
    
    const response = await createUser(userData);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedINUser = action.payload;
      })
    
  },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;


