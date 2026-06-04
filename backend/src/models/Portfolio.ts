// backend/src/models/Portfolio.ts
import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  strategyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Strategy' },
  cash: { type: Number, default: 100000 },     // Starting capital $100k
  holdings: { type: Map, of: Number, default: {} }, // symbol -> quantity
  trades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Execution' }],
  totalPnL: { type: Number, default: 0 },
  maxDrawdown: { type: Number, default: 0 }
});

export default mongoose.model('Portfolio', portfolioSchema);