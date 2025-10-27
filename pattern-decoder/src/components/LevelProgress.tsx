import React from 'react';
import type { GameLevel } from '../types/game';
import { getLevelDescription, getLevelDifficulty } from '../utils/gameRules';

interface LevelProgressProps {
  level: GameLevel;
  timeRemaining: number;
  isFlashing: boolean;
  totalLevels: number;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({ 
  level, 
  timeRemaining, 
  isFlashing,
  totalLevels 
}) => {
  const progressPercentage = (level / totalLevels) * 100;

  return (
    <div className="level-progress">
      <div className="level-info">
        <h2>Level {level} of {totalLevels}</h2>
        <p className="level-difficulty">
          Difficulty: <span className="difficulty-badge">{getLevelDifficulty(level)}</span>
        </p>
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
      
      <div className="progress-container">
        <div className="progress-bar">
          {Array.from({ length: totalLevels }, (_, i) => i + 1).map((lvl) => (
            <div
              key={lvl}
              className={`progress-step ${lvl === level ? 'active' : ''} ${lvl < level ? 'completed' : ''}`}
            >
              {lvl}
            </div>
          ))}
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};