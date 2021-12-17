import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createExpense,
  deleteExpense,
  getExpensesByMonth,
  putExpense,
} from "../../api/API";

const fetchExpensesByMonth = createAsyncThunk(
  "expense/fetchExpensesByMonth",
  async (keyMonth) => {
    const response = await getExpensesByMonth(keyMonth);
    return response.data;
  }
);

const addExpense = createAsyncThunk("expense/addExpense", async (expense) => {
  const response = await createExpense(expense);
  return response.data;
});

const modifyExpense = createAsyncThunk(
  "expense/modifyExpense",
  async (expense) => {
    const response = await putExpense(expense.id, expense);
    return response.data;
  }
);

const removeExpense = createAsyncThunk("expense/removeExpense", async (id) => {
  const response = await deleteExpense(id);
  return Number(response.data);
});

const expenseSlice = createSlice({
  name: "expense",
  initialState: { keyMonth: "", expenses: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchExpensesByMonth.fulfilled,
      (state, action) => action.payload
    );
    builder.addCase(
      addExpense.fulfilled,
      (state, action) => {
        if (action.payload["key_month"] === state.keyMonth) {
          state.expenses.push(action.payload);
        }
      },
      builder.addCase(removeExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      }),
      builder.addCase(modifyExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        state.expenses[index] = action.payload;
      })
    );
  },
});

export default expenseSlice.reducer;
export { fetchExpensesByMonth, addExpense, removeExpense, modifyExpense };
export const selectAllExpenses = (state) => state.expenses.expenses;
export const selectKeyMonth = (state) => state.expenses.keyMonth;
export const selectCurrentTotal = (state) =>
  state.expenses.expenses.length
    ? state.expenses.expenses.reduce((acc, expense) => acc + expense.amount, 0)
    : null;
