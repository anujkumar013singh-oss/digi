require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(cors({ 
  origin: ["http://localhost:3000", /\.vercel\.app$/], // Allow local and Vercel domains
  credentials: true 
}));
app.use(express.json());

// Routes
app.use('/api', contactRoutes);

// Health check
app.get('/', (req, res) => res.send('Digi-Learners API is running!'));
app.get('/health', (req, res) => res.send('Server is healthy!'));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is missing in .env file');
} else {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err.message));
}

// Export for Vercel
module.exports = app;

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
