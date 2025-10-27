export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
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
    "Pattern: Mathematical sequence",
    "Pattern: Geometric alignment", 
    "Pattern: Number theory",
    "Pattern: Spatial cluster",
    "Pattern: Modular arithmetic"
  ];
  return descriptions[level - 1] || "Unknown pattern";
};