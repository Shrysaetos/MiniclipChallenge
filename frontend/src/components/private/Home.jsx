import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Report from "./Report";

const Home = ({ isLoggedIn, user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          paddingTop: "10%",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Welcome {user}
        </Typography>
        <Box textAlign="center" marginTop={"10%"}>
          <Button variant="contained" onClick={() => handleOpen()}>
            Create Report
          </Button>
        </Box>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Report />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;
