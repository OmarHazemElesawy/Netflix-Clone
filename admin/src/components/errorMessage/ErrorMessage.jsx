import React from "react";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className={classes.closeButton} onClick={onClose}>
            &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
