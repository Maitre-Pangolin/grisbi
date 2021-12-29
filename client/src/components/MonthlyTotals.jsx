import {
  List,
  ListSubheader,
  Divider,
  ListItemButton,
  Box,
  Typography,
  Container,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMonthlyTotalsAndBudgets } from "../api/API";
import { selectIsLogin } from "../features/auth/authSlice";
import { getDateStringFromKeyMonth } from "../services/dateConversionService";
import { getAccessToken } from "../services/tokenService";
import SigninForm from "../features/auth/SigninForm";

const MonthlyTotals = () => {
  /*const months = [
    { keyMonth: "2021-12", total: 500, budget: 600 },
    { keyMonth: "2021-11", total: 400, budget: 200 },
  ];*/

  const [months, setMonths] = useState([]);
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);

  const fetchData = async () => {
    const { data } = await getMonthlyTotalsAndBudgets();
    const months = Object.keys(data.months).map((keyMonth) => ({
      keyMonth,
      ...data.months[keyMonth],
    }));
    setMonths(months);
  };

  useEffect(() => {
    if (getAccessToken() && isLogin) fetchData();
  }, []);

  return !isLogin ? (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <SigninForm />
    </Container>
  ) : (
    <List sx={{ width: "50%", m: "auto" }}>
      <ListSubheader>Monthly Totals</ListSubheader>
      <Divider />
      {months.map((month) => (
        <React.Fragment key={month?.keyMonth}>
          <ListItemButton
            onClick={() => {
              navigate(`/month/${month.keyMonth}`);
            }}>
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}>
              <Typography>
                {getDateStringFromKeyMonth(month.keyMonth)}
              </Typography>
              <Typography>
                {month.total ? Number(month?.total).toFixed(2) : 0} /{" "}
                {month?.budget || "-"}
                {month.budget && month.total
                  ? " ( " + Number(month.budget - month.total).toFixed(2) + " )"
                  : null}
              </Typography>
            </Container>
          </ListItemButton>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default MonthlyTotals;
