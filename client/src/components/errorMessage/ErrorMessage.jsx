import React from "react";
import "./errorMessage.scss";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal">
      <div className="modalContent">
        <span className="closeButton" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
