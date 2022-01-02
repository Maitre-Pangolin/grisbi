import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/auth/authSlice";
import {
  getRefreshToken,
  getTokens,
  refreshTokens,
} from "../services/tokenService";
import { useDispatch } from "react-redux";
import { ExpensePieChart } from "./ExpensePieChart";
import { fetchExpensesByMonth } from "../features/expenses/expenseSlice";
import { getCurrentKeyMonth } from "../services/dateConversionService";

const Dev = () => {
  const [data, setData] = useState([12, 19, 3, 5, 2, 3]);
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();

  const checkRefresh = async () => {
    console.log("Before", getTokens());
    await refreshTokens(getRefreshToken());
    console.log("After", getTokens());
  };

  const checkAccessToken = async () => {
    try {
      dispatch(fetchExpensesByMonth(getCurrentKeyMonth()));
    } catch (error) {}
  };

  const addToData = () => {
    const newData = [...data];
    newData[0]++;
    setData(newData);
  };
  return !isLogin ? (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <h1>Not login</h1>
    </Container>
  ) : (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Container sx={{ width: "50%" }}>
        <ExpensePieChart data={data} />
      </Container>
      <h1>Logged</h1>
      <p>{data}</p>
      <Button variant='contained' onClick={addToData}>
        Add to data
      </Button>
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
