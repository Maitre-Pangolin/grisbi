import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectKeyMonth } from "../expenses/expenseSlice";
import { setBudget, modifyBudget } from "./budgetsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "white",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalBudget = ({ isOpen, setIsOpen, budget }) => {
  const [amount, setAmount] = useState(budget?.amount || 0);
  const [error, setError] = useState("");
  const keyMonth = useSelector(selectKeyMonth);
  const dispatch = useDispatch();

  useEffect(() => {
    setAmount(budget?.amount || 0);
  }, [isOpen]);

  const handleSubmit = () => {
    if (amount <= 0) return setError("Budget amount should be positive");
    budget?.amount
      ? dispatch(modifyBudget({ keyMonth, amount }))
      : dispatch(setBudget({ keyMonth, amount }));
    setIsOpen(false);
  };

  const handleChange = ({ target }) => {
    setAmount(target.value);
    setError("");
  };

  const handleClose = () => {
    setError("");
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen}>
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          bgcolor: "white",
          width: { xs: "90%", md: "50%" },
          p: "40px",
          transform: "translate(-50%, -50%)",
        }}>
        <TextField
          id='outlined-basic'
          type='number'
          label='Budget'
          name='budget'
          variant='outlined'
          error={error !== ""}
          helperText={error}
          value={amount}
          onChange={handleChange}
        />
        <Button variant='contained' onClick={handleSubmit}>
          Set Budget
        </Button>
        <Button variant='outlined' onClick={handleClose}>
          Close
        </Button>
      </Container>
    </Modal>
  );
};

export default ModalBudget;
