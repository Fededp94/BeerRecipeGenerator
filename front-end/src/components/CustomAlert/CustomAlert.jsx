import React from "react";
import "./CustomAlert.css";

const CustomAlert = ({ show, type, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <h2>{type === "confirm" ? "Conferma" : "Attenzione"}</h2>
        <p>{message}</p>

        <div className="custom-alert-buttons">
          {type === "confirm" ? (
            <>
              <button onClick={onConfirm}>Sì</button>
              <button onClick={onCancel}>No</button>
            </>
          ) : (
            <button onClick={onConfirm}>Chiudi</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
