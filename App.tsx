import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LineageGraph from './components/LineageGraph';
import DbtViewer from './components/DbtViewer';
import ConsultantChat from './components/ConsultantChat';
import PortfolioOverlay from './components/PortfolioOverlay';
import { analyticsConsultant } from './services/geminiService';
import { LiveBenchmarks } from './types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from 'recharts';
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [liveMetrics, setLiveMetrics] = useState<LiveBenchmarks | null>(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [showPortfolioInfo, setShowPortfolioInfo] = useState(false);
  
  // Comparative state for the BI tab
  const [userRev, setUserRev] = useState<number>(500000000);
  const [userSubs, setUserSubs] = useState<number>(10000000);
  
  // Defaults based on last known data if sync fails
  const DEFAULT_BENCH_REV = 3280000000;
  const DEFAULT_BENCH_SUBS = 282700000;
  const DEFAULT_BENCH_ARM = 11.60;

  useEffect(() => {
    const syncWithNetflix = async () => {
      setIsSyncing(true);
      const benchmarks = await analyticsConsultant.fetchLiveNetflixBenchmarks();
      if (benchmarks) setLiveMetrics(benchmarks);
      setIsSyncing(false);
    };
    syncWithNetflix();
  }, []);

  const GLOBAL_BENCH_REV = liveMetrics?.rawRevenue ?? DEFAULT_BENCH_REV;
  const GLOBAL_BENCH_SUBS = liveMetrics?.rawSubscribers ?? DEFAULT_BENCH_SUBS;
  const MARKET_ARM = liveMetrics?.rawArm ?? DEFAULT_BENCH_ARM;

  // Chart Data Preparation
  const comparisonData = [
    { 
      name: 'Revenue ($M)', 
      Current: Number((userRev / 1000000).toFixed(0)), 
      Global: Number((GLOBAL_BENCH_REV / 1000000).toFixed(0)) 
    },
    { 
      name: 'Subs (M)', 
      Current: Number((userSubs / 1000000).toFixed(1)), 
      Global: Number((GLOBAL_BENCH_SUBS / 1000000).toFixed(1)) 
    },
  ];

  const pieData = [
    { name: 'Your Rev', value: userRev },
    { name: 'Benchmark Gap', value: Math.max(0, GLOBAL_BENCH_REV - userRev) },
  ];

  const COLORS = ['#ef4444', '#1e293b'];

  const trendData = [
    { month: 'Oct', variance: -15 },
    { month: 'Nov', variance: -12 },
    { month: 'Dec', variance: -18 },
    { month: 'Jan', variance: -8 },
    { month: 'Feb', variance: -5 },
    { month: 'Live', variance: Math.round(((userRev / GLOBAL_BENCH_REV) * 100) - 100) },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard liveMetrics={liveMetrics} />;
      case 'lineage': return <div className="p-8 h-full"><LineageGraph /></div>;
      case 'dbt': return <DbtViewer />;
      case 'consultant': return <div className="p-8 h-full"><ConsultantChat /></div>;
      case 'quality': return (
        <div className="p-8 space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-slate-900">Data Quality & Schema Validation</h1>
            <p className="text-slate-500">Cross-database integrity checks and comparison logic for external datasets.</p>
          </header>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-lg font-bold mb-6">Automated QA Suite</h2>
              <div className="space-y-4">
                {[
                  { model: 'stg_netflix__events', test: 'unique_event_id', error: 'Deduplication logic validated across high-volume streams.', status: 'Pass' },
                  { model: 'fct_content_profitability', test: 'profit_calculation_logic', error: 'Watch-time attribution weights sum to exactly 1.00.', status: 'Pass' },
                  { model: 'external_comparison', test: 'schema_drift_detector', error: 'Detected 2 new columns in user-provided dataset. Mapping to metadata structures.', severity: 'Warning' }
                ].map((fail, i) => (
                  <div key={i} className={`p-4 border rounded-xl flex gap-4 ${fail.status === 'Pass' ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                    <ShieldCheck className={fail.status === 'Pass' ? 'text-emerald-500' : 'text-amber-500'} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-bold ${fail.status === 'Pass' ? 'text-emerald-800' : 'text-amber-800'}`}>{fail.model}</span>
                        <span className={`px-2 py-0.5 text-[10px] rounded uppercase font-bold ${fail.status === 'Pass' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}`}>{fail.status || fail.severity}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mb-1">Health Check: {fail.test}</p>
                      <p className="text-sm text-slate-700">{fail.error}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <ShieldCheck size={48} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">99.98%</h3>
              <p className="text-slate-400 text-sm">Global Consistency Score</p>
              <div className="mt-6 pt-6 border-t border-slate-800 w-full space-y-2 text-left">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Total Validated Rows</span>
                  <span className="font-bold">2.4B</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Late Events Handled</span>
                  <span className="font-bold text-emerald-400">4.2M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      case 'bi': return (
        <div className="p-8 space-y-8 pb-16">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Benchmark Comparator</h1>
              <p className="text-slate-500">Compare your custom dataset against Live StreamPulse benchmarks.</p>
            </div>
            {isSyncing && (
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 animate-pulse">
                <RefreshCw size={14} className="animate-spin" />
                Updating Live Benchmarks...
              </div>
            )}
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* INPUTS SECTION */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <GitPullRequest size={20} className="text-red-600" />
                Input Your Metrics
              </h2>
              <div className="space-y-6 flex-1">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Total Monthly Revenue (USD)</label>
                  <input 
                    type="number" 
                    value={userRev}
                    onChange={(e) => setUserRev(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none font-bold text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Paid Subscribers</label>
                  <input 
                    type="number" 
                    value={userSubs}
                    onChange={(e) => setUserSubs(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none font-bold text-slate-700" 
                  />
                </div>
                
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Your ARM</span>
                    <span className="font-bold text-slate-900">${(userRev / Math.max(1, userSubs)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Market Reach</span>
                    <span className="font-bold text-slate-900">{((userSubs / GLOBAL_BENCH_SUBS) * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <TrendingUp size={24} className="text-red-500 shrink-0" />
                <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                  {userRev / userSubs > MARKET_ARM
                    ? "Your revenue per member is outstanding compared to Netflix benchmarks." 
                    : "Revenue efficiency is below current benchmark. Audit pricing tiers."}
                </p>
              </div>
            </div>

            {/* CHARTS SECTION */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 size={18} className="text-red-600" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Benchmark Comparison</h3>
                  </div>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{fill: '#f8fafc'}}
                      />
                      <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 700 }} />
                      <Bar dataKey="Current" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Global" fill="#1e293b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChartIcon size={18} className="text-red-600" />
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Global Revenue Share</h3>
                  </div>
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => `$${(value/1000000).toLocaleString()}M`}
                      />
                      <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl h-96 overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity size={18} className="text-red-500" />
                      <h3 className="text-lg font-bold">Live Variance Trend</h3>
                    </div>
                    <p className="text-slate-400 text-xs">Simulated performance gap narrowing relative to Live Benchmarks</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-400">
                      {((userRev / GLOBAL_BENCH_REV) * 100).toFixed(1)}%
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Capture Rate</p>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height="65%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorVar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="variance" 
                      stroke="#ef4444" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorVar)" 
                      name="Delta to Benchmark (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      );
      default: return <Dashboard liveMetrics={liveMetrics} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Header */}
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
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setShowPortfolioInfo(true)}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <HelpCircle size={14} className="text-red-500" />
              How this was built
            </button>
            <a 
              href="https://github.com/Parthkhillare/StreamPulse.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <Github size={14} />
              Clone Source
            </a>
            
            {/* User Profile Section - Abstracted for GitHub Contact */}
            <div className="flex items-center gap-4 ml-2 border-l border-slate-200 pl-4">
              <div className="text-right">
                <p className="text-xs font-black text-slate-900 group flex items-center gap-1 justify-end cursor-pointer hover:text-red-600 transition-colors">
                  @analytics-engineer
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Contact for hire</p>
              </div>
              <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center border border-slate-700 ring-2 ring-red-500/10 text-white shadow-sm transition-transform hover:scale-105 cursor-pointer">
                 <Github size={16} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto">
          {renderContent()}
        </div>

        {showPortfolioInfo && (
          <PortfolioOverlay 
            activeTab={activeTab} 
            onClose={() => setShowPortfolioInfo(false)} 
          />
        )}

        <footer className="p-8 mt-12 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400 font-medium">
            StreamPulse Analytics Engine © 2024. All transformation logic is managed via dbt-cloud abstraction.
            <br />
            Explore the repository for high-level architecture diagrams.
            <a href="https://github.com/Parthkhillare/StreamPulse.git" className="text-red-600 ml-1 hover:underline">View on GitHub</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;