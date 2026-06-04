// backend/src/services/marketService.ts
import { WebSocketServer as WSServer } from 'ws';

export interface MarketTick {
  symbol: string;
  price: number;
  timestamp: Date;
  volume: number;
}

// Simulated historical data (in real app this would come from database)
const mockMarketData: MarketTick[] = [
  { symbol: "AAPL", price: 150.25, timestamp: new Date(), volume: 1200 },
  { symbol: "AAPL", price: 151.10, timestamp: new Date(Date.now() + 1000), volume: 980 },
  { symbol: "AAPL", price: 150.75, timestamp: new Date(Date.now() + 2000), volume: 1450 },
  { symbol: "TSLA", price: 248.50, timestamp: new Date(Date.now() + 500), volume: 2100 },
  { symbol: "TSLA", price: 250.10, timestamp: new Date(Date.now() + 1500), volume: 1890 },
];

export class MarketService {
  private speedMultiplier: number = 1; // 1x, 10x, 100x etc.

  startReplay(wss: WSServer, speed: number = 1) {
    this.speedMultiplier = speed;
    let index = 0;

    const interval = setInterval(() => {
      if (index >= mockMarketData.length) {
        clearInterval(interval);
        return;
      }

      const tick = mockMarketData[index];
      
      // Broadcast to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === 1) { // OPEN
          client.send(JSON.stringify({
            type: 'market_tick',
            data: tick
          }));
        }
      });

      index++;
    }, 1000 / this.speedMultiplier); // Speed control
  }

  // Simple portfolio update logic based on tick
  simulateTrade(tick: MarketTick, action: 'BUY' | 'SELL', quantity: number, currentPortfolio: any) {
    // This will be expanded later with proper event sourcing
    console.log(`Simulated ${action} ${quantity} ${tick.symbol} @ ${tick.price}`);
    return currentPortfolio;
  }
}

export default new MarketService();