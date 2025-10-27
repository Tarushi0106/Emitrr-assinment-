import React from 'react';
import type { SquareState } from '../types/game';

interface SquareProps {
  square: SquareState;
  onClick: (index: number) => void;
  isInteractive: boolean;
  onHover?: () => void;
}

export const Square: React.FC<SquareProps> = ({ 
  square, 
  onClick, 
  isInteractive,
  onHover 
}) => {
  const getSquareClass = () => {
    let className = 'square';
    
    if (square.isFlashing) {
      className += ' flashing';
    }
    
    if (square.isSelected) {
      className += ' selected';
    }
    
    if (square.isCorrect !== null) {
      className += square.isCorrect ? ' correct' : ' incorrect';
    }
    
    if (isInteractive && !square.isSelected) {
      className += ' interactive';
    }
    
    return className;
  };

  const handleClick = () => {
    if (isInteractive) {
      onClick(square.index);
    }
  };

  const handleMouseEnter = () => {
    if (isInteractive && onHover) {
      onHover();
    }
  };

  return (
    <div
      className={getSquareClass()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      data-index={square.index}
      data-row={square.row}
      data-col={square.col}
    >
      <div className="square-inner">
        {square.isSelected && (
          <div className="selection-indicator">✓</div>
        )}
      </div>
    </div>
  );
};