import { List, ListSubheader, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getMonthlyTotalsAndBudgets } from "../api/API";
import { selectIsLogin } from "../features/auth/authSlice";
import { getAccessToken } from "../services/tokenService";
import MonthlyTotalItem from "./MonthlyTotalItem";

const MonthlyTotals = () => {
  const [months, setMonths] = useState([]);
  const isLogin = useSelector(selectIsLogin);

  const fetchData = async () => {
    const { data } = await getMonthlyTotalsAndBudgets();
    const months = Object.keys(data.months).map((keyMonth) => ({
      keyMonth,
      ...data.months[keyMonth],
    }));
    months.sort((e1, e2) => (e1.keyMonth > e2.keyMonth ? -1 : 1));
    setMonths(months);
  };

  useEffect(() => {
    if (getAccessToken() && isLogin) fetchData();
  }, [isLogin]);

  return (
    <List sx={{ width: { sm: "100%", md: "800px" }, m: "auto", p: "20px" }}>
      <ListSubheader>Monthly Totals</ListSubheader>
      <Divider />
      {months.map((month) => (
        <MonthlyTotalItem month={month} key={month.keyMonth} />
      ))}
    </List>
  );
};

export default MonthlyTotals;
