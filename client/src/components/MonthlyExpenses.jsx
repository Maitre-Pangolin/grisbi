import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/auth/authSlice";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchExpensesByMonth,
  selectAllExpenses,
  selectKeyMonth,
} from "../features/expenses/expenseSlice";
import Expenses from "../features/expenses/Expenses";
import { useParams, useNavigate } from "react-router";
import { fetchBudgetByMonth } from "../features/budgets/budgetsSlice";
import { ExpensePieChart } from "./ExpensePieChart";

const MonthlyExpenses = () => {
  const isLogin = useSelector(selectIsLogin);
  const keyMonth = useSelector(selectKeyMonth);
  const expenses = useSelector(selectAllExpenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.keyMonth.match(/^[\d]{4}-[\d]{2}$/)) navigate("/");
    if (isLogin && keyMonth !== params.keyMonth)
      dispatch(fetchExpensesByMonth(params.keyMonth));
    dispatch(fetchBudgetByMonth(params.keyMonth));
  }, [dispatch, isLogin, keyMonth, navigate, params.keyMonth]);

  return (
    <Container
      sx={{
        width: { sm: 1, md: "900px" },
        mt: "50px",
        paddingBottom: "100px",
      }}>
      {expenses.length ? <ExpensePieChart expenses={expenses} /> : null}
      {keyMonth && <Expenses expenses={expenses} />}
    </Container>
  );
};

export default MonthlyExpenses;
