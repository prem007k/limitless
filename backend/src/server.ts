// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

import connectDB from './config/db';
import authRoutes from './routes/auth';
import strategyRoutes from './routes/strategy';
import marketRoutes from './routes/market';

import WebSocketServerService from './services/websocket';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/strategies', strategyRoutes);
app.use('/api/market', marketRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Limitless Backend is running 🚀',
    version: '1.0.0 (MVP)'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    server.listen(PORT, () => {
      console.log(`🚀 Limitless Backend running on http://localhost:${PORT}`);
      console.log(`📡 WebSocket ready for market replay`);
    });

    // Initialize WebSocket Server for real-time market replay
    new WebSocketServerService(server);
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();