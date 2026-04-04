import { LiveBenchmarks } from "../types";
import { MockDataService, MockShow } from "./mockDataService";

export interface NetflixData {
  trendingShows: MockShow[];
  lastUpdated: string;
}

export class MockService {
  constructor() {
    // MockService initialized
  }

  // Get weekly trending shows from mock data
  getWeeklyTrending(type?: 'tv' | 'movie'): MockShow[] {
    return MockDataService.getWeeklyTrending(type);
  }

  // Get monthly trending shows from mock data
  getMonthlyTrending(type?: 'tv' | 'movie'): MockShow[] {
    return MockDataService.getMonthlyTrending(type);
  }

  // Get yearly trending shows from mock data
  getYearlyTrending(type?: 'tv' | 'movie'): MockShow[] {
    return MockDataService.getYearlyTrending(type);
  }

  // Get most popular shows from mock data
  getMostPopular(type?: 'tv' | 'movie'): MockShow[] {
    return MockDataService.getMostPopular(type);
  }

  // Get all trending shows (backward compatibility)
  getTrendingShows(): MockShow[] {
    return MockDataService.getWeeklyTrending();
  }

  // Get live data
  getLiveTrendingData() {
    return {
      weeklyTrending: MockDataService.getWeeklyTrending(),
      monthlyTrending: MockDataService.getMonthlyTrending(),
      yearlyTrending: MockDataService.getYearlyTrending(),
      mostPopular: MockDataService.getMostPopular(),
      genreBreakdown: MockDataService.getGenreBreakdown(),
      totalShows: MockDataService.getTVShows().length + MockDataService.getMovies().length,
      topShow: MockDataService.getWeeklyTrending()[0],
      lastUpdated: new Date().toISOString()
    };
  }

  // Get complete Netflix data from mock service
  fetchNetflixData(): NetflixData {
    const trendingShows = MockDataService.getWeeklyTrending();
    
    return {
      trendingShows,
      lastUpdated: new Date().toISOString()
    };
  }

  // Netflix financial benchmarks
  fetchLiveNetflixBenchmarks(): LiveBenchmarks | null {
    return {
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
  }

  // Get show by ID
  getShowById(id: number): MockShow | null {
    return MockDataService.getShowById(id);
  }

  // Refresh data (mock implementation)
  refreshData(): NetflixData {
    return this.fetchNetflixData();
  }
}

export const mockService = new MockService();
