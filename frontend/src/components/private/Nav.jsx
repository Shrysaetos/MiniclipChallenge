import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import "./Nav.scss";

const Nav = ({ isLoggedIn }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ alignItems: "right" }}>
          <Toolbar>
            {isLoggedIn && (
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="pageWrapper">
        <Outlet />
      </div>
    </>
  );
};

export default Nav;
