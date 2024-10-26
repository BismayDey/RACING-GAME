import React from "react";

const Obstacle = ({ position }) => {
  return (
    <div
      className="obstacle"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "50px",
        height: "50px",
        backgroundColor: "orange",
        borderRadius: "5px",
        border: "3px solid black",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        background: "radial-gradient(circle at center, #ffcc00, #ff9900)", // Roadblock-like design
      }}
    ></div>
  );
};

export default Obstacle;
