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
import { fetchBudgetByMonth } from "../features/budgets/budgetsSlice";

const Home = () => {
  const isLogin = useSelector(selectIsLogin);
  const keyMonth = useSelector(selectKeyMonth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin && keyMonth !== getCurrentKeyMonth()) {
      dispatch(fetchExpensesByMonth(getCurrentKeyMonth()));
      dispatch(fetchBudgetByMonth(getCurrentKeyMonth()));
    }
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
};

export default Home;
