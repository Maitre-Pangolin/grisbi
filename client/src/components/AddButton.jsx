import React from "react";
import { Fab } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useLocation } from "react-router";
import ROUTES from "../app/routes";

const AddButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
