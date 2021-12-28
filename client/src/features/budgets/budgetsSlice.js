import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createBudget, getBudgetByMonth, putBudget } from "../../api/API";

const fetchBudgetByMonth = createAsyncThunk(
  "budget/fetchBudgetByMonth",
  async (keyMonth) => {
    const response = await getBudgetByMonth(keyMonth);
    return response.data;
  }
);

const setBudget = createAsyncThunk(
  "budget/setBudget",
  async ({ keyMonth, amount }) => {
    const response = await createBudget(keyMonth, amount);
    return response.data;
  }
);

const modifyBudget = createAsyncThunk(
  "budget/modifyBudget",
  async ({ keyMonth, amount }) => {
    const response = await putBudget(keyMonth, amount);
    return response.data;
  }
);

const budgetsSlice = createSlice({
  name: "budget",
  initialState: { budget: null },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchBudgetByMonth.fulfilled,
      (state, action) => action.payload
    );
    builder.addCase(setBudget.fulfilled, (state, action) => action.payload);
    builder.addCase(modifyBudget.fulfilled, (state, action) => action.payload);
  },
});

export default budgetsSlice.reducer;
export { fetchBudgetByMonth, setBudget, modifyBudget };
export const selectBudget = (state) => state.budgets.budget;
