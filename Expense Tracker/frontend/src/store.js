import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';
import authReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
});

export default store;