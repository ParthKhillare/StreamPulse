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
    console.log('App: Starting data fetch...');
    const benchmarks = mockService.fetchLiveNetflixBenchmarks();
    console.log('App: Benchmarks fetched:', benchmarks);
    
    if (benchmarks) {
      setLiveMetrics(benchmarks);
      console.log('App: LiveMetrics set:', benchmarks);
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
      console.log('App: Default data set:', defaultData);
    }
    setIsSyncing(false);
    console.log('App: Sync completed');
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
    console.log('App: Rendering content for tab:', activeTab);
    console.log('App: LiveMetrics available:', !!liveMetrics);
    
    switch (activeTab) {
      case 'dashboard': 
        console.log('App: Rendering Dashboard component');
        return <Dashboard liveMetrics={liveMetrics} />;
      case 'live': 
        console.log('App: Rendering LiveData component');
        return <LiveData />;
      case 'trending': 
        console.log('App: Rendering NetflixTrending component');
        return <NetflixTrending />;
      case 'comprehensive': 
        console.log('App: Rendering ComprehensiveTrending component');
        return <ComprehensiveTrending />;
      case 'analysis': 
        console.log('App: Rendering NetflixTrendingAnalysis component');
        return <NetflixTrendingAnalysis />;
      default:
        console.log('App: Rendering default content');
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">StreamPulse Analytics</h1>
              <p className="text-gray-400">Select a tab from the sidebar to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {isSyncing && (
          <div className="fixed top-4 right-4 z-50 bg-gray-900 px-4 py-2 rounded-lg shadow-lg border border-gray-800 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            <span className="text-sm font-medium text-white">Syncing Netflix data...</span>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
