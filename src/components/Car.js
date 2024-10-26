import React from "react";

const Car = ({ positionX }) => {
  return (
    <div
      className="car"
      style={{
        position: "absolute",
        left: `${positionX}px`,
        top: "500px", // Fixed vertical position
        width: "50px",
        height: "100px",
        backgroundColor: "red",
        borderRadius: "10px",
        border: "2px solid black",
        background: "linear-gradient(to bottom, #ff4d4d 30%, #cc0000)", // Car design
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "10px",
          backgroundColor: "black",
          position: "absolute",
          top: "-10px",
          left: "10px",
          borderRadius: "5px",
        }}
      ></div>
      {/* Top spoiler of the car */}
    </div>
  );
};

export default Car;
