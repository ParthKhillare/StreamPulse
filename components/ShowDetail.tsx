import React, { useState, useEffect } from 'react';
import { MockShow } from '../services/mockDataService';
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  Star,
  Calendar,
  TrendingUp,
  Eye,
  Award,
  Play,
  Users,
  Clock,
  ThumbsUp,
  Film,
  Tv
} from 'lucide-react';

interface ShowDetailProps {
  showId: number;
  onBack: () => void;
}

const ShowDetail: React.FC<ShowDetailProps> = ({ showId, onBack }) => {
  const [show, setShow] = useState<MockShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'ratings'>('overview');

  useEffect(() => {
    const showData = mockService.getShowById(showId);
    setShow(showData);
    setLoading(false);
  }, [showId]);

  // Mock historical data for line chart
  const getHistoricalData = () => {
    if (!show) return [];
    
    const data = [];
    const now = new Date();
    
    // Generate 12 weeks of historical data
    for (let i = 11; i >= 0; i--) {
      const weekDate = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
      const weekStr = `Week ${12 - i}`;
      const baseViews = show.weekly_views * 0.7; // Start from 70% of current
      const variation = (Math.random() - 0.5) * show.weekly_views * 0.4;
      const views = Math.max(0, baseViews + variation);
      
      data.push({
        week: weekStr,
        views: Math.floor(views),
        rank: Math.floor(Math.random() * 5) + 1
      });
    }
    
    return data;
  };

  // Mock genre distribution data
  const getGenreData = () => {
    if (!show) return [];
    
    const genres = show.genre.split(', ');
    return genres.map((genre, index) => ({
      name: genre.trim(),
      value: Math.floor(Math.random() * 30 + 20), // 20-50%
      color: ['#dc2626', '#3b82f6', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][index]
    }));
  };

  // Mock rating comparison data
  const getRatingComparison = () => {
    if (!show) return [];
    
    return [
      { name: 'IMDB', rating: show.imdb_rating, max: 10 },
      { name: 'Netflix', rating: show.netflix_rating, max: 10 },
      { name: 'Audience', rating: show.audience_score / 10, max: 10 },
      { name: 'Critics', rating: show.critic_score / 10, max: 10 }
    ];
  };

  // Mock weekly performance data
  const getWeeklyPerformance = () => {
    if (!show) return [];
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      views: Math.floor(show.weekly_views / 7 * (0.8 + Math.random() * 0.4)),
      engagement: Math.floor(70 + Math.random() * 25)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading show details...</p>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">Show not found</p>
          <button 
            onClick={onBack}
            className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const historicalData = getHistoricalData();
  const genreData = getGenreData();
  const ratingData = getRatingComparison();
  const weeklyPerformance = getWeeklyPerformance();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Shows
            </button>
          </div>
          
          <div className="flex items-start gap-6">
            {/* Show Poster/Icon */}
            <div className="flex-shrink-0">
              <div className="w-32 h-48 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                {show.type === 'tv' ? (
                  <Tv className="w-16 h-16 text-white" />
                ) : (
                  <Film className="w-16 h-16 text-white" />
                )}
              </div>
            </div>

            {/* Show Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{show.title}</h1>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    show.type === 'tv' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <span className="text-sm text-gray-400">
                    {show.type === 'tv' ? 'TV Series' : 'Movie'}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg mb-4 max-w-3xl">
                {show.overview}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-400">Weekly Views</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {(show.weekly_views / 1000000).toFixed(1)}M
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-400">Monthly Views</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {(show.monthly_views / 1000000).toFixed(1)}M
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-400">Peak Views</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {(show.peak_views / 1000000).toFixed(1)}M
                  </p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-400">Trending Weeks</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    {show.trending_weeks}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-8 py-4">
        <div className="flex gap-4 border-b border-gray-800">
          {[
            { id: 'overview', label: 'Overview', icon: Play },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'ratings', label: 'Ratings', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4 inline mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 py-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Rankings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Weekly Rank</span>
                    <span className="text-2xl font-bold text-red-500">#{show.weekly_rank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Monthly Rank</span>
                    <span className="text-2xl font-bold text-red-500">#{show.monthly_rank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Yearly Rank</span>
                    <span className="text-2xl font-bold text-red-500">#{show.yearly_rank}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Ratings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">IMDB Rating</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-xl font-bold text-white">{show.imdb_rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Netflix Rating</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-red-500 fill-current" />
                      <span className="text-xl font-bold text-white">{show.netflix_rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Audience Score</span>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-500" />
                      <span className="text-xl font-bold text-white">{show.audience_score}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Audience
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Critic Score</span>
                    <span className="text-xl font-bold text-white">{show.critic_score}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Release Year</span>
                    <span className="text-xl font-bold text-white">{show.release_year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Genre</span>
                    <span className="text-sm font-medium text-gray-300">{show.genre}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Genre Distribution Pie Chart */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Genre Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-8">
            {/* Historical Trend Line Chart */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                Historical Performance (12 Weeks)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9CA3AF" />
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
                    name="Weekly Views"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weekly Performance Bar Chart */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Weekly Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    itemStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Bar dataKey="views" fill="#EF4444" name="Daily Views" />
                  <Bar dataKey="engagement" fill="#3B82F6" name="Engagement %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="space-y-8">
            {/* Rating Comparison Bar Chart */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Rating Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ratingData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" domain={[0, 10]} stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                    labelStyle={{ color: '#F3F4F6' }}
                    itemStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                  <Bar dataKey="rating" fill="#EF4444" name="Rating Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Rating Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Rating Breakdown</h4>
                <div className="space-y-4">
                  {ratingData.map((rating) => (
                    <div key={rating.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{rating.name}</span>
                        <span className="text-lg font-bold text-white">{rating.rating.toFixed(1)}/10</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-red-600 to-red-400"
                          style={{ width: `${(rating.rating / rating.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Rating Insights</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">
                      <span className="font-medium text-white">IMDB Performance:</span> This show ranks in the top {show.imdb_rating >= 8.5 ? '5%' : '15%'} of all {show.type === 'tv' ? 'TV series' : 'movies'} on IMDB.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">
                      <span className="font-medium text-white">Audience Reception:</span> {show.audience_score >= 85 ? 'Excellent' : show.audience_score >= 75 ? 'Good' : 'Average'} audience response with {show.audience_score}% approval.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2">
                      <span className="font-medium text-white">Critical Acclaim:</span> Critics rate this show {show.critic_score >= 85 ? 'very favorably' : show.critic_score >= 75 ? 'favorably' : 'moderately'} with {show.critic_score}% score.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetail;
