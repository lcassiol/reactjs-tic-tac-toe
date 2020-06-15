import React from 'react';
import { Button } from './styles';

interface Props {
  onClick: () => void;
  value: string | null;
}

const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      {value}
    </Button>
  );
};

export default Square;
