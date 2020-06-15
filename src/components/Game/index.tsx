import React, { useCallback, useState } from 'react';
import CalculateWinner from '../../utils/calculateWinner';
import Board from '../Board';

const Game: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = CalculateWinner(history[stepNumber]);

  const handleClick = useCallback(
    (position: number) => {
      const timeInHistory = history.slice(0, stepNumber + 1);
      const current = timeInHistory[stepNumber];
      const squares = [...current];

      if (winner || squares[position]) return;

      squares[position] = xIsNext ? 'X' : 'O';
      setHistory([...timeInHistory, squares]);
      setStepNumber(timeInHistory.length);
      setXisNext(!xIsNext);
    },

    [xIsNext, setXisNext, history, winner, stepNumber]
  );

  const jumpTo = useCallback((step: number) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }, []);

  const renderMoves = useCallback(
    () =>
      history.map((_step, move) => {
        const destination = move ? `Go to move#${move}` : 'Go to start';
        return (
          <li key={move}>
            <button type="button" onClick={() => jumpTo(move)}>
              {destination}
            </button>
          </li>
        );
      }),
    [history, jumpTo]
  );

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
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
