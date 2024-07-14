/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateProduct, fetchProductByFilter,fetchAllBrands,fetchAllCategories,fetchProductByID ,createProduct} from "./productAPI";

const initialState = {
  products: [],
  brands:[],
  categories:[],
  product:null,
  status: "idle",
};


export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data; 
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data; 
  }
);
// export const deleteProductAsync = createAsyncThunk(
//   "product/deleteProduct",
//   async (product_id) => {
//     const response = await deleteProduct(product_id);
//     return response.data; 
//   }
// );
export const fetchProductByIDAsync = createAsyncThunk(
  "product/fetchProductByID",
  async (product_id) => {
    const response = await fetchProductByID(product_id);
    return response.data; 
  }
);
export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({filter,sortOption,pagination}) => {
    const response = await fetchProductByFilter({filter,sortOption,pagination});
    return response.data;
  }
);


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("fullfilled: ",action.payload);
        if (Array.isArray(action.payload) && Array.isArray(state.products)) {
          state.products = [...state.products, ...action.payload];
        }


      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.data.findIndex(item=>item.id === action.payload.id)
        state.products.data[index] = action.payload;
      })
      // .addCase(deleteProductAsync.pending, (state)=>{
      //   state.status = 'loading'
      // })
      // .addCase(deleteProductAsync.fulfilled, (state,action)=>{
      //   state.status = 'idle';
      //   const index = state.products.findIndex(item=>item.id === action.payload.id)
      //   state.products.splice(index,1);
       
      // })
    
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;

export const selectCount = (state) => state.product.products;
