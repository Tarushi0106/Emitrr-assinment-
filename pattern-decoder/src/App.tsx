import React, { useState } from 'react';
import { Grid } from './components/Grid';
import { LevelProgress } from './components/LevelProgress';
import { ScoreBoard } from './components/ScoreBoard';
import { ThemeToggle } from './components/ThemeToggle';
import { useGameLogic } from './hooks/useGameLogic';
import { useTheme } from './hooks/useTheme';
import './styles/globals.css';

const App: React.FC = () => {
  const {
    squares,
    gameState,
    toggleSquare,
    checkSolution,
    nextLevel,
    restartGame
  } = useGameLogic();

  const { theme, toggleTheme } = useTheme();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleSoundToggle = () => {
    setIsSoundEnabled(!isSoundEnabled);
  };

  return (
    <div className="app">
      <ThemeToggle 
        theme={theme} 
        onToggle={toggleTheme}
        onSoundToggle={handleSoundToggle}
        isSoundEnabled={isSoundEnabled}
      />
      
      <div className="header">
        <h1>Pattern Decoder</h1>
        <p>Observe the flashing pattern and decode the hidden rule!</p>
        {!isSoundEnabled && <p className="sound-warning">🔇 Sound disabled</p>}
      </div>

      <div className="game-container">
        <LevelProgress
          level={gameState.level}
          timeRemaining={gameState.timeRemaining}
          isFlashing={gameState.isFlashing}
        />

        <Grid
          squares={squares}
          onSquareClick={toggleSquare}
          isInteractive={gameState.isGuessing && !gameState.showResults}
        />

        <ScoreBoard
          score={gameState.score}
          level={gameState.level}
          showResults={gameState.showResults}
          onCheckSolution={checkSolution}
          onNextLevel={nextLevel}
          onRestart={restartGame}
          isGuessing={gameState.isGuessing}
        />
      </div>
    </div>
  );
};

export default App;