// frontend/src/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className="w-64 bg-dark-800 border-r border-gray-700 p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-emerald-400 font-semibold mb-4">MY STRATEGIES</h2>
        <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg text-sm font-medium transition-all">
          + New Strategy
        </button>
      </div>

      <div className="space-y-2 text-sm flex-1">
        <div className="bg-dark-700 p-3 rounded-lg cursor-pointer hover:bg-dark-600">
          RSI Mean Reversion
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="mt-8 text-red-400 hover:text-red-500 text-sm py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;