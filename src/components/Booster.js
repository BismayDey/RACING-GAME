import React from "react";

const Booster = ({ position }) => {
  return (
    <div
      className="booster"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "30px",
        height: "30px",
        backgroundColor: "#4CAF50",
        borderRadius: "50%",
        boxShadow: "0 0 10px 5px rgba(0,255,0,0.7)", // Glowing effect for power-up
        border: "2px solid white",
      }}
    ></div>
  );
};

export default Booster;
