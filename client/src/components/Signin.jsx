import React from "react";
import SigninForm from "../features/auth/SigninForm";
import { Container } from "@mui/material";

const Signin = () => {
  return (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <SigninForm />
    </Container>
  );
};

export default Signin;
