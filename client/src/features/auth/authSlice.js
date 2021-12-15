import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, logout } from "../../app/api";
import {
  getPayloadFromToken,
  getRefreshToken,
  clearTokens,
  setTokens,
} from "../../app/tokenService";

const signinThunk = createAsyncThunk("auth/signin", async (data) => {
  const response = await signin(data);
  const { "access-token": accessToken, "refresh-token": refreshToken } =
    response.headers;
  setTokens({ accessToken, refreshToken });
  const stockedRefreshToken = getRefreshToken();
  const user = getPayloadFromToken(stockedRefreshToken);
  return user;
});

const logoutThunk = createAsyncThunk("auth/logout", async () => {
  const refreshToken = getRefreshToken();
  clearTokens();
  try {
    console.log("Im fresh", refreshToken);
    await logout(refreshToken);
  } catch (error) {
    console.log(error);
  }

  return;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignIn: false,
    loginError: false,
    user: {},
  },
  reducers: {
    resetLoginError: (state) => {
      state.loginError = false;
    },
    setLoginError: (state) => {
      state.loginError = true;
    },
    setUser: (state, action) => {
      state.loginError = false;
      state.isSignIn = true;
      state.user = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.isSignIn = true;
      state.loginError = false;
      state.user = { ...action.payload };
    });
    builder.addCase(signinThunk.rejected, (state) => {
      state.loginError = true;
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isSignIn = false;
      state.loginError = false;
      state.user = {};
    });
  },
});

export const { resetLoginError, setLoginError, setUser } = authSlice.actions;
export { signinThunk, logoutThunk };
export default authSlice.reducer;
export const selectIsError = (state) => state.auth.loginError;
export const selectUser = (state) => state.auth.user;
export const selectIsLogin = (state) => state.auth.isSignIn;
