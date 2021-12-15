import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Signin from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<h1>Not found</h1>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
