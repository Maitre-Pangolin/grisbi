import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { logoutThunk, setUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  clearTokens,
  getPayloadFromToken,
  getRefreshToken,
  refreshTokens,
} from "./services/tokenService";
import { fetchCategories } from "./features/categories/categorySlice";
import Dev from "./components/Dev";
import ExpenseForm from "./components/ExpenseForm";
import MonthlyExpenses from "./components/MonthlyExpenses";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    (async () => {
      try {
        const refreshToken = getRefreshToken();
        const user = getPayloadFromToken(refreshToken);
        dispatch(setUser(user));
        await refreshTokens(refreshToken);
      } catch (error) {
        clearTokens();
        dispatch(logoutThunk());
      }
    })();
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
            <Route path='/expense' element={<ExpenseForm />} />
            <Route path='/month/:keyMonth' element={<MonthlyExpenses />} />
            <Route path='/dev' element={<Dev />} />
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
