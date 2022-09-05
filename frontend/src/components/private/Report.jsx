import React, { useReducer, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

import MessageStrip from "../utils/MessageStrip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const Report = ({ user }) => {
  const [{ message }, dispatch] = useReducer(reducer, {
    message: { isOpen: false, severity: "info", message: "" },
  });

  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);
    formData.append("comment", comment);
    formData.append("userId", user.id);
    formData.append("callback", import.meta.env.VITE_CALLBACK);

    const token = localStorage.getItem("token");
    await axios
      .post("http://localhost:3000/api/report", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        dispatch({
          type: "SHOW_MESSAGE",
          severity: "success",
          message: result.data.message,
        });
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: "SHOW_MESSAGE",
          severity: "error",
          message: e.message,
        });
      });
  };

  return (
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        <Box
          component="form"
          onSubmit={handleSubmitForm}
          noValidate
          sx={{ mt: 1 }}
        >
          <label>Select Image:</label>
          <TextField
            margin="normal"
            required
            fullWidth
            name="image"
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label>Comments:</label>
          <TextField
            margin="normal"
            fullWidth
            id="comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Upload
          </Button>
        </Box>
      </Typography>
      <MessageStrip
        isOpen={message.isOpen}
        severity={message.severity}
        message={message.message}
        handleClose={() => dispatch({ type: "HIDE_MESSAGE" })}
      />
    </Box>
  );
};

Report.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Report;
