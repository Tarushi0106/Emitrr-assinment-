import { useState, useEffect, useCallback } from 'react';
import type { SquareState, GameState, GameLevel } from '../types/game';
import { getFlashingSquares } from '../utils/gameRules';
import { useAudio } from './useAudio';

const FLASH_DURATION = 10000; // 10 seconds
const FLASH_INTERVAL = 800;

export const useGameLogic = () => {
  const [squares, setSquares] = useState<SquareState[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    isFlashing: true,
    isGuessing: false,
    score: 0,
    timeRemaining: FLASH_DURATION / 1000,
    showResults: false,
    totalLevels: 5  // Set total number of levels
  });

  const { playClick, playFlash, playSuccess, playError, playLevelUp } = useAudio();

  // Initialize squares
  useEffect(() => {
    const initialSquares: SquareState[] = [];
    for (let i = 0; i < 25; i++) {
      initialSquares.push({
        index: i,
        row: Math.floor(i / 5),
        col: i % 5,
        isFlashing: false,
        isSelected: false,
        isCorrect: null
      });
    }
    setSquares(initialSquares);
  }, []);

  // Flash animation logic with sound
  useEffect(() => {
    if (!gameState.isFlashing) return;

    const flashingIndices = getFlashingSquares(gameState.level);
    let flashState = false;
    let flashCount = 0;

    const flashInterval = setInterval(() => {
      setSquares(prev => prev.map(square => ({
        ...square,
        isFlashing: flashingIndices.includes(square.index) && flashState
      })));

      // Play flash sound when squares light up
      if (flashState && flashCount > 0) {
        playFlash();
      }
      
      flashState = !flashState;
      flashCount++;
    }, FLASH_INTERVAL);

    const stopTimer = setTimeout(() => {
      clearInterval(flashInterval);
      setGameState(prev => ({ ...prev, isFlashing: false, isGuessing: true }));
      setSquares(prev => prev.map(square => ({ ...square, isFlashing: false })));
    }, FLASH_DURATION);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1)
      }));
    }, 1000);

    return () => {
      clearInterval(flashInterval);
      clearTimeout(stopTimer);
      clearInterval(countdownInterval);
    };
  }, [gameState.isFlashing, gameState.level, playFlash]);

  const toggleSquare = useCallback((index: number) => {
    if (!gameState.isGuessing || gameState.showResults) return;

    playClick(); // Play click sound when square is toggled
    
    setSquares(prev => prev.map(square =>
      square.index === index
        ? { ...square, isSelected: !square.isSelected }
        : square
    ));
  }, [gameState.isGuessing, gameState.showResults, playClick]);

  const checkSolution = useCallback(() => {
    playClick(); // Play click sound for button press
    
    const flashingIndices = getFlashingSquares(gameState.level);
    const selectedIndices = squares.filter(s => s.isSelected).map(s => s.index);

    const correctSelections = selectedIndices.filter(idx => flashingIndices.includes(idx));
    const incorrectSelections = selectedIndices.filter(idx => !flashingIndices.includes(idx));
    const missedSelections = flashingIndices.filter(idx => !selectedIndices.includes(idx));

    // Calculate score
    const levelScore = Math.max(0, 
      correctSelections.length * 10 - 
      incorrectSelections.length * 5 - 
      missedSelections.length * 2
    );

    // Play success or error sound based on performance
    if (levelScore > 20) {
      playSuccess();
    } else if (levelScore > 0) {
      playClick(); // Neutral sound for medium performance
    } else {
      playError();
    }

    // Update squares with correctness
    setSquares(prev => prev.map(square => ({
      ...square,
      isCorrect: square.isSelected 
        ? flashingIndices.includes(square.index)
        : null
    })));

    setGameState(prev => ({
      ...prev,
      showResults: true,
      score: prev.score + levelScore
    }));
  }, [gameState.level, squares, playClick, playSuccess, playError]);

  const nextLevel = useCallback(() => {
    playLevelUp(); // Play level up sound
    
    if (gameState.level >= 5) {
      // Game completed
      setGameState(prev => ({
        ...prev,
        level: 1,
        isFlashing: true,
        isGuessing: false,
        showResults: false,
        timeRemaining: FLASH_DURATION / 1000
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        level: (prev.level + 1) as GameLevel,
        isFlashing: true,
        isGuessing: false,
        showResults: false,
        timeRemaining: FLASH_DURATION / 1000
      }));
    }

    // Reset squares
    setSquares(prev => prev.map(square => ({
      ...square,
      isSelected: false,
      isCorrect: null,
      isFlashing: false
    })));
  }, [gameState.level, playLevelUp]);

  const restartGame = useCallback(() => {
    playClick(); // Play click sound for restart
    
    setGameState({
      level: 1,
      isFlashing: true,
      isGuessing: false,
      score: 0,
      timeRemaining: FLASH_DURATION / 1000,
      showResults: false,
      totalLevels: 5
    });
    
    setSquares(prev => prev.map(square => ({
      ...square,
      isSelected: false,
      isCorrect: null,
      isFlashing: false
    })));
  }, [playClick]);

  return {
    squares,
    gameState,
    toggleSquare,
    checkSolution,
    nextLevel,
    restartGame
  };
};