import { useState, useEffect } from 'react';
import type { Square } from "./types";
import './App.css';

function App() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [startingPlayerX, setStartingPlayerX] = useState(true);
  const [isTurnX, setIsTurnX] = useState(startingPlayerX);
  const [winnerX, setWinnerX] = useState(0);
  const [winnerO, setWinnerO] = useState(0);


  const handleClickThrowTurn = (index: number) => {
    if (board[index] && resultWinner && tie) return;

    const newBoard = [...board];
    newBoard[index] = isTurnX ? "X" : "O";

    setBoard(newBoard);
    setIsTurnX(prev => !prev);
  }

  const verifiedWinner = (board: Square[]) => {
    const linesWinner = [
      //Lineas horizontales
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // Lineas verticales
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Lineas horizontales
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of linesWinner) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          winner: board[a],
          line: [a, b, c]
        }
      }
    }
    return null;
  }

  const resultWinner = verifiedWinner(board);
  const tie = !resultWinner?.winner && board.every((square) => square !== null);

  useEffect(() => {
    if (resultWinner?.winner === 'X') {
      setWinnerX(prev => prev + 1);
    }
    if (resultWinner?.winner === 'O') {
      setWinnerO(prev => prev + 1);
    }
  }, [resultWinner?.winner])

  const continueGaming = () => {
    restartBoard();

    setStartingPlayerX(prev => {
      const next = !prev;
      setIsTurnX(next);
      return next;
    })
  }

  const restartGame = () => {
    restartBoard();

    setStartingPlayerX(true);
    setIsTurnX(true);
    setWinnerX(0);
    setWinnerO(0);
  }

  const restartBoard = () => {
    setBoard(Array(9).fill(null));
  }




  return (
    <>
      <div className='tic-tac-toe'>
        <div className='content-game'>
          <h1 className='title-game'>Tic <span>Tac</span> Toe</h1>
          <div className='players-info-content'>
            <div className={`${tie ? "tie": ""} ${isTurnX ? "turn" : ""} ${resultWinner?.winner === 'X' ? "winner" : ""}`}>
              <span className='turn-player-symbol'>X</span>
              <p className='player-turn-name'>Jugador 1</p>
              <span>{winnerX}</span>
            </div>
            <div>
              <span className='versus-text'>VS</span>
            </div>
            <div className={`${tie ? "tie" : ""} ${!isTurnX ? "turn" : ""} ${resultWinner?.winner === 'O' ? "winner" : ""}`}>
              <span className='turn-player-symbol'>O</span>
              <p className='player-turn-name'>Jugador 2</p>
              <span>{winnerO}</span>
            </div>
          </div>
          <div className={`board ${tie ? "board-tie" : ""} ${resultWinner ? "board-winner" : ""}`}>
            {board.map((value, index) => (
              <div key={index} onClick={() => handleClickThrowTurn(index)} className={`square ${board[index] ? "filled" : ""} ${resultWinner?.line.includes(index) ? "line-winner" : ""}`} data-preview={isTurnX ? "X" : "O"}>
                <span className='player-symbol'>{value}</span>
              </div> 
            ))}
          </div>
          <div className='turn-info-content'>
            <p className='text-turn'>
              {tie 
                ? "¡Empate!"
                : resultWinner ? `¡Ganó jugador ${resultWinner.winner === 'X' ? "1" : "2"}!`
                : `¡Turno de jugador ${isTurnX ? "1" : "2"}!`
              }
            </p>
          </div>
          <div className='btns-content'>
            {(resultWinner || tie) && (
              <button type='button' onClick={continueGaming} className='btn btn-primary'>Continuar partida</button>
            )}
            <button type='button' onClick={restartGame} className='btn btn-secondary'>Reiniciar partida</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
