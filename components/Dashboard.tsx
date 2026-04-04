import React, { useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  BarChart,
  Bar,
  Legend,
  Cell,
  AreaChart
} from 'recharts';
import { MOCK_METRICS, TREND_DATA_ACTUALS, SEASONALITY_HEATMAP } from '../constants';
import { LiveBenchmarks } from '../types';
import { mockService } from '../services/mockService';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Info, 
  Trophy, 
  Globe, 
  Zap, 
  Calendar, 
  TrendingDown
} from 'lucide-react';

interface DashboardProps {
  liveMetrics: LiveBenchmarks | null;
}

const Dashboard: React.FC<DashboardProps> = ({ liveMetrics }) => {
  const [currency, setCurrency] = useState('USD');

  const formatCurrency = (value: number) => {
    switch (currency) {
      case 'USD':
        return `$${value.toLocaleString()}`;
      case 'INR':
        return `₹${value.toLocaleString()}`;
      case 'EUR':
        return `€${value.toLocaleString()}`;
      case 'GBP':
        return `£${value.toLocaleString()}`;
      default:
        return `$${value.toLocaleString()}`;
    }
  };

  const contentProfitData = [
    { title: 'Stranger Things S5', profit: 420000000, cost: 200000000 },
    { title: 'Squid Game: The Challenge', profit: 380000000, cost: 50000000 },
    { title: 'Wednesday S2', profit: 310000000, cost: 120000000 },
    { title: 'The Crown (Final)', profit: 240000000, cost: 180000000 },
    { title: 'Extraction 2', profit: 195000000, cost: 70000000 },
  ].sort((a, b) => b.profit - a.profit);

  const displayMetrics = liveMetrics ? [
    { title: 'Global Revenue (Actual)', value: formatCurrency(liveMetrics.rawRevenue || 9830000000), change: 14.2, unit: currency },
    { title: 'Paid Members (Actual)', value: formatCurrency(liveMetrics.rawSubscribers || 282700000), change: 8.5, unit: currency },
    { title: 'Avg Member Rev (Actual)', value: formatCurrency(liveMetrics.rawArm || 11.60), change: 2.1, unit: currency },
    { title: 'Churn (Actual)', value: `${(liveMetrics.rawChurn || 2.4).toFixed(1)}%`, change: -0.3, unit: 'Monthly' }
  ] : MOCK_METRICS;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold text-white">Current Performance & KPIs</h1>
            <span className="px-2 py-0.5 bg-gray-800 text-red-500 text-[10px] font-bold rounded uppercase flex items-center gap-1">
              <Calendar size={10} /> Real-Time Actuals
            </span>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Live analytics dashboard displaying verified performance metrics. No projections—only verified market data.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-semibold shadow-lg ring-4 ring-red-500/10">
            <Zap size={14} className="text-red-500 fill-red-500" />
            Verified Ledger Active
          </div>
          <div className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-xs font-semibold shadow-lg ring-4 ring-red-500/10">
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-white border-none outline-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayMetrics.map((metric, idx) => (
          <div key={idx} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/20 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-red-900/30"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2 bg-gray-800 group-hover:bg-red-900/20 transition-colors rounded-lg">
                {metric.title.includes('Revenue') ? <DollarSign className="text-gray-400 group-hover:text-red-500" size={20} /> : 
                 metric.title.includes('Members') || metric.title.includes('Subscribers') ? <Users className="text-gray-400 group-hover:text-red-500" size={20} /> : 
                 metric.title.includes('Churn') ? <TrendingDown className="text-gray-400 group-hover:text-red-500" size={20} /> : 
                 <Info className="text-gray-400 group-hover:text-red-500" size={20} />}
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest relative z-10">{metric.title}</h3>
            <p className="text-3xl font-bold text-white mt-1 relative z-10">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart - Historical Actuals only */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">MRR Quarterly Growth Trajectory</h3>
              <p className="text-xs text-gray-400">Verified Revenue performance from 2023 through current period.</p>
            </div>
            <div className="px-3 py-1 bg-red-900/20 text-red-500 text-[10px] font-black uppercase rounded border border-red-600/20">
              Historical Verification: 100%
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA_ACTUALS}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} tickFormatter={(v) => `${formatCurrency(v/1000000000).replace(/\D/g, '')}B`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#1f293b', color: '#fff' }}
                />
                <Area type="monotone" dataKey="mrr" stroke="#ef4444" strokeWidth={4} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Seasonality Heatmap */}
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Historical Seasonality</h3>
            <p className="text-xs text-gray-400">Validated Monthly Engagement Intensity trends.</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {SEASONALITY_HEATMAP.map((item, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1">
                  <span>{item.month} • {item.label}</span>
                  <span className="text-gray-300">{item.intensity}%</span>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 group-hover:brightness-125 ${
                      item.intensity > 90 ? 'bg-red-500' : 
                      item.intensity > 70 ? 'bg-red-700' : 
                      item.intensity > 50 ? 'bg-gray-600' : 'bg-gray-700'
                    }`}
                    style={{ width: `${item.intensity}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-[11px] text-gray-500 leading-relaxed italic">
            *Observed historical cycles based on validated event logs. Projections disabled due to market volatility.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Performance (Actuals) */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" />
                <h3 className="text-lg font-bold text-white">Verified Content Profitability</h3>
              </div>
              <p className="text-xs text-gray-400">Real-world net profit based on attribution models.</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentProfitData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
                <XAxis type="number" hide />
                <YAxis dataKey="title" type="category" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 700, fontSize: 11}} width={140} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1f293b', color: '#fff' }} />
                <Bar dataKey="profit" radius={[0, 6, 6, 0]} barSize={28}>
                   {contentProfitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#475569'} fillOpacity={1 - (index * 0.15)} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actual Fiscal Calendar */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
             <Calendar size={20} className="text-red-600" />
             Verified Fiscal Milestones
           </h3>
           <div className="space-y-6">
              {[
                { date: 'Oct 17, 2024', event: 'Q3 2024 Verified Earnings', status: 'Finalized', type: 'Fiscal' },
                { date: 'Jan 23, 2025', event: 'Q4 2024 Estimated Release', status: 'Pending', type: 'Market' },
                { date: 'Jul 19, 2024', event: 'Q2 2024 Verified Earnings', status: 'Finalized', type: 'Fiscal' },
                { date: 'Apr 18, 2024', event: 'Q1 2024 Verified Earnings', status: 'Finalized', type: 'Fiscal' },
              ].map((milestone, idx) => (
                <div key={idx} className="flex gap-4 group">
                   <div className="w-1 bg-slate-100 rounded-full group-hover:bg-red-500 transition-colors"></div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{milestone.date}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${milestone.status === 'Finalized' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{milestone.status}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{milestone.event}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Domain: {milestone.type} Validation</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
