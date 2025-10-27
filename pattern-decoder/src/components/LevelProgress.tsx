import React from 'react';
import type { GameLevel } from '../types/game';
import { getLevelDescription } from '../utils/gameRules';

interface LevelProgressProps {
  level: GameLevel;
  timeRemaining: number;
  isFlashing: boolean;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ 
  level, 
  timeRemaining, 
  isFlashing 
}) => {
  return (
    <div className="level-progress">
      <div className="level-info">
        <h2>Level {level}</h2>
        <p className="level-description">{getLevelDescription(level)}</p>
      </div>
      
      <div className="time-display">
        <div className={`time-circle ${timeRemaining <= 5 ? 'warning' : ''}`}>
          <span className="time-text">{timeRemaining}s</span>
        </div>
        <div className="time-label">
          {isFlashing ? 'Observe the pattern...' : 'Make your selection!'}
        </div>
      </div>
      
      <div className="progress-bar">
        {[1, 2, 3, 4, 5].map((lvl) => (
          <div
            key={lvl}
            className={`progress-step ${lvl === level ? 'active' : ''} ${lvl < level ? 'completed' : ''}`}
          >
            {lvl}
          </div>
        ))}
      </div>
    </div>
  );
};