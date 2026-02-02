require('dotenv').config();
// console.log('Dotenv result:', result);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('Starting server...');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-todo';
console.log('MONGO_URI:', MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
