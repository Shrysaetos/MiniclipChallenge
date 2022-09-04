import React, { useState } from "react ";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/public/Login";
import Home from "./components/private/Home";
import Nav from "./components/private/Nav";
import ReportApproval from "./components/private/ReportApproval";

const App = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setLoggedIn] = useState(token ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsLoggedIn={setLoggedIn} setUser={setUser} />
              )
            }
          ></Route>
          <Route element={<Nav setLoggedIn={setLoggedIn} />}>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Home user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            ></Route>
            <Route
              path="/reports"
              element={
                isLoggedIn ? (
                  <ReportApproval />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
