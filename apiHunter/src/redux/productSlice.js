import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    const product = await axios.get("http://localhost:3000/products");
    return product.data;
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filteredProducts: [], // Stores filtered/sorted products
    error: null,
    loading: false,
  },
  reducers: {
    searchProduct: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    },
    sortProduct: (state, action) => {
      const sortBy = action.payload; // 'price' or 'title'
      state.filteredProducts = [...state.filteredProducts].sort((a, b) =>
        sortBy === "price" ? a.price - b.price : a.title.localeCompare(b.title)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filtered products
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { searchProduct, sortProduct } = productSlice.actions;

const store = configureStore({
  reducer: { 
    product: productSlice.reducer,
  },
});

export default store;
