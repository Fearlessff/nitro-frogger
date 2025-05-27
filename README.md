# Nitro Frog OG - Frogger Game

A modern take on the classic Frogger game with HTML5 Canvas, particle effects, and online leaderboards!

## 🎮 Features

- **Classic Frogger Gameplay**: Guide your frog across busy roads
- **4 Difficulty Levels**: Easy, Medium, Hard, and Insane
- **Particle Explosions**: Cool visual effects when cars collide
- **Sound Effects**: Jump and crash sounds for immersive gameplay
- **Online Leaderboard**: Submit and view high scores
- **Mobile Support**: Touch controls for mobile devices
- **Progressive Difficulty**: Game gets harder as you level up
- **Lives System**: 3 lives per game
- **Responsive Design**: Works on desktop and mobile

## 📁 File Structure

```
nitro-frog-og/
├── index.html          # Main game file (complete HTML/CSS/JS)
├── server.js           # Backend server for leaderboards
├── package.json        # Node.js dependencies
├── scores.json         # Stored scores (auto-generated)
├── README.md           # This file
└── assets/             # Game assets folder
    ├── frog.png        # Frog character image
    ├── car1.png        # Car image 1
    ├── car2.png        # Car image 2
    ├── car3.png        # Car image 3
    ├── car4.png        # Car image 4
    ├── jump.mp3        # Jump sound effect
    └── crash.mp3       # Crash sound effect
```

## 🚀 Quick Setup

### 1. Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies
Open terminal/command prompt in the game folder and run:
```bash
npm install
```

### 3. Add Game Assets
Place these files in the same folder as index.html:
- `frog.png` - Image of the frog character
- `car1.png`, `car2.png`, `car3.png`, `car4.png` - Car images
- `jump.mp3` - Sound effect for jumping
- `crash.mp3` - Sound effect for crashes

### 4. Start the Server
```bash
npm start
```

### 5. Play the Game
Open your browser and go to: `http://localhost:3000`

## 🎯 How to Play

### Controls
- **Arrow Keys**: Move the frog (Up/Down/Left/Right)
- **SPACE**: Pause/Resume the game
- **ESC**: Return to main menu

### Mobile Controls
- **Swipe**: Swipe in any direction to move
- **Touch Buttons**: Use the on-screen control buttons

### Objective
1. Guide your frog from the bottom to the top of the screen
2. Avoid getting hit by cars on the road
3. Each forward movement gives you 10 points
4. Reaching the top gives you 100 bonus points and advances to the next level
5. You have 3 lives - don't waste them!

## 🏆 Scoring System

- **Moving Forward**: 10 points per step
- **Completing a Level**: 100 bonus points
- **High Score**: Saved locally and on the leaderboard

## 🛠️ Customization

### Difficulty Settings
You can modify the difficulty settings in the game code:

```javascript
const DIFFICULTY_SETTINGS = {
    easy: { carSpeed: 1, carSpawnRate: 0.02, maxCars: 8 },
    medium: { carSpeed: 2, carSpawnRate: 0.03, maxCars: 12 },
    hard: { carSpeed: 3, carSpawnRate: 0.04, maxCars: 16 },
    insane: { carSpeed: 4, carSpawnRate: 0.06, maxCars: 20 }
};
```

### Adding New Car Types
1. Add new car images (car5.png, car6.png, etc.)
2. Update the `imageFiles` array in the JavaScript code
3. Modify the `Car` constructor to use more car types

## 🔧 API Endpoints

The backend server provides these endpoints:

- `POST /submit` - Submit a new score
- `GET /leaderboard` - Get top 10 scores
- `GET /leaderboard?difficulty=hard` - Get scores for specific difficulty
- `GET /player/:username` - Get player statistics
- `GET /health` - Server health check

## 🐛 Troubleshooting

### Images Not Loading
- Make sure all PNG files are in the same folder as index.html
- Check browser console for error messages
- The game will work with colored rectangles if images fail to load

### Sound Not Playing
- Ensure MP3 files are in the correct location
- Some browsers require user interaction before playing audio
- Check browser console for audio errors

### Leaderboard Not Working
- Make sure the server is running (`npm start`)
- Check if port 3000 is available
- Look at server console for error messages

### Game Performance Issues
- Try lowering the difficulty
- Close other browser tabs
- Check if your device meets the minimum requirements

## 📱 Browser Compatibility

- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Requirements**: HTML5 Canvas support, ES6 JavaScript

## 🎨 Asset Requirements

### Images
- **Format**: PNG with transparency
- **Frog**: ~50x50 pixels, facing up
- **Cars**: ~80x40 pixels, facing right
- **Style**: Pixel art or cartoon style recommended

### Audio
- **Format**: MP3
- **Duration**: Short clips (< 2 seconds)
- **Quality**: 44.1kHz, stereo recommended

## 📄 License

This game is created by FEARLESS and is available for educational and personal use.

## 🤝 Contributing

Feel free to fork this project and add your own features:
- New character sprites
- Additional sound effects
- Power-ups and special items
- Different game modes
- Improved graphics

---

**Enjoy playing Nitro Frog OG! 🐸**