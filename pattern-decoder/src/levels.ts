import type { Level } from './types/game';

// helper to check prime
const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Even indices',
    description: 'Flash squares where index % 2 === 0',
    predicate: (index: number) => index % 2 === 0,
    hint: 'Even positions (0,2,4...)',
  },
  {
    id: 2,
    title: 'Diagonals',
    description: 'Flash squares where (row === col) or (row + col === 4)',
    predicate: (_index: number, row: number, col: number) => row === col || row + col === 4,
    hint: 'Look for corner-to-corner lines.',
  },
  {
    id: 3,
    title: 'Prime numbers',
    description: 'Flash squares whose index is a prime number',
    predicate: (index: number) => isPrime(index),
    hint: 'Indices 2,3,5,7,11,13,17,19,23 are prime (within 0..24).',
  },
  {
    id: 4,
    title: 'Center cluster',
    description: 'Center (index 12) and its 4 direct neighbors',
    predicate: (_index: number, row: number, col: number) => {
      const centerR = 2;
      const centerC = 2;
      const dr = Math.abs(row - centerR);
      const dc = Math.abs(col - centerC);
      return (dr === 0 && dc === 0) || (dr + dc === 1);
    },
    hint: 'Plus-shaped cluster around the center cell.',
  },
  {
    id: 5,
    title: '(row + col) % 3 === 0',
    description: 'Use this formula to decide flashing squares',
    predicate: (_index: number, row: number, col: number) => (row + col) % 3 === 0,
    hint: 'Sum row+col and check modulo 3.',
  },
];
