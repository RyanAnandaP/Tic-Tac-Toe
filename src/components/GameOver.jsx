import React from "react";

const GameOver = ({ winnerName, restart }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winnerName && <p>{winnerName} Won!</p>}
      {!winnerName && <p>It's a draw!</p>}
      <p>
        {winnerName ? (
          <button onClick={restart}>Rematch!</button>
        ) : (
          <button onClick={restart}>Restart!</button>
        )}
      </p>
    </div>
  );
};

export default GameOver;
