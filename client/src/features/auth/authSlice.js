import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin } from "../../app/api";

// First, create the thunk
export const signinThunk = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    const response = await signin(data);
    //console.log("Thunk", response);
    const { "access-token": accessToken, "refresh-token": refreshToken } =
      response.headers;
    //TOKEN STORING
    const user = { ...response.data, accessToken, refreshToken };
    localStorage.setItem("user", JSON.stringify(user));
    return response.data;
  }
);

// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignIn: false,
    loginError: false,
    user: {},
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    resetLoginError: (state) => {
      state.loginError = false;
    },
    setLoginError: (state) => {
      state.loginError = true;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.isSignIn = true;
      state.loginError = false;
      state.user = { ...action.payload };
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.loginError = true;
    });
  },
});

export const { resetLoginError, setLoginError } = authSlice.actions;
export default authSlice.reducer;
export const selectIsError = (state) => state.auth.loginError;
export const selectUser = (state) => state.auth.user;
export const selectIsLogin = (state) => state.auth.isSignIn;
