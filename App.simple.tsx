import React, { useState } from 'react';
import { LayoutDashboard, GitBranch, Database, ShieldCheck, MessageSquare, FileCode2, BarChart3 } from 'lucide-react';

const Sidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive KPIs', icon: LayoutDashboard },
    { id: 'lineage', label: 'Data Lineage', icon: GitBranch },
    { id: 'dbt', label: 'dbt Project', icon: FileCode2 },
    { id: 'quality', label: 'Data Quality', icon: ShieldCheck },
    { id: 'bi', label: 'Product Analytics', icon: BarChart3 },
    { id: 'consultant', label: 'Architect Q&A', icon: MessageSquare },
  ];

  return (
    <div className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-lg">S</div>
          <h1 className="font-bold text-xl tracking-tight">StreamPulse</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1 uppercase font-semibold">Analytics Engineering</p>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-red-600/10 text-red-500 font-medium border border-red-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-red-500' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-900">StreamPulse Analytics</h1>
          <p className="text-slate-500 mt-2">Active tab: {activeTab}</p>
          <div className="mt-8 p-6 bg-white rounded-lg border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Dashboard Content</h2>
            <p className="text-gray-600">This is a simplified version to test the basic layout.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
