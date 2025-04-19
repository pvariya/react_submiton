import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "product/addproduct",
  async (data, { rejectWithValue }) => {
    try {
      const product = await axios.post("http://localhost:3000/Products", data);
      return product.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProduct = createAsyncThunk("product/getproduct", async () => {
  try {
    const product = await axios.get("http://localhost:3000/Products");
    return product.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
});

export const deleteProduct = createAsyncThunk(
  "product/deleteproduct",
  async (id) => {
    try {
      const deleteProduct = await axios.delete(
        `http://localhost:3000/Products/${id}`
      );
      return deleteProduct.data;
    } catch (error) {
      throw new Error("Failed to delete product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    try {
      const update = await axios.put(
        `http://localhost:3000/Products/${id}`,
        data
      );
      return update.data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }
);

export const getById = createAsyncThunk("product/getById", async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/Products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch product by ID");
  }
});

export const statusChang = createAsyncThunk(
  "product/statusChang",
  async ({ id, data }) => {
    try {
      const res = await axios.put(`http://localhost:3000/Products/${id}`, data);
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch product by ID");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (pro) => {
    pro
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProducts = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        state.products = updatedProducts;
      })
      .addCase(statusChang.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProducts = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        state.products = updatedProducts;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      });
  },
});

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});

export default store;
