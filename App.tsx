import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NetflixTrending from './components/NetflixTrending';
import ComprehensiveTrending from './components/ComprehensiveTrending';
import NetflixTrendingAnalysis from './components/NetflixTrendingAnalysis';
import LiveData from './components/LiveData';
import Dashboard from './components/Dashboard';
import { mockService } from './services/mockService';
import { LiveBenchmarks } from './types';
import { LayoutDashboard, TrendingUp, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [liveMetrics, setLiveMetrics] = useState<LiveBenchmarks | null>(null);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const benchmarks = mockService.fetchLiveNetflixBenchmarks();
    
    if (benchmarks) {
      setLiveMetrics(benchmarks);
    } else {
      const defaultData = {
        revenue: '$9.83B',
        subscribers: '282.7M',
        arm: '$11.60',
        churn: '2.4%',
        lastUpdated: new Date().toLocaleTimeString(),
        rawRevenue: 9830000000,
        rawSubscribers: 282700000,
        rawArm: 11.60,
        rawChurn: 2.4
      };
      setLiveMetrics(defaultData);
    }
    setIsSyncing(false);
  }, []);

  useEffect(() => {
    // liveMetrics updated
  }, [liveMetrics]);

  const handleRefreshData = () => {
    setIsSyncing(true);
    const benchmarks = mockService.fetchLiveNetflixBenchmarks();
    if (benchmarks) setLiveMetrics(benchmarks);
    setIsSyncing(false);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Netflix Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Trending Data', icon: TrendingUp },
    { id: 'trending', label: 'Trending Shows', icon: TrendingUp },
    { id: 'comprehensive', label: 'All Shows & Movies', icon: BarChart3 },
    { id: 'analysis', label: 'Trending Analysis', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <Dashboard liveMetrics={liveMetrics} />;
      case 'live': 
        return <LiveData />;
      case 'trending': 
        return <NetflixTrending />;
      case 'comprehensive': 
        return <ComprehensiveTrending />;
      case 'analysis': 
        return <NetflixTrendingAnalysis />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">StreamPulse Analytics</h1>
              <p className="text-slate-600">Select a tab from the sidebar to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {isSyncing && (
          <div className="fixed top-4 right-4 z-50 bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            <span className="text-sm font-medium text-slate-700">Syncing Netflix data...</span>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
