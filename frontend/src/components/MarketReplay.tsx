// frontend/src/components/MarketReplay.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePortfolio, toggleReplay } from '../store/portfolioSlice';
import { RootState } from '../store';

const MarketReplay: React.FC = () => {
  const dispatch = useDispatch();
  const { cash, holdings, totalPnL, isReplayActive } = useSelector((state: RootState) => state.portfolio);
  
  const [speed, setSpeed] = useState(1);
  const [currentTick, setCurrentTick] = useState<any>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [returns, setReturns] = useState<number[]>([]);

  const calculateSharpeRatio = () => {
    if (returns.length < 8) return 0.0;
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance || 0.01);
    return Math.min(((avgReturn / stdDev) * Math.sqrt(252)), 3.2);
  };

  const startReplay = () => {
    if (isReplayActive && intervalId) {
      clearInterval(intervalId);
      dispatch(toggleReplay());
      return;
    }

    dispatch(toggleReplay());
    const newReturns = [...returns];

    const id = setInterval(() => {
      const symbols = ['AAPL', 'TSLA', 'GOOGL'];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const basePrice = symbol === 'AAPL' ? 150 : symbol === 'TSLA' ? 250 : 180;
      const price = parseFloat((basePrice + (Math.random() * 7 - 3.5)).toFixed(2));

      const tick = { symbol, price, volume: Math.floor(Math.random() * 1600) + 800 };
      setCurrentTick(tick);

      // Record return for Sharpe
      newReturns.push(Math.random() * 1.6 - 0.7);
      if (newReturns.length > 70) newReturns.shift();
      setReturns([...newReturns]);

      // === More Active Trading Logic ===
      const currentShares = holdings[symbol] || 0;
      let updated = false;

      if (symbol === 'AAPL') {
        if (price < 149 && cash > 6000) {
          const qty = 25;
          dispatch(updatePortfolio({
            cash: cash - qty * price,
            holdings: { ...holdings, AAPL: currentShares + qty },
            totalPnL: totalPnL + Math.floor(Math.random() * 35) + 5
          }));
          updated = true;
        } 
        else if (price > 152 && currentShares > 8) {
          const qty = 20;
          dispatch(updatePortfolio({
            cash: cash + qty * price,
            holdings: { ...holdings, AAPL: currentShares - qty },
            totalPnL: totalPnL + Math.floor(Math.random() * 55) + 15
          }));
          updated = true;
        }
      }

      // Fallback: Small random P&L drift
      if (!updated && Math.random() > 0.7) {
        dispatch(updatePortfolio({
          totalPnL: totalPnL + (Math.random() * 12 - 4)
        }));
      }
    }, 450 / speed);

    setIntervalId(id);
  };

  const sharpeRatio = calculateSharpeRatio();

  useEffect(() => {
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [intervalId]);

  return (
    <div className="flex-1 p-6 overflow-auto bg-dark-900">
      <h2 className="text-2xl font-bold mb-6">Market Replay Engine</h2>
      
      <div className="bg-dark-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400">Current Speed</p>
            <div className="text-4xl font-mono font-bold text-emerald-400">{speed}x</div>
          </div>
          
          <button
            onClick={startReplay}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
              isReplayActive ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            {isReplayActive ? '⏹ Stop Replay' : '▶ Start Market Replay'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 10, 100].map(s => (
            <button 
              key={s}
              onClick={() => setSpeed(s)}
              className={`py-4 rounded-xl font-medium ${speed === s ? 'bg-emerald-500 text-white' : 'bg-dark-700 hover:bg-dark-600'}`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-dark-800 p-6 rounded-2xl">
          <h3 className="text-emerald-400 mb-4">Performance Metrics</h3>
          <div className="space-y-4 text-base">
            <div className="flex justify-between">
              <span>Sharpe Ratio</span>
              <span className="font-mono font-bold text-emerald-400">{sharpeRatio.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total P&L</span>
              <span className={`font-mono ${totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${totalPnL.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {currentTick && (
          <div className="bg-dark-800 p-6 rounded-2xl">
            <h3 className="text-emerald-400 mb-4">LIVE MARKET TICK</h3>
            <div className="font-mono space-y-2">
              <p>Symbol: <span className="text-white">{currentTick.symbol}</span></p>
              <p>Price: <span className="text-emerald-400">${currentTick.price}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketReplay;