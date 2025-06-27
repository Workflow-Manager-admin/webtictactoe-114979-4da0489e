import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * Retro Tic Tac Toe Game.
   * Features:
   * - 3x3 pixel-art style board.
   * - Stylish Nintendo-insipred status and buttons.
   * - Turn indicator, win/draw detection, reset.
   */
  const [theme] = useState('light'); // fixed light theme for retro look
  const emptyBoard = Array(9).fill('');
  const [squares, setSquares] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // eslint-disable-next-line
  }, [theme]);

  // PUBLIC_INTERFACE
  function calculateWinner(sqs) {
    /**
     * Calculates game winner or draw.
     */
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diagonals
    ];
    for (let [a,b,c] of lines) {
      if (sqs[a] && sqs[a] === sqs[b] && sqs[b] === sqs[c]) return sqs[a];
    }
    if (sqs.every(x => x)) return 'Draw';
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    /**
     * Handles user move on board.
     */
    if (squares[idx] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    const win = calculateWinner(nextSquares);
    setSquares(nextSquares);
    setXIsNext((prev) => !prev);
    setWinner(win);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /**
     * Resets the game board/state.
     */
    setSquares(emptyBoard);
    setXIsNext(true);
    setWinner(null);
  }

  const getStatusMsg = () => {
    if (winner === 'Draw') return <span className="nes-text is-warning">IT'S A DRAW!</span>;
    if (winner) return <span className="nes-text is-success">WINNER: {winner}</span>;
    return (
      <span>
        <span style={{ fontWeight: "bold", color: xIsNext ? "#d90429" : "#0072ef" }}>
          {xIsNext ? 'PLAYER 1 (X)' : 'PLAYER 2 (O)'}
        </span>
        <span className="blink"> TURN</span>
      </span>
    );
  };

  return (
    <div className="App retro-bg">
      <header className="retro-header">
        <h1 className="retro-title">TIC-TAC-TOE</h1>
        <div className="retro-status-panel">
          {getStatusMsg()}
        </div>
      </header>
      <main>
        <div className="retro-board">
          {squares.map((val, idx) =>
            <button
              className={`retro-square pixel-art ${val ? 'filled' : ''} ${winner ? 'disabled' : ''}`}
              onClick={() => handleClick(idx)}
              key={idx}
              disabled={Boolean(val) || Boolean(winner)}
              aria-label={`Square ${idx+1}: ${val || 'empty'}`}
            >
              {val &&
                <span className={`retro-piece retro-piece-${val}`}>
                  {val}
                </span>
              }
            </button>
          )}
        </div>
      </main>
      <footer>
        <div className="retro-control-panel">
          <button
            className="retro-btn pixel-art"
            onClick={handleReset}
            aria-label="Reset Game"
          >
            RESET
          </button>
        </div>
        <div className="retro-copyright">
          <span>
            <span className="copyright-symbol">©</span>
            <span className="nintendo-font"> NINTENDO-STYLE TIC-TAC-TOE </span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
