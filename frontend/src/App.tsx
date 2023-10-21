import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home";
import Login from "./pages/login";
import { useDispatch } from "react-redux";
import { autoLogin } from "./redux/user";
import CanActive from "./helpers/CanActive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CanActive />
              <Home />
            </>
          }
        />
        <Route path="/login/*" element={<Login />}></Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
