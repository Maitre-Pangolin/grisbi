import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { selectCategoryById, categoryIcons } from "../categories/categorySlice";
import { removeExpense } from "./expenseSlice";
import { useNavigate } from "react-router";

const Expense = ({ expense }) => {
  const { id, name, date, categoryId, amount } = expense;
  const category = useSelector(selectCategoryById(categoryId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(removeExpense(id));
  };

  const handleModify = () => {
    navigate("/expense", { state: expense });
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{categoryIcons[category?.id - 1] || null}</Avatar>
      </ListItemAvatar>
      <Divider orientation='vertical' variant='fullWidth' flexItem />
      <ListItemText
        primary={name}
        secondary={category?.name || "Miscelleanous"}
        sx={{ marginLeft: "20px" }}
      />
      <ListItemText
        primary={amount + " CAD"}
        secondary={date}
        sx={{ marginRight: "20px", textAlign: "right" }}
      />
      <Divider orientation='vertical' variant='fullWidth' flexItem />
      <ListItemIcon style={{ justifyContent: "center" }}>
        <IconButton color='primary' onClick={handleModify}>
          <EditIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon style={{ justifyContent: "center" }}>
        <IconButton color='error' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Expense;
