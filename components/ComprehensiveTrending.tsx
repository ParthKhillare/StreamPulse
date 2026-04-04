import React, { useState, useEffect } from 'react';
import { MockShow } from '../services/mockDataService';
import { mockService } from '../services/mockService';
import ShowDetail from './ShowDetail';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Eye, 
  Star,
  Play,
  Tv,
  Film,
  ChevronRight,
  Filter
} from 'lucide-react';

const ComprehensiveTrending: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'tv' | 'movie'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly' | 'popular'>('weekly');
  const [shows, setShows] = useState<MockShow[]>([]);
  const [selectedShow, setSelectedShow] = useState<MockShow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShows();
  }, [selectedType, selectedPeriod]);

  const loadShows = () => {
    setLoading(true);
    let data: MockShow[] = [];
    
    switch (selectedPeriod) {
      case 'weekly':
        data = mockService.getWeeklyTrending(selectedType === 'all' ? undefined : selectedType);
        break;
      case 'monthly':
        data = mockService.getMonthlyTrending(selectedType === 'all' ? undefined : selectedType);
        break;
      case 'yearly':
        data = mockService.getYearlyTrending(selectedType === 'all' ? undefined : selectedType);
        break;
      case 'popular':
        data = mockService.getMostPopular(selectedType === 'all' ? undefined : selectedType);
        break;
    }
    
    setShows(data);
    setLoading(false);
  };

  const handleShowClick = (show: MockShow) => {
    setSelectedShow(show);
  };

  const handleBack = () => {
    setSelectedShow(null);
  };

  // Get genre distribution for pie chart
  const getGenreDistribution = () => {
    const genreMap = new Map<string, number>();
    
    shows.forEach(show => {
      const genres = show.genre.split(', ');
      genres.forEach(genre => {
        const trimmedGenre = genre.trim();
        genreMap.set(trimmedGenre, (genreMap.get(trimmedGenre) || 0) + 1);
      });
    });
    
    return Array.from(genreMap.entries()).map(([genre, count]) => ({
      name: genre,
      value: count,
      color: ['#dc2626', '#3b82f6', '#059669', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 9)]
    }));
  };

  // Get rating distribution
  const getRatingDistribution = () => {
    const ranges = [
      { range: '9.0-10.0', count: 0, color: '#10b981' },
      { range: '8.0-8.9', count: 0, color: '#3b82f6' },
      { range: '7.0-7.9', count: 0, color: '#f59e0b' },
      { range: '6.0-6.9', count: 0, color: '#ef4444' },
      { range: 'Below 6.0', count: 0, color: '#6b7280' }
    ];
    
    shows.forEach(show => {
      const rating = show.imdb_rating;
      if (rating >= 9.0) ranges[0].count++;
      else if (rating >= 8.0) ranges[1].count++;
      else if (rating >= 7.0) ranges[2].count++;
      else if (rating >= 6.0) ranges[3].count++;
      else ranges[4].count++;
    });
    
    return ranges;
  };

  if (selectedShow) {
    return <ShowDetail showId={selectedShow.id} onBack={handleBack} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading trending shows...</p>
        </div>
      </div>
    );
  }

  const genreDistribution = getGenreDistribution();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-black via-black/90 to-transparent">
        <div className="px-8 py-6">
          <h1 className="text-4xl font-bold mb-2">Netflix Trending Shows</h1>
          <p className="text-gray-400 text-lg">Comprehensive analytics for TV series and movies with IMDB ratings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Type Filter */}
          <div className="flex gap-2">
            <span className="text-gray-400">Type:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'tv', label: 'TV Shows' },
              { id: 'movie', label: 'Movies' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedType === type.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Period Filter */}
          <div className="flex gap-2">
            <span className="text-gray-400">Period:</span>
            {[
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'yearly', label: 'Yearly' },
              { id: 'popular', label: 'Most Popular' }
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span>{shows.length} shows</span>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Genre Distribution */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-500" />
              Genre Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {genreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#F3F4F6' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Rating Distribution */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              IMDB Rating Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#F3F4F6' }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Legend />
                <Bar dataKey="count" fill="#EF4444" name="Number of Shows" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Shows Grid */}
      <div className="px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              onClick={() => handleShowClick(show)}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all cursor-pointer group"
            >
              {/* Show Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    show.type === 'tv' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {show.type === 'tv' ? (
                      <Tv className="w-5 h-5 text-white" />
                    ) : (
                      <Film className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {show.title}
                    </h3>
                    <p className="text-sm text-gray-400">{show.release_year}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-500">#{show.weekly_rank}</div>
                  <p className="text-xs text-gray-400">Rank</p>
                </div>
              </div>

              {/* Show Description */}
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {show.overview}
              </p>

              {/* Show Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">IMDB Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-white">{show.imdb_rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Netflix Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-red-500 fill-current" />
                    <span className="font-bold text-white">{show.netflix_rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Weekly Views</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-white">
                      {(show.weekly_views / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Genre</span>
                  <span className="text-sm font-medium text-gray-300">{show.genre}</span>
                </div>
              </div>

              {/* View Details */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-400">Monthly</p>
                    <p className="font-bold text-white">
                      {(show.monthly_views / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Yearly</p>
                    <p className="font-bold text-white">
                      {(show.yearly_views / 1000000).toFixed(0)}M
                    </p>
                  </div>
                </div>
              </div>

              {/* Click Indicator */}
              <div className="flex items-center justify-center mt-4 text-gray-400 group-hover:text-red-400 transition-colors">
                <span className="text-sm">Click for details</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveTrending;
