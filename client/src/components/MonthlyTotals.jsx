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
import { useNavigate } from "react-router-dom";
import { getMonthlyTotalsAndBudgets } from "../api/API";
import { getDateStringFromKeyMonth } from "../services/dateConversionService";

const MonthlyTotals = () => {
  /*const months = [
    { keyMonth: "2021-12", total: 500, budget: 600 },
    { keyMonth: "2021-11", total: 400, budget: 200 },
  ];*/

  const [months, setMonths] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data } = await getMonthlyTotalsAndBudgets();
    const months = Object.keys(data.months).map((keyMonth) => ({
      keyMonth,
      ...data.months[keyMonth],
    }));
    setMonths(months);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    /*<div>
      {months.map((month) => (
        <li key={month?.keyMonth}>
          {month?.keyMonth} | Total :{month?.total} Budget :{month?.budget}{" "}
        </li>
      ))}
      </div>*/
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
