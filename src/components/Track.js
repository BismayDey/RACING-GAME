import React from "react";

const Track = ({ offset }) => {
  return (
    <div
      className="track"
      style={{
        background:
          "linear-gradient(90deg, grey 10%, white 5%, grey 10%, white 5%, grey 10%)", // 4 visible columns
        backgroundSize: "100% 200%", // Make the track longer vertically
        backgroundPositionY: offset, // Move the background vertically
        width: "500px", // Centered width
        height: "100vh",
        position: "absolute",
        zIndex: -1,
        left: "calc(50% - 250px)", // Center the track
      }}
    ></div>
  );
};

export default Track;
