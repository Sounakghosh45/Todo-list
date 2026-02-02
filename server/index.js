require('dotenv').config();
// console.log('Dotenv result:', result);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('Starting server...');
const app = express();
const PORT = process.env.PORT || 5000;

let MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    if (process.env.NODE_ENV === 'production') {
        console.error("❌ FATAL: MONGO_URI environment variable is not set!");
        console.error("Please add MONGO_URI to your Render Environment Variables.");
        process.exit(1);
    }
    console.warn("⚠️  WARNING: MONGO_URI not found. Falling back to local database.");
    MONGO_URI = 'mongodb://localhost:27017/mern-todo';
}

console.log('Connecting to MongoDB...');

// Middleware
app.use(cors({
    origin: '*', // For now allow all to debug CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Database Connection and Server Start
const startServer = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('💥 Global Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong on the server!',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

startServer();
