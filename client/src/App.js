import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { setUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  clearTokens,
  getPayloadFromToken,
  getRefreshToken,
  isTokenExpired,
} from "./app/tokenService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return;
    if (isTokenExpired(refreshToken)) clearTokens();
    const user = getPayloadFromToken(refreshToken);
    dispatch(setUser(user));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
