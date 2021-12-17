import React, { useEffect } from "react";
import Expense from "./Expense";
import { Divider, List, ListSubheader, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectKeyMonth,
  selectAllExpenses,
  selectCurrentTotal,
} from "./expenseSlice";
import { getDateStringFromKeyMonth } from "../../services/dateConversionService";

const Expenses = () => {
  const expenses = useSelector(selectAllExpenses);
  const keyMonth = useSelector(selectKeyMonth);
  const total = useSelector(selectCurrentTotal);

  return (
    <List>
      <ListSubheader sx={{ textAlign: "center" }}>
        <Typography variant='h5'>
          <span style={{ color: "green" }}>{total.toFixed(2)}</span> | 1500 CAD
        </Typography>
      </ListSubheader>
      <ListSubheader>
        Expenses for {getDateStringFromKeyMonth(keyMonth)}
      </ListSubheader>
      <Divider />
      {expenses.map((expense) => (
        <React.Fragment key={expense.id}>
          {" "}
          <Expense expense={expense} />
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Expenses;
