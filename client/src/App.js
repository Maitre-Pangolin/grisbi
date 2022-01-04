import React, { useEffect } from "react";
import "./App.css";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import MonthlyTotals from "./components/MonthlyTotals";

const signinRedirect = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const isLogin = useSelector(selectIsLogin);

    useEffect(() => {
      !isLogin && navigate("/signin");
    }, [isLogin, navigate]);

    return <Component {...props} />;
  };
};

const RedirectExpenseForm = signinRedirect(ExpenseForm);
const RedirectMonthlyExpenses = signinRedirect(MonthlyExpenses);
const RedirectMonthlyTotals = signinRedirect(MonthlyTotals);

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    dispatch(fetchCategories());
    (async () => {
      try {
        //REFRESHING TOKENS ON APP LOAD
        await refreshTokens(getRefreshToken());
        const user = getPayloadFromToken(getRefreshToken());
        dispatch(setUser(user));
      } catch (error) {
        // ON ERROR OR TOKEN EXPIRY CLEAR LOCAL STORAGE AND LOGOUT
        console.log(error);
        clearTokens();
        if (isLogin) dispatch(logoutThunk());
      }
    })();
  }, [dispatch, isLogin]);

  // On home display login , when signin redirect to current month

  return (
    <HashRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/expense' element={<RedirectExpenseForm />} />
            <Route
              path='/month/:keyMonth'
              element={<RedirectMonthlyExpenses />}
            />
            <Route path='/months' element={<RedirectMonthlyTotals />} />
            {process.env.NODE_ENV === "development" && (
              <Route path='/dev' element={<Dev />} />
            )}
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
        {isLogin && <AddButton />}
      </div>
    </HashRouter>
  );
}

export default App;
