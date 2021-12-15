import React from "react";
import { useSelector } from "react-redux";
import { selectIsLogin, selectUser } from "../features/auth/authSlice";

const Home = () => {
  const isLogin = useSelector(selectIsLogin);
  const user = useSelector(selectUser);

  return <div>{isLogin ? `Welcome ${user?.username}` : "Please Login"}</div>;
};

export default Home;
