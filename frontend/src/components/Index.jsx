import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import Login from "./public/Login";
import Home from "./private/Home";
import Report from "./private/Report";
import Nav from "./private/Nav";

const Index = ({ isLoggedIn, setLoggedIn, user, setUser }) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setIsLoggedIn={setLoggedIn}
                isLoggedIn={isLoggedIn}
                setUser={setUser}
              />
            }
          ></Route>
          <Route element={<Nav isLoggedIn={isLoggedIn}/>}>
            <Route
              path="/home"
              element={<Home isLoggedIn={isLoggedIn} user={user} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Index;
