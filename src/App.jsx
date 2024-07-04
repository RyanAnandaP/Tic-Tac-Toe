import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import GameOver from "./components/GameOver";

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveWinner = (gameBoard, playerName) => {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol].toUpperCase();
    }
  }

  return winner;
};

const deriveGamboard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const [playerName, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGamboard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handleRematch = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayerNames((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "X"}
          />
          <Player
            name="Player 2"
            symbol="O"
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winnerName={winner} restart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
