// frontend/src/components/PortfolioPanel.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PortfolioPanel: React.FC = () => {
  const { cash, holdings, totalPnL } = useSelector((state: RootState) => state.portfolio);

  const totalValue = cash + Object.keys(holdings).reduce((sum, symbol) => {
    return sum + (holdings[symbol] * 150); // Simplified valuation
  }, 0);

  return (
    <div className="w-96 border-l border-gray-700 bg-dark-800 p-6 overflow-auto">
      <h2 className="text-xl font-semibold mb-6">Portfolio</h2>
      
      <div className="space-y-6">
        <div>
          <p className="text-gray-400 text-sm">Cash Balance</p>
          <p className="text-3xl font-mono font-bold">${cash.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Total Portfolio Value</p>
          <p className="text-3xl font-mono font-bold text-emerald-400">
            ${totalValue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Total P&L</p>
          <p className={`text-2xl font-mono ${totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-3">Holdings</p>
          {Object.keys(holdings).length > 0 ? (
            Object.keys(holdings).map(symbol => (
              <div key={symbol} className="flex justify-between bg-dark-700 p-3 rounded-lg mb-2">
                <span>{symbol}</span>
                <span className="font-mono">{holdings[symbol]} shares</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No holdings yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPanel;