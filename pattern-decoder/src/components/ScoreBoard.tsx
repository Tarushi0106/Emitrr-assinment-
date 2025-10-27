import React from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
  showResults: boolean;
  onCheckSolution: () => void;
  onNextLevel: () => void;
  onRestart: () => void;
  isGuessing: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  level,
  showResults,
  onCheckSolution,
  onNextLevel,
  onRestart,
  isGuessing
}) => {
  // audio hook available if we want sounds; not used right now
  // const { playClick } = useAudio();

  const handleCheckSolution = () => {
    onCheckSolution();
  };

  const handleNextLevel = () => {
    onNextLevel();
  };

  const handleRestart = () => {
    onRestart();
  };

  return (
    <div className="score-board">
      <div className="score-display">
        <div className="score-value">{score}</div>
        <div className="score-label">Points</div>
      </div>
      
      <div className="controls">
        {isGuessing && !showResults && (
          <button className="btn btn-primary" onClick={handleCheckSolution}>
            Check Solution
          </button>
        )}
        
        {showResults && level < 5 && (
          <button className="btn btn-success" onClick={handleNextLevel}>
            Next Level
          </button>
        )}
        
        {showResults && level === 5 && (
          <button className="btn btn-complete" onClick={handleRestart}>
            Play Again
          </button>
        )}
        
        <button className="btn btn-secondary" onClick={handleRestart}>
          Restart
        </button>
      </div>
    </div>
  );
};