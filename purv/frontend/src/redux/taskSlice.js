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

export const getTask = createAsyncThunk("task/getTask", async () => {
  try {
    const res = await axios.get("http://localhost:8090/task/get");
    return res.data;
  } catch (error) {
    return error;
  }
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  const res = await axios.delete(`http://localhost:8090/task/${id}`);
  return id;
});

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }) => {
    // console.log("slice page", id, data);
    const res = await axios.put(`http://localhost:8090/task/${id}`, data);
    return res.data;
  }
);

export const getTaskBtId = createAsyncThunk("task/getTaskBtId", async (id) => {
  const res = await axios.get(`http://localhost:8090/task/${id}`);
  return res.data;
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    taskDetails: null,
    loading: false,
    console: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtask.fulfilled, (state, actio) => {
        state.loading = false;
        state.tasks.push(actio.payload);
      })
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
        state.tasks = updatedTasks;
      })
      .addCase(getTaskBtId.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetails = action.payload;
      });
  },
});

const store = configureStore({
  reducer: {
    task: taskSlice.reducer,
  },
});

export default store;
