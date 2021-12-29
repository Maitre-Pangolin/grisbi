import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../features/categories/categorySlice";
import {
  getCurrentKeyMonth,
  getKeyMonthFromDateString,
} from "../services/dateConversionService";
import {
  addExpense,
  modifyExpense,
  removeExpense,
} from "../features/expenses/expenseSlice";
import { useLocation, useNavigate } from "react-router";

const emptyForm = {
  id: "",
  name: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  keyMonth: getCurrentKeyMonth(),
  categoryId: "",
};

const ExpenseForm = ({ expenseID, setExpenseID }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const expense = location.state;
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState({
    name: "",
    amount: "",
  });
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    expense ? setFormData(expense) : setFormData(emptyForm);
    setError({ name: "", amount: "" });
  }, [expense]);

  const handleSubmit = async () => {
    let isError = false;
    const data = { ...formData };
    if (!data.name) {
      setError((error) => ({ ...error, name: "Enter an expense name" }));
      isError = true;
    }
    if (!data.amount || data.amount <= 0) {
      setError((error) => ({ ...error, amount: "Enter a valid amount" }));
      isError = true;
    }

    if (!data.categoryId) {
      data.categoryId = 1;
    }
    data.keyMonth = getKeyMonthFromDateString(data.date);
    if (isError) return;

    try {
      if (expense) {
        dispatch(modifyExpense(data));
        navigate(-1);
      } else {
        dispatch(addExpense(data));
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setFormData(emptyForm);
    setError({ name: "", amount: "" });
  };

  const handleDelete = () => {
    dispatch(removeExpense(expense.id));
    navigate(-1);
  };

  const handleChange = ({ target }) => {
    if (error[target.name])
      setError((error) => ({ ...error, [target.name]: "" }));
    setFormData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleAmountChange = ({ target }) => {
    if (error.amount) setError((error) => ({ ...error, amount: "" }));
    setFormData((prevState) => ({
      ...prevState,
      amount: parseInt(target.value, 10),
    }));
  };
  if (!categories || !categories.length) return null;
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        mt: "50px",
      }}>
      <Button
        variant='outlined'
        size='large'
        startIcon={<ArrowBackIcon />}
        sx={{ width: "fit-content" }}
        onClick={() => {
          navigate(-1);
        }}>
        Back
      </Button>
      <Typography variant='h5'>
        {expense ? "Edit Expense" : "Add Expense"}
      </Typography>
      <TextField
        id='expense-name'
        label='Expense Name'
        name='name'
        error={error.name !== ""}
        helperText={error.name}
        variant='standard'
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        id='outlined-basic'
        type='number'
        label='Amount'
        error={error.amount !== ""}
        helperText={error.amount}
        name='amount'
        variant='standard'
        value={formData.amount}
        onChange={handleAmountChange}
      />
      <TextField
        id='outlined-select-currency'
        select
        label='Category'
        name='categoryId'
        value={formData.categoryId}
        onChange={handleChange}
        variant='standard'>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id='outlined-select-currency'
        label='Date'
        name='date'
        variant='standard'
        type='date'
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.date}
        onChange={handleChange}></TextField>

      <Button variant='contained' size='large' onClick={handleSubmit}>
        {expense ? "Update Expense" : "ADD Expense"}
      </Button>
      <Button
        variant='contained'
        size='large'
        color='error'
        disabled={!(formData.name || formData.id || formData.amount)}
        onClick={expense ? handleDelete : handleClear}>
        {expense ? "Delete expense" : "Clear"}
      </Button>
    </Container>
  );
};

export default ExpenseForm;
