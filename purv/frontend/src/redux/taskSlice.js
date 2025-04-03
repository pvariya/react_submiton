import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const addtask = createAsyncThunk("task/addTask", async (data) => {
  const res = await axios.post("http://localhost:8090/task/add", data);
  return res.data;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    console: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addtask.fulfilled, (state, actio) => {
      state.loading = false;
      state.tasks.push(actio.payload);
    });
  },
});

const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
  },
});

export default store;
