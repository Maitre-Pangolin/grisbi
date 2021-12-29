import React from "react";
import { Fab } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useLocation } from "react-router";
import ROUTES from "../app/routes";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../features/auth/authSlice";

const AddButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);
  if (!isLogin) return null;

  return location.pathname === "/expense" ? null : (
    <Fab
      size='large'
      variant='extended'
      color='primary'
      aria-label='add expense'
      onClick={() => {
        navigate(ROUTES.expense());
      }}
      sx={{ position: "fixed", right: "10%", bottom: "25px" }}>
      <DescriptionIcon sx={{ mr: 1 }} /> Add expense
    </Fab>
  );
};

export default AddButton;
