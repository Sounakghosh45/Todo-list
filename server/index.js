require('dotenv').config();
// console.log('Dotenv result:', result);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('Starting server...');
const app = express();
const PORT = process.env.PORT || 5000;

// 1. CORS Middleware (MUST BE FIRST)
app.use(cors()); // Simplest possible CORS for debugging

// 2. Body Parser
app.use(express.json());

// 3. Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        time: new Date().toISOString()
    });
});

let MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    if (process.env.NODE_ENV === 'production') {
        console.error("❌ FATAL: MONGO_URI environment variable is not set!");
        // We don't exit yet, let the health check show it's missing
    } else {
        MONGO_URI = 'mongodb://localhost:27017/mern-todo';
    }
}

// 4. Routes
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('💥 Global Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong on the server!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

// Start Listening and THEN connect to DB
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);

    if (MONGO_URI) {
        console.log('Connecting to MongoDB...');
        mongoose.connect(MONGO_URI)
            .then(() => console.log('✅ MongoDB Connected'))
            .catch(err => console.error('❌ MongoDB Connection Error:', err.message));
    }
});
