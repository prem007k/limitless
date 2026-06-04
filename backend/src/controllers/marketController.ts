// backend/src/controllers/marketController.ts
import { Request, Response } from 'express';

const marketController = {
  getAvailableSymbols(req: Request, res: Response) {
    res.json({
      symbols: ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN']
    });
  },

  startReplay(req: Request, res: Response) {
    const { speed = 1 } = req.body;
    res.json({ 
      message: `Market replay started at ${speed}x speed`,
      speed 
    });
  }
};

export default marketController;