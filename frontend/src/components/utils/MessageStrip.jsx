import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { PropTypes } from "prop-types";

const MessageStrip = ({ isOpen, handleClose, severity, message }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

MessageStrip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageStrip;
