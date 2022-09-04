import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

import MessageStrip from "../utils/MessageStrip";

const theme = createTheme();

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      return {
        ...state,
        message: {
          isOpen: true,
          severity: action.severity,
          message: action.message,
        },
      };
    case "HIDE_MESSAGE":
      return {
        ...state,
        message: {
          isOpen: false,
          severity: "info",
          message: "",
        },
      };
    default:
      return state;
  }
};

const Login = ({ setIsLoggedIn, setUser }) => {
  const [{ message }, dispatch] = useReducer(reducer, {
    message: { isOpen: false, severity: "info", message: "" },
  });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await axios
      .post("http://localhost:3000/auth/login", form)
      .then((result) => {
        dispatch(
          result.data.success
            ? {
                type: "SHOW_MESSAGE",
                severity: "success",
                message: result.data.message,
              }
            : {
                type: "SHOW_MESSAGE",
                severity: "error",
                message: result.data.message,
              }
        );
        if (result.data.success) {
          localStorage.setItem("token", result.data.data.access_token);
          localStorage.setItem("user", JSON.stringify(result.data.data.user));
          setUser(result.data.data.user);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SHOW_MESSAGE",
          severity: "error",
          message: error.message,
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
        <MessageStrip
          isOpen={message.isOpen}
          severity={message.severity}
          message={message.message}
          handleClose={() => dispatch({ type: "HIDE_MESSAGE" })}
        />
      </Container>
    </ThemeProvider>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Login;
