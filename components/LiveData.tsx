import React, { useState, useEffect } from 'react';
import { mockService } from '../services/mockService';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Eye, Users, Calendar, Star, BarChart3, Globe, Zap, Trophy } from 'lucide-react';

interface GenreData {
  genre: string;
  totalViews: number;
}

interface ShowData {
  title: string;
  weekly_views: number;
  imdb_rating: number;
}

const LiveData: React.FC = () => {
  const [liveData, setLiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = mockService.getLiveTrendingData();
    
    setLiveData(data);
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

  if (!liveData) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Loading Live Data...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-black via-black to-transparent">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3 text-white">
            <TrendingUp className="w-6 h-6 text-red-500 mr-2" />
            <div>
              <h1 className="text-4xl font-bold">Live Trending Data</h1>
              <p className="text-gray-400 text-lg mt-2">Real-time Netflix analytics and insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats Overview */}
      <div className="px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Shows */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-bold text-white">Total Shows</h3>
                <p className="text-gray-400 text-sm">Complete library</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{liveData.totalShows}</div>
              <p className="text-gray-400 text-xs mt-1">TV + Movies</p>
            </div>
          </div>

          {/* Top Show */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-lg font-bold text-white">Top Show</h3>
                <p className="text-gray-400 text-sm">Currently trending</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{liveData.topShow?.title}</div>
              <p className="text-gray-400 text-xs mt-1">#{liveData.topShow?.weekly_rank}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-yellow-500 font-bold">{liveData.topShow?.imdb_rating}</span>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-bold text-white">Total Views</h3>
                <p className="text-gray-400 text-sm">All shows combined</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {(liveData.weeklyTrending?.reduce((sum: number, show: ShowData) => sum + show.weekly_views, 0) / 1000000).toFixed(0)}M
              </div>
              <p className="text-gray-400 text-xs mt-1">Weekly views</p>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-bold text-white">Avg Rating</h3>
                <p className="text-gray-400 text-sm">IMDB average</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {((liveData.weeklyTrending?.reduce((sum: number, show: ShowData) => sum + show.imdb_rating, 0) / liveData.weeklyTrending?.length || 0) || 0).toFixed(1)}
              </div>
              <p className="text-gray-400 text-xs mt-1">IMDB score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Distribution */}
      <div className="px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              Genre Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={liveData.genreBreakdown?.map((genre: GenreData, index: number) => ({
                    name: genre.genre,
                    value: genre.totalViews,
                    color: COLORS[index % COLORS.length]
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {liveData.genreBreakdown?.map((genre: GenreData, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top 5 Shows */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Top 5 Shows This Week
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={liveData.weeklyTrending?.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="title" tick={{fill: '#9ca3af', fontSize: 11}} />
                <YAxis tick={{fill: '#9ca3af', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#1f293b', color: '#fff' }}
                />
                <Bar dataKey="weekly_views" fill="#dc2626" radius={[8, 4, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="px-8 py-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {new Date(liveData.lastUpdated).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;
