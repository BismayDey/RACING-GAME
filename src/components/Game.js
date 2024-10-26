import React, { useState, useEffect, useRef } from "react";
import Car from "./Car";
import Track from "./Track";
import Obstacle from "./Obstacle";
import Booster from "./Booster";

const Game = () => {
  const [columnIndex, setColumnIndex] = useState(1); // 0 to 3 for 4 columns
  const [speed, setSpeed] = useState(10); // Increased initial speed
  const [trackOffset, setTrackOffset] = useState(0); // Track vertical movement
  const [obstacles, setObstacles] = useState(generateObstacles());
  const [boosters, setBoosters] = useState(generateBoosters());
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false); // Track game over state
  const gameRef = useRef(null);
  const columnPositions = [100, 200, 300, 400]; // X positions of the 4 columns

  // Helper function to generate random obstacles
  function generateObstacles() {
    return Array.from({ length: 5 }, () => ({
      column: Math.floor(Math.random() * 4),
      y: Math.random() * -500,
    }));
  }

  // Helper function to generate random boosters
  function generateBoosters() {
    return Array.from({ length: 3 }, () => ({
      column: Math.floor(Math.random() * 4),
      y: Math.random() * -600,
    }));
  }

  // Reset game state
  const resetGame = () => {
    setColumnIndex(1);
    setSpeed(10);
    setTrackOffset(0);
    setObstacles(generateObstacles());
    setBoosters(generateBoosters());
    setScore(0);
    setIsGameOver(false);
  };

  // Handle player movement between columns (left/right)
  const handleKeyPress = (e) => {
    if (!isGameOver) {
      if (e.key === "ArrowLeft") {
        setColumnIndex((prev) => Math.max(prev - 1, 0)); // Move left, but stay within bounds
      } else if (e.key === "ArrowRight") {
        setColumnIndex((prev) => Math.min(prev + 1, 3)); // Move right, but stay within bounds
      }
    }
  };

  // Move track and obstacles down
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        setTrackOffset((prev) => (prev + speed) % window.innerHeight); // Continuously scroll track
        setScore((prev) => prev + 1); // Increment score

        // Move obstacles and boosters down the screen
        setObstacles((prevObstacles) =>
          prevObstacles.map((obs) => ({ ...obs, y: obs.y + speed }))
        );
        setBoosters((prevBoosters) =>
          prevBoosters.map((boost) => ({ ...boost, y: boost.y + speed }))
        );

        // Recycle obstacles and boosters when they go off-screen
        setObstacles((prevObstacles) =>
          prevObstacles.map((obs) =>
            obs.y > window.innerHeight
              ? { column: Math.floor(Math.random() * 4), y: -100 }
              : obs
          )
        );
        setBoosters((prevBoosters) =>
          prevBoosters.map((boost) =>
            boost.y > window.innerHeight
              ? { column: Math.floor(Math.random() * 4), y: -200 }
              : boost
          )
        );

        // Gradually increase speed
        if (speed < 20) setSpeed((prevSpeed) => prevSpeed + 0.05);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [speed, isGameOver]);

  // Speed boost logic
  useEffect(() => {
    const handleBoosterCollection = () => {
      setSpeed((prev) => Math.min(prev + 5, 25)); // Speed boost capped at 25
      setTimeout(() => setSpeed((prev) => Math.max(prev - 5, 10)), 3000); // Reset speed after 3 seconds
    };

    // Detect collision with boosters
    boosters.forEach((booster) => {
      if (
        columnIndex === booster.column &&
        500 < booster.y + 30 &&
        600 > booster.y
      ) {
        handleBoosterCollection();
      }
    });
  }, [columnIndex, boosters]);

  // Collision detection with obstacles
  useEffect(() => {
    const handleCollision = () => {
      setIsGameOver(true); // Set game over state
    };

    obstacles.forEach((obstacle) => {
      if (
        columnIndex === obstacle.column &&
        500 < obstacle.y + 50 &&
        600 > obstacle.y
      ) {
        handleCollision();
      }
    });
  }, [columnIndex, obstacles]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="game-container">
      <Track offset={trackOffset} />
      <Car positionX={columnPositions[columnIndex]} />
      {obstacles.map((obs, i) => (
        <Obstacle
          key={i}
          position={{ x: columnPositions[obs.column], y: obs.y }}
        />
      ))}
      {boosters.map((boost, i) => (
        <Booster
          key={i}
          position={{ x: columnPositions[boost.column], y: boost.y }}
        />
      ))}
      <div className="score">Score: {score}</div>
      {isGameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>
          <button onClick={resetGame} className="play-again-button">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
