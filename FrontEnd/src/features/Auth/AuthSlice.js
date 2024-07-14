/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {signUp,Login,signOut} from './AuthAPI'



const initialState = {
  loggedINUserToken: null,
  isProtected:false,
  status: "idle",
  error:null,
};

export const signUpAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    
    const response = await signUp(userData);
    return response.data; 
  }
);
export const loginUserAync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo,{rejectWithValue}) => {
    
   try{
    const response = await Login(loginInfo);
    return response.data; 
   }catch(error){
      console.log(error)
      return rejectWithValue(error)
   }
  }
);
export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async () => {
    
    const response = await signOut();
    return response.data; 
  }
);
// export const updateTokenAsync = createAsyncThunk(
//   "auth/updateTokenAsync",
//   async (token) => {
    
//     return token; 
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    updateToken: (state,token) => {
      console.log(3)
      state.loggedINUserToken = token;
      state.isProtected = true;
    },
    getToken: (state,token) => {
      return state.loggedINUserToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedINUser = action.payload;
      })
      .addCase(loginUserAync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedINUserToken = action.payload.token;
        state.isProtected = true;
        localStorage.setItem('token',action.payload.token)
        const error ={
          message:action.payload.message
        }
        state.error = error;
      })
      .addCase(loginUserAync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state,action) => {
        state.status = "idle";
        state.loggedINUserToken = null;
        state.isProtected = false;
        localStorage.removeItem('token')
       
      })
      // .addCase(updateTokenAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(updateTokenAsync.fulfilled, (state,action) => {
      //   state.status = "idle";
      //   state.loggedINUserToken = action.payload;
       
      // })
     
     
    
  },
});

export const { increment,userLogOut,updateToken,getToken} = authSlice.actions;
export default authSlice.reducer;


