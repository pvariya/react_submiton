import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const token = localStorage.getItem("token");
export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expenseData) => {
    try {
      const response = await axios.post("http://localhost:8090/expenses", expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add expense");
    }
  }
);

export const getExpenses = createAsyncThunk("expenses/getExpenses", async (month) => {
  try {
    const response = await axios.get(`http://localhost:8090/expenses?month=${month}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get expenses");
  }
});

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ id, expenseData }, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.put(`http://localhost:8090/expenses/${id}`, expenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);



export const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (id) => {
  await axios.delete(`http://localhost:8090/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return id;
});

export const getSummary = createAsyncThunk(
  "expenses/getSummary",
  async (month) => {
    const response = await axios.get(`http://localhost:8090/expenses/summary?month=${month}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);


const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    summary: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (expense) => expense._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (expense) => expense._id !== action.payload
        );
      })
      .addCase(getSummary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default expenseSlice.reducer;
