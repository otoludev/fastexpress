// Load environment variables (Node.js 21+)
// Only load .env file when NOT running in Docker
const fs = require('fs');
const path = require('path');
const isDocker = fs.existsSync('/.dockerenv') || process.env.DOCKER === 'true';
if (!isDocker && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile('.env');
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGODB_URI = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from views directory
app.use(express.static(path.join(__dirname, 'views')));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Serve the HTML view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});