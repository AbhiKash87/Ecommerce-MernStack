import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {  addToCart,fetchAllCartItemsByUserId,updateCart,deleteItemFromCart, resetCart} from './cartAPI';




const initialState = {
  items:[],
  status: 'idle'
};

export const  addToCartAsync = createAsyncThunk(
  'cart/addTocart',
  async(item)=>{
    const response = await addToCart(item);
    return response.data;
  }
)
export const  updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async({update})=>{
    const response = await updateCart({update});
    return response.data;
  }
)
export const  deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async(itemId)=>{
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
)
export const  resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async()=>{
    const response = await resetCart();
    return response.data;
  }
)
export const fetchAllCartItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchAllCartItemsByUserId',
  async()=>{

    const response = await fetchAllCartItemsByUserId();
    return response.data;
  }
)



export const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {
              increment:(state)=>{
                console.log(state.status)
              },
              clearCart:(state)=>{
                state.items = []
              }
            },
  extraReducers: (builder)=>{
    (builder)

      .addCase(addToCartAsync.pending, (state)=>{
        state.status = 'loading'
      })
      .addCase(addToCartAsync.fulfilled, (state,action)=>{
        state.status = 'idle',
        state.items.push(action.payload);
      })
      .addCase(fetchAllCartItemsByUserIdAsync.pending, (state)=>{
        state.status = 'loading'
      })
      .addCase(fetchAllCartItemsByUserIdAsync.fulfilled, (state,action)=>{
        state.status = 'idle',
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state)=>{
        state.status = 'loading'
      })
      .addCase(updateCartAsync.fulfilled, (state,action)=>{
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload.id)
        state.items[index] = action.payload;
       
      })
      .addCase(deleteItemFromCartAsync.pending, (state)=>{
        state.status = 'loading'
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state,action)=>{
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id === action.payload.id)
        state.items.splice(index,1);
       
      })
      .addCase(resetCartAsync.pending, (state)=>{
        state.status = 'loading'
      })
      .addCase(resetCartAsync.fulfilled, (state)=>{
        state.status = 'idle';
        state.items = []
        
      })
    
  }
});

export default cartSlice.reducer;
export const {increment,clearCart} = cartSlice.actions;

