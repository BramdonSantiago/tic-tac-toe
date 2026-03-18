import { useState, useEffect } from 'react';
import type { Square } from "../../types";
import './Game.css';
import { useLocation } from "react-router-dom";

function GamePage() {
    const location = useLocation();
    const vsAI = location.state?.vsAI ?? false;
    const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
    const [startingPlayerX, setStartingPlayerX] = useState(true);
    const [isTurnX, setIsTurnX] = useState(startingPlayerX);
    const [winnerX, setWinnerX] = useState(0);
    const [winnerO, setWinnerO] = useState(0);

    const handleClickThrowTurn = (index: number) => {
        if (board[index] || resultWinner || tie) return;
        if (vsAI && !isTurnX) return;

        const newBoard = [...board];
        newBoard[index] = isTurnX ? "X" : "O";

        setBoard(newBoard);
        setIsTurnX(prev => !prev);
    };

    const linesWinner = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // =========================
    // 🧠 IA
    // =========================
    const getBestMove = (board: Square[]) => {
        // 1. Intentar ganar
        for (let [a, b, c] of linesWinner) {
            const line = [board[a], board[b], board[c]];
            if (line.filter(v => v === 'O').length === 2 && line.includes(null)) {
                return [a, b, c][line.indexOf(null)];
            }
        }

        // 2. Bloquear jugador
        for (let [a, b, c] of linesWinner) {
            const line = [board[a], board[b], board[c]];
            if (line.filter(v => v === 'X').length === 2 && line.includes(null)) {
                return [a, b, c][line.indexOf(null)];
            }
        }

        // 3. Centro
        if (!board[4]) return 4;

        // 4. Esquinas
        const corners = [0, 2, 6, 8].filter(i => !board[i]);
        if (corners.length) {
            return corners[Math.floor(Math.random() * corners.length)];
        }

        // 5. Espacio libre
        const empty = board
            .map((v, i) => (v === null ? i : null))
            .filter(v => v !== null) as number[];

        return empty[Math.floor(Math.random() * empty.length)];
    };

    // =========================
    // 🤖 TURNO AUTOMÁTICO IA
    // =========================
    useEffect(() => {
        if (!vsAI) return;
        if (isTurnX) return;
        if (resultWinner || tie) return;

        const delay = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;

        const timeout = setTimeout(() => {
            const move = getBestMove(board);

            if (move !== undefined) {
                const newBoard = [...board];
                newBoard[move] = "O";

                setBoard(newBoard);
                setIsTurnX(true);
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [board, isTurnX, vsAI]);

    // =========================
    // 🏆 VERIFICAR GANADOR
    // =========================
    const verifiedWinner = (board: Square[]) => {
        for (let [a, b, c] of linesWinner) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], line: [a, b, c] };
            }
        }
        return null;
    };

    const resultWinner = verifiedWinner(board);
    const tie = !resultWinner?.winner && board.every((sq) => sq !== null);

    // =========================
    // 📊 SCORE
    // =========================
    useEffect(() => {
        if (resultWinner?.winner === "X") {
            setWinnerX(prev => prev + 1);
        }
        if (resultWinner?.winner === "O") {
            setWinnerO(prev => prev + 1);
        }
    }, [resultWinner?.winner]);

    // =========================
    // 🔁 CONTINUAR
    // =========================
    const continueGaming = () => {
        restartBoard();
        setStartingPlayerX(prev => {
            const next = !prev;
            setIsTurnX(next);
            return next;
        });
    };

    const restartGame = () => {
        restartBoard();
        setStartingPlayerX(true);
        setIsTurnX(true);
        setWinnerX(0);
        setWinnerO(0);
    };

    const restartBoard = () => {
        setBoard(Array(9).fill(null));

    };




    return (
        <>
            <div className='tic-tac-toe'>
                <div className='content-game'>
                    <h1 className='title-game'>Tic <span>Tac</span> Toe</h1>
                    <div className={`players-info-content ${tie ? "players-info-content-tie" : ""} ${resultWinner ? "players-info-content-winner" : ""}`}>
                        <div className={`player-info-content ${tie ? "tie" : ""} ${isTurnX ? "turn" : ""} ${resultWinner?.winner === 'X' ? "winner" : ""}`}>
                            <span className='turn-player-symbol'>X</span>
                            <p className='player-turn-name'>{vsAI ? "Tú" : "Jugador 1"}</p>
                            <span>{winnerX}</span>
                        </div>
                        <div>
                            <span className='versus-text'>VS</span>
                        </div>
                        <div className={`player-info-content ${tie ? "tie" : ""} ${!isTurnX ? "turn" : ""} ${resultWinner?.winner === 'O' ? "winner" : ""}`}>
                            <span className='turn-player-symbol'>O</span>
                            <p className='player-turn-name'>{vsAI ? "IA" : "Jugador 2"}</p>
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
                        {vsAI && (
                            <p className='text-turn'>
                                {tie
                                    ? "¡Empate!"
                                    : resultWinner ? `¡${resultWinner.winner === 'X' ? "Ganaste" : "Ganó IA"}!`
                                        : `¡${isTurnX ? "Tú turno" : "Turno IA"}!`
                                }
                            </p>
                        )}
                        {!vsAI && (
                            <p className='text-turn'>
                                {tie
                                    ? "¡Empate!"
                                    : resultWinner ? `¡Ganó ${resultWinner.winner === 'X' ? "Jugador 1" : "Jugador 2"}!`
                                        : `¡Turno ${isTurnX ? "Jugador 1" : "Jugador 2"}!`
                                }
                            </p>
                        )}
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

export default GamePage
