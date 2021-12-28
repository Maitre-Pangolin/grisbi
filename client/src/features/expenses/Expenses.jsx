import React, { useState } from "react";
import Expense from "./Expense";
import {
  Divider,
  List,
  ListSubheader,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import {
  selectKeyMonth,
  selectAllExpenses,
  selectCurrentTotal,
} from "./expenseSlice";
import { getDateStringFromKeyMonth } from "../../services/dateConversionService";
import { selectBudget } from "../budgets/budgetsSlice";
import ModalBudget from "../budgets/ModalBudget";

const Expenses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const expenses = useSelector(selectAllExpenses);
  const keyMonth = useSelector(selectKeyMonth);
  const total = useSelector(selectCurrentTotal);
  const budget = useSelector(selectBudget);

  return (
    <React.Fragment>
      <List>
        <ListSubheader sx={{ textAlign: "center" }}>
          <Typography variant='h5'>
            You spent{" "}
            <span style={{ color: budget?.amount > total ? "green" : "red" }}>
              {total?.toFixed(2)}
            </span>{" "}
            over your {budget?.amount ? budget?.amount?.toFixed(2) : "-"} CAD
            monthly budget.
            <IconButton
              color='info'
              variant='contained'
              onClick={() => {
                setIsModalOpen(true);
              }}>
              <EditIcon />
            </IconButton>
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
      <ModalBudget
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        budget={budget}
      />
    </React.Fragment>
  );
};

export default Expenses;
