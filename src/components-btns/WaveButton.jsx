import React from "react";
import "./WaveButton.css";

const WaveButton = () => {
  return (
    <div className="wave-button">
      <button className="btn">Request Demo</button>
      <span className="wave wave1"></span>
      <span className="wave wave2"></span>
    </div>
  );
};

export default WaveButton;
