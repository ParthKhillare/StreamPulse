import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Eye, 
  Calendar, 
  Star,
  Play,
  Award,
  ChevronUp,
  ChevronDown,
  Minus
} from 'lucide-react';

interface MonthlyTrendData {
  month: string;
  show: string;
  rank: number;
  views: number;
  growth: number;
  margin: number;
}

interface NetflixTrendingAnalysisProps {}

const NetflixTrendingAnalysis: React.FC<NetflixTrendingAnalysisProps> = () => {
  const [trendingShows, setTrendingShows] = useState<TrendingShow[]>([]);
  const [analytics, setAnalytics] = useState<TrendingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('August');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await analyticsConsultant.getTrendingAnalytics();
        const shows = await analyticsConsultant.getTrendingShows();
        
        setTrendingShows(shows);
        setAnalytics(analyticsData);
        setLoading(false);
      } catch (error) {
        console.error('NetflixTrendingAnalysis: Error:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Mock monthly trending data for demonstration
  const monthlyTrendingData: MonthlyTrendData[] = [
    // January
    { month: 'January', show: 'The Night Agent', rank: 1, views: 85000000, growth: 0, margin: 15 },
    { month: 'January', show: 'Wednesday', rank: 2, views: 72000000, growth: 0, margin: 0 },
    { month: 'January', show: 'Ginny & Georgia', rank: 3, views: 65000000, growth: 0, margin: -8 },
    
    // February
    { month: 'February', show: 'The Night Agent', rank: 1, views: 92000000, growth: 8.2, margin: 18 },
    { month: 'February', show: 'Wednesday', rank: 2, views: 78000000, growth: 8.3, margin: 5 },
    { month: 'February', show: 'Ginny & Georgia', rank: 4, views: 58000000, growth: -10.8, margin: -15 },
    
    // March
    { month: 'March', show: 'The Night Agent', rank: 1, views: 105000000, growth: 14.1, margin: 22 },
    { month: 'March', show: 'One Piece', rank: 2, views: 88000000, growth: 12.8, margin: 10 },
    { month: 'March', show: 'Wednesday', rank: 3, views: 75000000, growth: -3.8, margin: 2 },
    
    // April
    { month: 'April', show: 'Squid Game: The Challenge', rank: 1, views: 125000000, growth: 19.0, margin: 28 },
    { month: 'April', show: 'The Night Agent', rank: 2, views: 98000000, growth: -6.7, margin: 8 },
    { month: 'April', show: 'One Piece', rank: 3, views: 85000000, growth: -3.4, margin: 5 },
    
    // May
    { month: 'May', show: 'Squid Game: The Challenge', rank: 1, views: 142000000, growth: 13.6, margin: 31 },
    { month: 'May', show: 'One Piece', rank: 2, views: 98000000, growth: 15.3, margin: 12 },
    { month: 'May', show: 'Bridgerton', rank: 3, views: 82000000, growth: 0, margin: 8 },
    
    // June
    { month: 'June', show: 'Squid Game: The Challenge', rank: 1, views: 158000000, growth: 11.3, margin: 35 },
    { month: 'June', show: 'One Piece', rank: 2, views: 112000000, growth: 14.3, margin: 18 },
    { month: 'June', show: 'Bridgerton', rank: 3, views: 88000000, growth: 7.3, margin: 10 },
    
    // July
    { month: 'July', show: 'Squid Game: The Challenge', rank: 1, views: 175000000, growth: 10.8, margin: 38 },
    { month: 'July', show: 'One Piece', rank: 2, views: 125000000, growth: 11.6, margin: 22 },
    { month: 'July', show: 'Outer Banks', rank: 3, views: 95000000, growth: 0, margin: 12 },
    
    // August
    { month: 'August', show: 'Squid Game: The Challenge', rank: 1, views: 180000000, growth: 2.9, margin: 40 },
    { month: 'August', show: 'One Piece', rank: 2, views: 140000000, growth: 12.0, margin: 25 },
    { month: 'August', show: 'Outer Banks', rank: 3, views: 120000000, growth: 26.3, margin: 15 }
  ];

  const getMonthlyLeader = (month: string) => {
    const monthData = monthlyTrendingData.filter(d => d.month === month);
    return monthData.find(d => d.rank === 1);
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 5) return <ChevronUp className="w-4 h-4 text-green-500" />;
    if (growth < -5) return <ChevronDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-yellow-500" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 10) return 'text-green-600';
    if (growth > 0) return 'text-green-500';
    if (growth < -10) return 'text-red-600';
    return 'text-red-500';
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    return `${(views / 1000).toFixed(0)}K`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Netflix Analytics...</p>
        </div>
      </div>
    );
  }

  const currentMonthData = monthlyTrendingData.filter(d => d.month === selectedMonth);
  const monthlyLeader = getMonthlyLeader(selectedMonth);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Header */}
      <div className="bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold mb-2">Trending Analysis</h1>
          <p className="text-gray-400 text-lg">Monthly show performance and trending margins</p>
        </div>
      </div>

      {/* Month Selector */}
      <div className="px-8 py-4">
        <div className="flex gap-2 flex-wrap">
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'].map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedMonth === month
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Current Month Leader */}
      {monthlyLeader && (
        <div className="px-8 py-6">
          <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl p-8 border border-red-600/30">
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-bold">{selectedMonth} Top Show</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-white mb-1">{monthlyLeader.show}</p>
                <p className="text-gray-400">#{monthlyLeader.rank} in ranking</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-400 mb-1">{formatViews(monthlyLeader.views)}</p>
                <p className="text-gray-400">monthly views</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  {getGrowthIcon(monthlyLeader.growth)}
                  <p className={`text-3xl font-bold ${getGrowthColor(monthlyLeader.growth)}`}>
                    {monthlyLeader.growth > 0 ? '+' : ''}{monthlyLeader.growth}%
                  </p>
                </div>
                <p className="text-gray-400">vs previous month</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Trending Chart */}
      <div className="px-8 py-6">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-500" />
            Monthly Ranking Trends
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyTrendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#F3F4F6' }}
                itemStyle={{ color: '#F3F4F6' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', r: 6 }}
                activeDot={{ r: 8 }}
                name="Views"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Performance Table */}
      <div className="px-8 py-6">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Play className="w-6 h-6 text-red-500" />
            {selectedMonth} Performance Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Show</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Rank</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Views</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Growth</th>
                  <th className="text-center py-4 px-4 text-gray-400 font-medium">Margin</th>
                </tr>
              </thead>
              <tbody>
                {currentMonthData.map((show, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{show.show}</p>
                          <p className="text-sm text-gray-400">Trending Show</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-red-600/20 rounded-full">
                        <span className="text-red-400 font-bold">#{show.rank}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-medium">{formatViews(show.views)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getGrowthIcon(show.growth)}
                        <span className={`font-medium ${getGrowthColor(show.growth)}`}>
                          {show.growth > 0 ? '+' : ''}{show.growth}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          show.margin > 20 ? 'bg-green-500' : 
                          show.margin > 10 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-white font-medium">{show.margin}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trending Margins Overview */}
      <div className="px-8 py-6 pb-12">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-red-500" />
            Year-End Trending Margins
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyTrendingData
              .filter((d, i, arr) => arr.findIndex(a => a.month === d.month) === i)
              .map((month) => {
                const leader = getMonthlyLeader(month.month);
                return (
                  <div key={month.month} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="font-bold text-white mb-4">{month.month}</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Leader</span>
                        <span className="text-sm font-medium text-white truncate max-w-[120px]">
                          {leader?.show}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Margin</span>
                        <span className="text-sm font-bold text-red-400">
                          {leader?.margin}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Views</span>
                        <span className="text-sm font-medium text-white">
                          {leader ? formatViews(leader.views) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixTrendingAnalysis;
