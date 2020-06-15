import React, { useCallback, useState } from 'react';
import CalculateWinner from '../../utils/calculateWinner';
import Board from '../Board';

const Game: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = CalculateWinner(board);

  const handleClick = useCallback(
    (position: number) => {
      const boardCopy = [...board];
      if (winner || boardCopy[position]) return;

      boardCopy[position] = xIsNext ? 'X' : 'O';
      setBoard(boardCopy);
      setXIsNext(!xIsNext);
    },
    [xIsNext, setXIsNext, board, winner]
  );

  const jumpTo = useCallback(() => {
    console.log('jump to');
  }, []);

  const renderMoves = useCallback(
    () => (
      <button type="button" onClick={() => setBoard(Array(9).fill(null))}>
        Start Game
      </button>
    ),
    []
  );

  return (
    <>
      <Board squares={board} onClick={handleClick} />
      <div>
        <p>
          {winner ? `Winner: ${winner}` : `Next Player:${xIsNext ? 'X' : 'O'}`}
        </p>
        {renderMoves()}
      </div>
    </>
  );
};

export default Game;
