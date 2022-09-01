import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

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

const Report = ({ isLoggedIn, user }) => {
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("comment", comment);
    formData.append("userId", localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/report", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
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
    </Box>
  );
};

export default Report;
