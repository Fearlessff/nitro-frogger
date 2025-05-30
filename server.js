const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files - this serves the root directory including index.html
app.use(express.static(__dirname));

// Explicitly serve the assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// File to store scores persistently
const SCORES_FILE = path.join(__dirname, 'scores.json');

// Load existing scores from file
let scores = [];
try {
    if (fs.existsSync(SCORES_FILE)) {
        const data = fs.readFileSync(SCORES_FILE, 'utf8');
        scores = JSON.parse(data);
    }
} catch (error) {
    console.log('No existing scores file found, starting fresh');
    scores = [];
}

// Save scores to file
function saveScores() {
    try {
        fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
    } catch (error) {
        console.error('Error saving scores:', error);
    }
}

// API Routes

// Submit a new score
app.post('/submit', (req, res) => {
    try {
        const { username, score, difficulty } = req.body;

        // Validate input
        if (!username || typeof score !== 'number' || !difficulty) {
            return res.status(400).json({ 
                error: 'Invalid input. Username, score (number), and difficulty are required.' 
            });
        }

        // Create new score entry
        const newScore = {
            id: Date.now(), // Simple ID generation
            username: username.trim().substring(0, 20), // Limit username length
            score: parseInt(score),
            difficulty: difficulty,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        };

        // Add to scores array
        scores.push(newScore);

        // Save to file
        saveScores();

        console.log(`New score submitted: ${newScore.username} - ${newScore.score} (${newScore.difficulty})`);

        res.json({ 
            status: 'success',
            message: 'Score submitted successfully',
            id: newScore.id
        });

    } catch (error) {
        console.error('Error submitting score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get leaderboard
app.get('/leaderboard', (req, res) => {
    try {
        const { difficulty, limit } = req.query;

        let filteredScores = [...scores];

        // Filter by difficulty if specified
        if (difficulty && difficulty !== 'all') {
            filteredScores = filteredScores.filter(score => score.difficulty === difficulty);
        }

        // Sort by score (descending) and get top entries
        const topScores = filteredScores
            .sort((a, b) => b.score - a.score)
            .slice(0, parseInt(limit) || 10)
            .map(score => ({
                username: score.username,
                score: score.score,
                difficulty: score.difficulty,
                date: score.date
            }));

        res.json(topScores);

    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all difficulty leaderboards
app.get('/leaderboards/all', (req, res) => {
    try {
        const difficulties = ['easy', 'medium', 'hard', 'insane'];
        const allLeaderboards = {};

        difficulties.forEach(diff => {
            const diffScores = scores
                .filter(score => score.difficulty === diff)
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map(score => ({
                    username: score.username,
                    score: score.score,
                    date: score.date
                }));

            allLeaderboards[diff] = diffScores;
        });

        res.json(allLeaderboards);

    } catch (error) {
        console.error('Error getting all leaderboards:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get player stats
app.get('/player/:username', (req, res) => {
    try {
        const { username } = req.params;

        const playerScores = scores
            .filter(score => score.username.toLowerCase() === username.toLowerCase())
            .sort((a, b) => b.score - a.score);

        if (playerScores.length === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }

        const stats = {
            username: playerScores[0].username,
            totalGames: playerScores.length,
            highScore: playerScores[0].score,
            averageScore: Math.round(playerScores.reduce((sum, s) => sum + s.score, 0) / playerScores.length),
            recentScores: playerScores.slice(0, 5).map(score => ({
                score: score.score,
                difficulty: score.difficulty,
                date: score.date
            }))
        };

        res.json(stats);

    } catch (error) {
        console.error('Error getting player stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Clear all scores (admin endpoint)
app.delete('/scores/clear', (req, res) => {
    try {
        scores = [];
        saveScores();
        res.json({ status: 'success', message: 'All scores cleared' });
    } catch (error) {
        console.error('Error clearing scores:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        uptime: process.uptime(),
        totalScores: scores.length,
        timestamp: new Date().toISOString()
    });
});

// Serve the game
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🐸 Nitro Frog OG Server running on port ${PORT}`);
    console.log(`📊 Loaded ${scores.length} existing scores`);
    console.log(`🎮 Game available at http://localhost:${PORT}`);
    console.log(`📈 Leaderboard API at http://localhost:${PORT}/leaderboard`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Saving scores before shutdown...');
    saveScores();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Saving scores before shutdown...');
    saveScores();
    process.exit(0);
});
