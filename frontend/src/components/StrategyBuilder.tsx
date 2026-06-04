// frontend/src/components/StrategyBuilder.tsx
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import api from '../services/api';

const initialNodes: Node[] = [
  { id: '1', position: { x: 150, y: 150 }, data: { label: 'RSI Indicator' }, type: 'input' },
  { id: '2', position: { x: 450, y: 150 }, data: { label: 'RSI < 30' } },
  { id: '3', position: { x: 750, y: 150 }, data: { label: 'BUY AAPL' }, type: 'output' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

const StrategyBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [strategyName, setStrategyName] = useState("RSI Mean Reversion");
  const [saving, setSaving] = useState(false);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
  }, [setEdges]);

  const saveStrategy = async () => {
    setSaving(true);
    try {
      const response = await api.post('/strategies', {
        name: strategyName,
        description: "Strategy built using visual editor",
        nodes,
        edges
      });

      alert(`✅ Strategy "${strategyName}" saved successfully!`);
      console.log("Saved Strategy:", response.data);
    } catch (error: any) {
      console.error(error);
      alert("❌ Failed to save strategy. Make sure backend is running.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-700 bg-dark-800 flex items-center justify-between">
        <div>
          <input
            type="text"
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            className="bg-transparent text-2xl font-semibold focus:outline-none border-b border-transparent hover:border-gray-600"
          />
          <p className="text-sm text-gray-400">Visual Strategy Builder</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={saveStrategy}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-lg font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Strategy'}
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2.5 rounded-lg">
            ▶ Run Backtest
          </button>
        </div>
      </div>

      <div className="flex-1 relative" style={{ height: 'calc(100vh - 140px)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background color="#333" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default StrategyBuilder;