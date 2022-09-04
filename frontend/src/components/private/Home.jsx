import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";

import Report from "./Report";

const Home = ({ user }) => {
  const navigate = useNavigate();
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
          Welcome {user.name}
        </Typography>
        <Box textAlign="center" marginTop={"10%"}>
          <Button variant="contained" onClick={() => handleOpen()}>
            Create Report
          </Button>
          <span> </span>
          {user.role === "admin" ? (
            <Button variant="contained" onClick={() => navigate("/reports")}>
              View Reports
            </Button>
          ) : null}
        </Box>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Report user={user} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Home;
