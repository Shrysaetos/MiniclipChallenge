import React, { useState } from "react";
import { Dialog, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const ZoomableImage = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Tooltip title="Click to zoom">
        <img
          style={{ width: "200px" }}
          className="image small"
          src={`data:image/jpeg;base64,${image}`}
          onClick={handleShowDialog}
          alt="No Image"
          tooltip
        />
      </Tooltip>

      {isOpen && (
        <Dialog onClose={handleShowDialog} open={isOpen}>
          <img
            className="image"
            src={`data:image/jpeg;base64,${image}`}
            onClick={handleShowDialog}
            alt="No Image"
          />
        </Dialog>
      )}
    </div>
  );
};

ZoomableImage.propTypes = {
  image: PropTypes.string.required,
};

export default ZoomableImage;
