const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/books', bookRoutes);

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
