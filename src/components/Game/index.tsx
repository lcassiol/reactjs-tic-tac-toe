import React, { useCallback, useState, useEffect } from 'react';
import CalculateWinner from '../../utils/calculateWinner';
import Board from '../Board';
import {
  Container,
  Title,
  Form,
  Actions,
  Ranking,
  Players,
  Position,
  PlayerName,
} from './styles';

interface Ranking {
  player: string;
  points: number;
}

const Game: React.FC = () => {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [showBoard, setShowBoard] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [ranking, setRanking] = useState<Ranking[]>([]);

  useEffect(() => {
    const rankingStorage = localStorage.getItem('@tictactoe:ranking');
    if (rankingStorage) {
      const rankingArray: Ranking[] = JSON.parse(rankingStorage);

      setRanking(rankingArray);
    }
  }, []);

  useEffect(() => {
    console.log('Calculate winner');
    console.log(history);
    const result = CalculateWinner(history[stepNumber]);

    if (result) {
      const winnerName = result === 'X' ? playerOne : playerTwo;
      const loserName = result === 'X' ? playerTwo : playerOne;

      const newRanking = ranking;

      const winnerIndex = ranking.findIndex(
        (player) => player.player === winnerName
      );

      const loserIndex = ranking.findIndex(
        (player) => player.player === loserName
      );

      if (winnerIndex >= 0) {
        newRanking[winnerIndex] = {
          ...newRanking[winnerIndex],
          points: newRanking[winnerIndex].points + 1,
        };
      } else {
        newRanking.push({
          player: winnerName,
          points: 1,
        });
      }

      if (loserIndex < 0) {
        newRanking.push({
          player: loserName,
          points: 0,
        });
      }

      const sortedRanking = newRanking.sort((item, nextItem) =>
        Number(item.points) < Number(nextItem.points) ? 1 : -1
      );

      localStorage.setItem('@tictactoe:ranking', JSON.stringify(sortedRanking));
      setRanking(sortedRanking);
      setWinner(winnerName);
    }
  }, [stepNumber, playerOne, playerTwo, ranking, history]);

  const handleStartGame = useCallback(() => {
    if (playerOne && playerTwo) {
      setShowBoard(true);
    } else {
      alert('Players need a name');
    }
  }, [playerOne, playerTwo, setShowBoard]);

  const handleChangePlayers = useCallback(() => {
    setStepNumber(0);
    setWinner(null);
    setShowBoard(false);
    setHistory([Array(9).fill(null)]);
  }, []);

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
      setWinner(null);
    }
  }, []);

  const renderMoves = useCallback(() => {
    if (winner) {
      return (
        <span>
          <button type="button" onClick={() => jumpTo(0)}>
            Reset
          </button>
        </span>
      );
    }

    return history.map((_step, move) => {
      const destination = move ? `Go to move#${move}` : 'Reset';
      return (
        <span key={move}>
          <button type="button" onClick={() => jumpTo(move)}>
            {destination}
          </button>
        </span>
      );
    });
  }, [history, jumpTo, winner]);

  return (
    <Container>
      <Title>Tic Tac Toe - Typescript ReactJS</Title>
      {!showBoard ? (
        <Form>
          <input
            id="player1"
            placeholder="Player 1"
            type="text"
            onChange={(e) => setPlayerOne(e.target.value)}
          />

          <input
            id="player2"
            placeholder="Player 2"
            type="text"
            onChange={(e) => setPlayerTwo(e.target.value)}
          />

          <button onClick={handleStartGame} type="button">
            Start
          </button>
        </Form>
      ) : (
        <div>
          <span style={{ marginLeft: 60 }}>
            <button type="button" onClick={handleChangePlayers}>
              Change Players
            </button>
          </span>
          <Board squares={history[stepNumber]} onClick={handleClick} />
          <Actions>
            <p>
              {winner
                ? `Winner: ${winner}!!`
                : `Next Player → ${xIsNext ? playerOne : playerTwo}`}
            </p>

            {renderMoves()}
          </Actions>
        </div>
      )}

      <Ranking>
        <p>Ranking</p>
        <Players>
          {ranking.map((rank, index) => (
            <div key={index}>
              <Position>{index + 1}</Position>
              <PlayerName>{rank.player}</PlayerName>
            </div>
          ))}
        </Players>
      </Ranking>
    </Container>
  );
};

export default Game;
