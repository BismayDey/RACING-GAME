import React from "react";

const CarSelection = ({ onSelectCar }) => {
  const cars = [
    { name: "Car A", speed: 10 },
    { name: "Car B", speed: 12 },
    { name: "Car C", speed: 15 },
  ];

  return (
    <div className="car-selection">
      <h2>Select Your Car</h2>
      {cars.map((car) => (
        <button
          key={car.name}
          onClick={() => onSelectCar(car)}
          className="car-button"
        >
          {car.name}
        </button>
      ))}
    </div>
  );
};

export default CarSelection;
