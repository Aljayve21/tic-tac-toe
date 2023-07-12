import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

const calculateWinner = (squares: Array<string | null>): string | null => {
  // Define all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if any winning combination is present
  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null; // No winner
};

const App: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(
    Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = calculateWinner(squares);

  const handleClick = (index: number) => {
    if (winner || squares[index]) {
      // If there's a winner or the square is already filled, return early
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(updatedSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <button className="restart-btn" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default App;