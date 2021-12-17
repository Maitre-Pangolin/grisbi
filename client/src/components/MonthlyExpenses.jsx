import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/auth/authSlice";
import SigninForm from "../features/auth/SigninForm";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchExpensesByMonth,
  selectKeyMonth,
} from "../features/expenses/expenseSlice";
import { getCurrentKeyMonth } from "../services/dateConversionService";
import Expenses from "../features/expenses/Expenses";
import { useParams, useNavigate, Navigate } from "react-router";

const MonthlyExpenses = () => {
  const isLogin = useSelector(selectIsLogin);
  const keyMonth = useSelector(selectKeyMonth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.keyMonth.match(/^[\d]{4}-[\d]{2}$/)) navigate("/");
    if (isLogin && keyMonth !== params.keyMonth)
      dispatch(fetchExpensesByMonth(params.keyMonth));
  }, [dispatch, isLogin, keyMonth]);

  return !isLogin ? (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <SigninForm />
    </Container>
  ) : (
    <Container sx={{ width: { sm: 1, md: "900px" }, mt: "50px" }}>
      {keyMonth ? <Expenses /> : null}
    </Container>
  );
  return null;
};

export default MonthlyExpenses;
