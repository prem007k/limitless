// backend/src/controllers/strategyController.ts
import { Request, Response } from 'express';
import Strategy from '../models/Strategy';
import Portfolio from '../models/Portfolio';

const strategyController = {
  async createStrategy(req: any, res: Response) {
    try {
      const { name, description, nodes, edges } = req.body;
      
      // Temporary hardcoded userId for demo (until we add auth)
      const userId = "67a1b2c3d4e5f67890123456";

      const strategy = await Strategy.create({
        userId,
        name,
        description: description || 'No description',
        nodes: nodes || [],
        edges: edges || []
      });

      // Create initial portfolio for this strategy
      await Portfolio.create({
        userId,
        strategyId: strategy._id,
        cash: 100000
      });

      res.status(201).json({ 
        success: true,
        message: 'Strategy saved successfully',
        strategy 
      });
    } catch (error: any) {
      console.error('Create Strategy Error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error creating strategy',
        error: error.message 
      });
    }
  },

  async getUserStrategies(req: any, res: Response) {
    try {
      // Temporary: Return all strategies for demo
      const strategies = await Strategy.find().sort({ createdAt: -1 });
      res.json(strategies);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching strategies' });
    }
  },

  async getStrategyById(req: Request, res: Response) {
    try {
      const strategy = await Strategy.findById(req.params.id);
      if (!strategy) {
        return res.status(404).json({ message: 'Strategy not found' });
      }
      res.json(strategy);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching strategy' });
    }
  },

  async updateStrategy(req: Request, res: Response) {
    try {
      const strategy = await Strategy.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!strategy) {
        return res.status(404).json({ message: 'Strategy not found' });
      }
      res.json({ message: 'Strategy updated', strategy });
    } catch (error) {
      res.status(500).json({ message: 'Error updating strategy' });
    }
  }
};

export default strategyController;