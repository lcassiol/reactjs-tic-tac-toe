import React from 'react';
import Square from '../Square';
import { Container } from './styles';

interface Props {
  squares: Array<string | null>;
  onClick: (value: number) => void;
}

const Board: React.FC<Props> = ({ squares, onClick }) => {
  return (
    <Container>
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </Container>
  );
};

export default Board;
