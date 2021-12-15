import React from "react";
import { useSelector } from "react-redux";
import { selectIsLogin, selectUser } from "../features/auth/authSlice";
import SigninForm from "../features/auth/SigninForm";
import { Container } from "@mui/material";

const Home = () => {
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);

  return !isLogin ? (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <SigninForm />
    </Container>
  ) : (
    <h1>Logged</h1>
  );
};

export default Home;
