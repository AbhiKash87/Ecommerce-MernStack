import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchProductByFilter,fetchAllBrands,fetchAllCategories,fetchProductByID } from "./productAPI";

const initialState = {
  products: [],
  brands:[],
  categories:[],
  product:null,
  status: "idle",
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    return response.data; 
  }
);
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
// export const fetchProductBySortAsync = createAsyncThunk(
//   "product/fetchProductBySort",
//   async (option) => {
//     const response = await fetchProductBySort(option);
//     return response.data;
//   }
// );

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = [...state.products, ...action.payload];
      })
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
    
  },
});

export const { increment } = productSlice.actions;
export default productSlice.reducer;

export const selectCount = (state) => state.product.products;
