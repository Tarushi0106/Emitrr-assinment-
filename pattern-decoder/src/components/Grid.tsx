import React from 'react';
import type { SquareState } from '../types/game';
import { Square } from './Square';
import { useAudio } from '../hooks/useAudio';

interface GridProps {
  squares: SquareState[];
  onSquareClick: (index: number) => void;
  isInteractive: boolean;
}

export const Grid: React.FC<GridProps> = ({ 
  squares, 
  onSquareClick, 
  isInteractive 
}) => {
  const { playClick } = useAudio();

  const handleHover = () => {
    if (isInteractive) {
      playClick();
    }
  };

  return (
    <div className="grid-container">
      <div className="grid">
        {squares.map((square) => (
          <Square
            key={square.index}
            square={square}
            onClick={onSquareClick}
            onHover={handleHover}
            isInteractive={isInteractive}
          />
        ))}
      </div>
    </div>
  );
};