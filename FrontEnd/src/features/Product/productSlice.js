import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProduct, fetchProductByFilter ,fetchProductBySort} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);
export const fetchProductByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async (filter) => {
    const response = await fetchProductByFilter(filter);
    return response.data;
  }
);
export const fetchProductBySortAsync = createAsyncThunk(
  "product/fetchProductBySort",
  async (option) => {
    const response = await fetchProductBySort(option);
    return response.data;
  }
);

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
      .addCase(fetchProductBySortAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBySortAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
  },
});

export const { increment } = productSlice.actions;
export default productSlice.reducer;

export const selectCount = (state) => state.product.products;
