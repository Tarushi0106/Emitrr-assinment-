
export interface Position {
  row: number;
  col: number;
}

export interface SquareState extends Position {
  index: number;
  isFlashing: boolean;
  isSelected: boolean;
  isCorrect: boolean | null;
}

export type GameLevel = 1 | 2 | 3 | 4 | 5;

export interface GameState {
  level: GameLevel;
  isFlashing: boolean;
  isGuessing: boolean;
  score: number;
  timeRemaining: number;
  showResults: boolean;
}

export type Theme = 'light' | 'dark' | 'matrix';

export interface Level {
  id: number;
  title: string;
  description: string;
  predicate: (index: number, row: number, col: number) => boolean;
  hint: string;
}