import React, { useState, useEffect } from 'react';
import { TrendingShow, TrendingAnalytics } from '../services/mockService';
import { mockService } from '../services/mockService';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Calendar, 
  Star,
  BarChart3,
  Activity
} from 'lucide-react';

const NetflixTrending: React.FC = () => {
  const [trendingShows, setTrendingShows] = useState<TrendingShow[]>([]);
  const [analytics, setAnalytics] = useState<TrendingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<TrendingShow | null>(null);

  useEffect(() => {
    const analyticsData = mockService.getTrendingShows();
    
    setTrendingShows(analyticsData);
    setAnalytics(null);
    setLoading(false);
  }, []);

  const COLORS = ['#dc2626', '#3b82f6', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <TrendingUp className="mr-3 text-red-600" />
            Netflix Trending Shows
          </h1>
          <p className="text-slate-600 mt-2">Real-time trending shows with analytics and performance metrics</p>
        </div>
        <div className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Trend */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Activity className="mr-2 text-red-600" />
              Weekly Trend (8 Weeks)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.weekly_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(value as number / 1000000).toFixed(1)}M views`, 'Views']} />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <BarChart3 className="mr-2 text-red-600" />
              Monthly Trend (8 Months)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthly_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(value as number / 1000000).toFixed(0)}M views`, 'Views']} />
                <Legend />
                <Bar dataKey="views" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Genre Performance */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold mb-4">Genre Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.genre_performance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ genre, total_views }) => `${genre}: ${(total_views / 1000000).toFixed(0)}M`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total_views"
                >
                  {analytics.genre_performance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${(value as number / 1000000).toFixed(0)}M views`, 'Total Views']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold mb-4">Top Performers</h3>
            <div className="space-y-3">
              {analytics.top_performers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">{performer.title}</div>
                    <div className="text-sm text-slate-600">{(performer.views / 1000000).toFixed(0)}M views</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${performer.growth > 20 ? 'text-green-600' : 'text-blue-600'}`}>
                      +{performer.growth}%
                    </div>
                    <div className="text-xs text-slate-500">growth</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trending Shows Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Current Trending Shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingShows.map((show) => (
            <div
              key={show.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden cursor-pointer"
              onClick={() => setSelectedShow(show)}
            >
              {/* Show Header */}
              <div className="relative h-32 bg-gradient-to-br from-red-500 to-slate-800 p-4">
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  #{show.trending_rank}
                </div>
                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold">
                  ⭐ {show.vote_average}
                </div>
                <div className="flex items-end h-full">
                  <h3 className="text-white font-bold text-lg line-clamp-2">{show.title}</h3>
                </div>
              </div>

              {/* Show Details */}
              <div className="p-4">
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{show.overview}</p>
                
                {/* Metrics */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Weekly Views</span>
                    <span className="text-sm font-bold text-slate-900">
                      {(show.weekly_views / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Monthly Views</span>
                    <span className="text-sm font-bold text-slate-900">
                      {(show.monthly_views / 1000000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Growth</span>
                    <span className={`text-sm font-bold ${show.view_growth > 20 ? 'text-green-600' : 'text-blue-600'}`}>
                      +{show.view_growth}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Retention</span>
                    <span className="text-sm font-bold text-slate-900">
                      {show.audience_retention}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Show Detail Modal */}
      {selectedShow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-900">{selectedShow.title}</h2>
                <button
                  onClick={() => setSelectedShow(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-slate-600 mb-6">{selectedShow.overview}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Trending Rank</div>
                  <div className="text-2xl font-bold text-red-600">#{selectedShow.trending_rank}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Rating</div>
                  <div className="text-2xl font-bold text-slate-900">⭐ {selectedShow.vote_average}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Weekly Views</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {(selectedShow.weekly_views / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Monthly Views</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {(selectedShow.monthly_views / 1000000).toFixed(0)}M
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Growth Rate</div>
                  <div className="text-2xl font-bold text-green-600">+{selectedShow.view_growth}%</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Audience Retention</div>
                  <div className="text-2xl font-bold text-slate-900">{selectedShow.audience_retention}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetflixTrending;
