import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { logoutThunk, selectIsLogin, setUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
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
import AddButton from "./components/AddButton";
import ROUTES from "./app/routes";
import MonthlyTotals from "./components/MonthlyTotals";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    dispatch(fetchCategories());
    (async () => {
      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const user = getPayloadFromToken(refreshToken);
          dispatch(setUser(user));
          await refreshTokens(refreshToken);
        }
      } catch (error) {
        clearTokens();
        if (isLogin) dispatch(logoutThunk());
      }
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path={ROUTES.home()} element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/expense' element={<ExpenseForm />} />
            <Route path='/month/:keyMonth' element={<MonthlyExpenses />} />
            <Route path='/months' element={<MonthlyTotals />} />
            <Route path='/dev' element={<Dev />} />
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
        <AddButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
