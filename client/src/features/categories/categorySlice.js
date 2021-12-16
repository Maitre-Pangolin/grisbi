import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../api/API";

const fetchCategories = createAsyncThunk("category/getCategory", async () => {
  const response = await getCategories();
  return response.data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategories.fulfilled, (state, action) => ({
      ...action.payload,
    }));
  },
});

export default categorySlice.reducer;
export { fetchCategories };
export const selectAllCategories = (state) => state.categories;
