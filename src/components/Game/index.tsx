import React, { useCallback, useState } from 'react';
import CalculateWinner from '../../utils/calculateWinner';
import Board from '../Board';
import {
  Container,
  Title,
  Actions,
  Ranking,
  Players,
  Position,
  PlayerName,
} from './styles';

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

    if (step === 0) {
      setHistory([Array(9).fill(null)]);
    }
  }, []);

  const renderMoves = useCallback(
    () =>
      history.map((_step, move) => {
        const destination = move ? `Go to move#${move}` : 'Reset';
        return (
          <span key={move}>
            <button type="button" onClick={() => jumpTo(move)}>
              {destination}
            </button>
          </span>
        );
      }),
    [history, jumpTo]
  );

  return (
    <Container>
      <Title>Tic Tac Toe - Typescript ReactJS</Title>
      <div>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <Actions>
          <p>
            {winner
              ? `Winner: ${winner}`
              : `Next Player → ${xIsNext ? 'X' : 'O'}`}
          </p>
          {renderMoves()}
        </Actions>
      </div>
      <Ranking>
        <p>Ranking</p>
        <Players>
          <div>
            <Position>1</Position>
            <PlayerName>Cassio</PlayerName>
          </div>
          <div>
            <Position>2</Position>
            <PlayerName>Tiago</PlayerName>
          </div>
          <div>
            <Position>3</Position>
            <PlayerName>Daniel</PlayerName>
          </div>
        </Players>
      </Ranking>
    </Container>
  );
};

export default Game;
