import React, { useState, useEffect } from 'react';
import { analyticsConsultant } from './services/geminiService';
import { LiveBenchmarks } from './types';
import { 
  Github, 
  ShieldCheck, 
  Database, 
  Zap, 
  GitPullRequest, 
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Loader2,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

// Simple component placeholders
const Sidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => (
  <div className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
    <div className="p-6">
      <div className="flex items-center gap-3 text-white">
        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-lg">S</div>
        <h1 className="font-bold text-xl tracking-tight">StreamPulse</h1>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<{ liveMetrics: LiveBenchmarks | null }> = ({ liveMetrics }) => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
    <p className="text-slate-500 mt-2">Live metrics: {liveMetrics ? 'Loaded' : 'Loading...'}</p>
  </div>
);

const App: React.FC = () => {
  console.log('App component rendering...');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [liveMetrics, setLiveMetrics] = useState<LiveBenchmarks | null>(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [showPortfolioInfo, setShowPortfolioInfo] = useState(false);

  useEffect(() => {
    console.log('useEffect running...');
    const syncWithNetflix = async () => {
      console.log('syncWithNetflix starting...');
      setIsSyncing(true);
      try {
        const benchmarks = await analyticsConsultant.fetchLiveNetflixBenchmarks();
        console.log('Benchmarks received:', benchmarks);
        if (benchmarks) setLiveMetrics(benchmarks);
      } catch (error) {
        console.error('Error fetching benchmarks:', error);
      } finally {
        setIsSyncing(false);
      }
    };
    syncWithNetflix();
  }, []);

  const renderContent = () => {
    console.log('renderContent called, activeTab:', activeTab);
    switch (activeTab) {
      case 'dashboard': 
        return <Dashboard liveMetrics={liveMetrics} />;
      default: 
        return <div className="p-8"><h1 className="text-2xl font-bold">{activeTab}</h1></div>;
    }
  };

  console.log('About to render JSX...');
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto relative">
        <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Database size={12} /> BigQuery</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1.5"><GitPullRequest size={12} /> dbt-cloud</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold animate-pulse">
              {isSyncing ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />} 
              {isSyncing ? 'Syncing Benchmarks...' : 'Live Engine Active'}
            </span>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
