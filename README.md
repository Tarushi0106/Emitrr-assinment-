🎮 Pattern Decoder
A challenging visual puzzle game that tests your pattern recognition skills! Observe flashing sequences on a 5x5 grid and decode the hidden rules across multiple levels of increasing complexity.

https://img.shields.io/badge/Game-Pattern_Decoder-blue
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/7bc6c93a-f52d-4bea-a9bf-d22b10fb2c72" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/74dbd20b-68af-4ef5-aa34-65fb1eafbe31" />

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/40bceaa5-e74c-483c-9032-3dbce7be7cf4" />

✨ Features
🎯 Core Gameplay
5 Challenging Levels with unique pattern rules

Visual Pattern Recognition - Observe and decode hidden sequences

Progressive Difficulty - Rules become more abstract and complex

Real-time Feedback - Instant validation of your guesses

Scoring System - Earn points based on accuracy

🎨 Immersive Experience
3 Beautiful Themes: Light, Dark, and Matrix (with special effects)

Smooth Animations - Fluid transitions and visual feedback

Audio Feedback - Sound effects for all interactions

Responsive Design - Play on any device

Interactive Grid - Intuitive click/touch controls

🔊 Sound System
Click Sounds - Tactile feedback for interactions

Pattern Flash Sounds - Audio cues during observation phase

Success/Error Tones - Immediate performance feedback

Level Up Fanfare - Celebration for progression

Toggle Control - Enable/disable sounds as preferred

🚀 Quick Start
Prerequisites
Node.js 16+

npm or yarn

Installation
Clone and setup

bash
git clone <repository-url>
cd pattern-decoder
npm install
Start development server

bash
npm run dev
Open your browser

text
http://localhost:3000
Build for Production
bash
npm run build
npm run preview
🎮 How to Play
Game Flow
Observe - Watch the 5x5 grid as squares flash in a pattern (10 seconds)

Decode - Identify the hidden rule governing which squares flash

Select - Click the squares you believe follow the pattern

Validate - Check your solution and see your score

Progress - Advance to more challenging levels

Level Rules
Level	Pattern Rule	Description
1	Even Indices	Squares where index % 2 === 0
2	Diagonals	Main diagonal and anti-diagonal
3	Prime Numbers	Squares with prime-numbered indices
4	Center Cluster	Center square and its 4 neighbors
5	Modular Arithmetic	(row + col) % 3 === 0
Scoring
✅ Correct Selection: +10 points

❌ Wrong Selection: -5 points

🔍 Missed Pattern: -2 points

🏆 Perfect Round: Bonus points!

🛠️ Technical Stack
Core Technologies
React 18 - Modern functional components with hooks

TypeScript - Full type safety and better development experience

Vite - Fast build tool and development server

CSS3 - Custom styling with CSS variables and animations

Architecture
text
src/
├── components/          # React components
│   ├── Grid.tsx        # 5x5 game grid
│   ├── Square.tsx      # Individual grid cell
│   ├── LevelProgress.tsx # Level info & timer
│   ├── ScoreBoard.tsx  # Score display & controls
│   └── ThemeToggle.tsx # Theme & sound controls
├── hooks/              # Custom React hooks
│   ├── useGameLogic.ts # Main game state management
│   ├── useAudio.ts     # Web Audio API integration
│   └── useTheme.ts     # Theme management
├── types/              # TypeScript definitions
│   └── game.ts         # Game-related types
├── utils/              # Helper functions
│   └── gameRules.ts    # Level pattern logic
└── styles/             # Styling
    └── globals.css     # Global styles & themes
Key Features Implementation
🎵 Audio System
Web Audio API - Programmatic sound generation (no external files)

Custom Hook - useAudio for sound management

Multiple Sound Types - Clicks, flashes, success, errors, level-ups

🎨 Theme System
CSS Variables - Dynamic theming

Three Themes - Light, Dark, Matrix

Smooth Transitions - Animated theme switching

🎯 Game Logic
State Management - Custom hook with React useState/useEffect

Pattern Recognition - Mathematical rule implementations

Timer System - Countdown and flash intervals

Score Calculation - Balanced scoring algorithm

🎯 Level Details
Level 1: Even Indices
typescript
// Rule: index % 2 === 0
shouldFlash = i % 2 === 0;
Pattern: Simple alternating pattern, great for learning the game mechanics.

Level 2: Diagonals
typescript
// Rule: row === col OR row + col === 4
shouldFlash = row === col || row + col === 4;
Pattern: X-shaped pattern, introduces geometric thinking.

Level 3: Prime Numbers
typescript
// Rule: index is prime
shouldFlash = isPrime(i);
Pattern: Mathematical sequence, requires number theory knowledge.

Level 4: Center Cluster
typescript
// Rule: center (2,2) and its 4 neighbors
const centerNeighbors = [[2,2], [1,2], [2,1], [2,3], [3,2]];
shouldFlash = centerNeighbors.some(([r,c]) => r === row && c === col);
Pattern: Spatial cluster pattern, tests visual memory.

Level 5: Modular Arithmetic
typescript
// Rule: (row + col) % 3 === 0
shouldFlash = (row + col) % 3 === 0;
Pattern: Abstract mathematical rule, most challenging level.

🔧 Customization
Adding New Levels
Add level logic in utils/gameRules.ts

Update getLevelDescription function

The game automatically handles progression

Creating New Themes
Add CSS variables in styles/globals.css

Update Theme type in types/game.ts

Modify useTheme.ts hook

Sound Customization
Modify frequencies and durations in hooks/useAudio.ts:

typescript
// Example: Change click sound
const playClick = useCallback(() => {
  playBeep(1000, 0.05, 0.2); // Higher pitch, shorter duration
}, [playBeep]);
🎉 Bonus Features
Already Implemented
✅ Progressive difficulty scaling

✅ Multiple visual themes

✅ Comprehensive sound system

✅ Responsive mobile design

✅ Score tracking

✅ Visual feedback system

✅ Smooth animations

Potential Enhancements
🚀 Additional levels with more complex patterns

🎵 Custom sound packs

📊 High score leaderboard

🔄 Pattern history replay

🎯 Challenge modes (time attack, endless)

🐛 Troubleshooting
Common Issues
Sound not working?

Ensure browser supports Web Audio API

Check if sounds are enabled (top-right toggle)

Modern browsers required for audio synthesis

Game not loading?

Clear browser cache

Ensure all dependencies are installed (npm install)

Check console for error messages

Performance issues?

Game optimized for modern browsers

Reduce animation intensity in CSS if needed

🤝 Contributing
We welcome contributions! Feel free to:

Add new level patterns

Create new visual themes

Improve sound design

Enhance mobile experience

Fix bugs and optimize performance

📄 License
This project is open source and available under the MIT License.

🎊 Acknowledgments
Built with modern web technologies and a focus on user experience. Special thanks to the React and TypeScript communities for excellent tooling and documentation.

Ready to test your pattern recognition skills? 🧠✨

Start playing and see if you can master all 5 levels! The patterns get trickier, but so does the satisfaction of decoding them! 🏆

Pattern Decoder - Challenge Your Mind, One Pattern at a Time 🎮
