import React from "react";
import { Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/auth/authSlice";
import {
  getRefreshToken,
  getTokens,
  refreshTokens,
} from "../services/tokenService";
import { fetchExpensesByMonth } from "../api/API.js";

const Dev = () => {
  const isLogin = useSelector(selectIsLogin);

  const checkRefresh = async () => {
    console.log("Before", getTokens());
    await refreshTokens(getRefreshToken());
    console.log("After", getTokens());
  };

  const checkAccessToken = async () => {
    try {
      const { data } = await fetchExpensesByMonth("2021-12");
      console.log(data);
    } catch (error) {}
  };

  return !isLogin ? (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <h1>Not login</h1>
    </Container>
  ) : (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1>Logged</h1>
      <Button variant='contained' onClick={checkRefresh}>
        Check token refresh
      </Button>
      <Button variant='contained' onClick={checkAccessToken}>
        Check access token works
      </Button>
    </Container>
  );
};

export default Dev;
