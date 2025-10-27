//import type { Position } from '../types/game';

export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export const isFibonacci = (num: number): boolean => {
  if (num === 0 || num === 1) return true;
  let a = 0, b = 1;
  while (b < num) {
    const temp = b;
    b = a + b;
    a = temp;
  }
  return b === num;
};

export const getFlashingSquares = (level: number): number[] => {
  const squares: number[] = [];
  
  for (let i = 0; i < 25; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    
    let shouldFlash = false;
    
    switch (level) {
      case 1: // Even indices
        shouldFlash = i % 2 === 0;
        break;
      case 2: // Diagonals
        shouldFlash = row === col || row + col === 4;
        break;
      case 3: // Prime numbers
        shouldFlash = isPrime(i);
        break;
      case 4: // Center cluster
        const centerNeighbors = [
          [2, 2], // center
          [1, 2], [2, 1], [2, 3], [3, 2] // neighbors
        ];
        shouldFlash = centerNeighbors.some(([r, c]) => r === row && c === col);
        break;
      case 5: // (row + col) % 3 === 0
        shouldFlash = (row + col) % 3 === 0;
        break;
      case 6: // Fibonacci sequence
        shouldFlash = isFibonacci(i);
        break;
      case 7: // Checkerboard pattern
        shouldFlash = (row + col) % 2 === 0;
        break;
      case 8: // Border squares
        shouldFlash = row === 0 || row === 4 || col === 0 || col === 4;
        break;
      case 9: // Spiral pattern (corners + center)
        const corners = [[0,0], [0,4], [4,0], [4,4], [2,2]];
        shouldFlash = corners.some(([r, c]) => r === row && c === col);
        break;
      case 10: // Complex: row % 2 === 0 AND col % 2 === 1
        shouldFlash = (row % 2 === 0) && (col % 2 === 1);
        break;
      default:
        shouldFlash = false;
    }
    
    if (shouldFlash) {
      squares.push(i);
    }
  }
  
  return squares;
};

export const getLevelDescription = (level: number): string => {
  const descriptions = [
    "Pattern: Even indices sequence",
    "Pattern: Diagonal alignment", 
    "Pattern: Prime number theory",
    "Pattern: Spatial clustering",
    "Pattern: Modular arithmetic",
    "Pattern: Fibonacci sequence",
    "Pattern: Checkerboard layout",
    "Pattern: Border framework",
    "Pattern: Strategic points",
    "Pattern: Complex intersection"
  ];
  return descriptions[level - 1] || "Master pattern recognition";
};

export const getLevelDifficulty = (level: number): string => {
  if (level <= 3) return "Beginner";
  if (level <= 6) return "Intermediate";
  if (level <= 8) return "Advanced";
  return "Expert";
};