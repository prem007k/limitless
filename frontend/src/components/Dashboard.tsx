// frontend/src/components/Dashboard.tsx
import React, { useState } from 'react';
import StrategyBuilder from './StrategyBuilder';
import MarketReplay from './MarketReplay';
import PortfolioPanel from './PortfolioPanel';
import Sidebar from './Sidebar';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'builder' | 'replay'>('builder');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <nav className="bg-dark-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-emerald-400">LIMITLESS</h1>
            <span className="text-sm text-gray-400">Algorithmic Trading Sandbox</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <button 
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'builder' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-700'}`}
            >
              Strategy Builder
            </button>
            <button 
              onClick={() => setActiveTab('replay')}
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'replay' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-700'}`}
            >
              Market Replay
            </button>
          </div>

          <div className="text-sm text-gray-400 flex items-center gap-4">
            Demo Mode • $100,000 Starting Capital
            <button 
              onClick={onLogout}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'builder' ? <StrategyBuilder /> : <MarketReplay />}
          <PortfolioPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;