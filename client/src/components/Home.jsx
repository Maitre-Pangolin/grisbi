import React from "react";
import { useSelector } from "react-redux";
import { selectIsLogin, selectUser } from "../features/auth/authSlice";
import SigninForm from "../features/auth/SigninForm";
import { Container, Button } from "@mui/material";

const Home = () => {
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);

  return !isLogin ? (
    <Container sx={{ width: { sm: 1, md: 1 / 2 }, mt: "50px" }}>
      <SigninForm />
    </Container>
  ) : (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1>Logged</h1>
      <Button variant='contained'>Check token refresh</Button>
      <Button variant='contained'>Check access token works</Button>
    </Container>
  );
};

export default Home;
