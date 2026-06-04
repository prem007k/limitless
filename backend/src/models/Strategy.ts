// backend/src/models/Strategy.ts
import mongoose from 'mongoose';

const strategySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  nodes: { type: Array, default: [] },        // Visual nodes (React Flow)
  edges: { type: Array, default: [] },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Strategy', strategySchema);