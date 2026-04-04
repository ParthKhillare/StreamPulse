export interface MockShow {
  id: number;
  title: string;
  type: 'tv' | 'movie';
  overview: string;
  poster_path: string;
  imdb_rating: number;
  netflix_rating: number;
  weekly_views: number;
  monthly_views: number;
  yearly_views: number;
  weekly_rank: number;
  monthly_rank: number;
  yearly_rank: number;
  genre: string;
  release_year: number;
  trending_weeks: number;
  peak_views: number;
  audience_score: number;
  critic_score: number;
}

export interface TrendingData {
  weekly: MockShow[];
  monthly: MockShow[];
  yearly: MockShow[];
  most_popular: MockShow[];
}

// Mock TV Shows Data (20 trending shows)
const mockTVShows: MockShow[] = [
  {
    id: 1,
    title: "Stranger Things",
    type: 'tv',
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    poster_path: "",
    imdb_rating: 8.7,
    netflix_rating: 8.5,
    weekly_views: 45000000,
    monthly_views: 180000000,
    yearly_views: 2200000000,
    weekly_rank: 1,
    monthly_rank: 1,
    yearly_rank: 1,
    genre: "Sci-Fi, Horror, Drama",
    release_year: 2016,
    trending_weeks: 28,
    peak_views: 52000000,
    audience_score: 92,
    critic_score: 88
  },
  {
    id: 2,
    title: "The Crown",
    type: 'tv',
    overview: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
    poster_path: "",
    imdb_rating: 8.6,
    netflix_rating: 8.4,
    weekly_views: 38000000,
    monthly_views: 152000000,
    yearly_views: 1850000000,
    weekly_rank: 2,
    monthly_rank: 2,
    yearly_rank: 2,
    genre: "Drama, History",
    release_year: 2016,
    trending_weeks: 24,
    peak_views: 41000000,
    audience_score: 89,
    critic_score: 91
  },
  {
    id: 3,
    title: "Bridgerton",
    type: 'tv',
    overview: "Wealthy young nobles must find a husband or wife in Season 3 of this series based on Julia Quinn's best-selling novels.",
    poster_path: "",
    imdb_rating: 7.9,
    netflix_rating: 8.1,
    weekly_views: 35000000,
    monthly_views: 140000000,
    yearly_views: 1700000000,
    weekly_rank: 3,
    monthly_rank: 3,
    yearly_rank: 3,
    genre: "Drama, Romance",
    release_year: 2020,
    trending_weeks: 22,
    peak_views: 38000000,
    audience_score: 87,
    critic_score: 85
  },
  {
    id: 4,
    title: "Squid Game",
    type: 'tv',
    overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes.",
    poster_path: "",
    imdb_rating: 8.0,
    netflix_rating: 8.2,
    weekly_views: 32000000,
    monthly_views: 128000000,
    yearly_views: 1550000000,
    weekly_rank: 4,
    monthly_rank: 4,
    yearly_rank: 4,
    genre: "Thriller, Drama",
    release_year: 2021,
    trending_weeks: 20,
    peak_views: 45000000,
    audience_score: 94,
    critic_score: 89
  },
  {
    id: 5,
    title: "The Witcher",
    type: 'tv',
    overview: "Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    poster_path: "",
    imdb_rating: 8.2,
    netflix_rating: 7.9,
    weekly_views: 30000000,
    monthly_views: 120000000,
    yearly_views: 1450000000,
    weekly_rank: 5,
    monthly_rank: 5,
    yearly_rank: 5,
    genre: "Fantasy, Adventure",
    release_year: 2019,
    trending_weeks: 18,
    peak_views: 35000000,
    audience_score: 86,
    critic_score: 83
  },
  {
    id: 6,
    title: "Wednesday",
    type: 'tv',
    overview: "Wednesday Addams tries to master her emerging psychic ability, thwart a killing spree and solve the mystery that connected her parents.",
    poster_path: "",
    imdb_rating: 8.1,
    netflix_rating: 8.3,
    weekly_views: 28000000,
    monthly_views: 112000000,
    yearly_views: 1350000000,
    weekly_rank: 6,
    monthly_rank: 6,
    yearly_rank: 6,
    genre: "Comedy, Horror, Mystery",
    release_year: 2022,
    trending_weeks: 16,
    peak_views: 32000000,
    audience_score: 88,
    critic_score: 84
  },
  {
    id: 7,
    title: "Money Heist",
    type: 'tv',
    overview: "An unusual group of robbers assault the Factory of Moneda and Timbre to carry out the most perfect robbery in Spanish history.",
    poster_path: "",
    imdb_rating: 8.2,
    netflix_rating: 8.0,
    weekly_views: 26000000,
    monthly_views: 104000000,
    yearly_views: 1250000000,
    weekly_rank: 7,
    monthly_rank: 7,
    yearly_rank: 7,
    genre: "Crime, Thriller",
    release_year: 2017,
    trending_weeks: 15,
    peak_views: 30000000,
    audience_score: 91,
    critic_score: 87
  },
  {
    id: 8,
    title: "Ozark",
    type: 'tv',
    overview: "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",
    poster_path: "",
    imdb_rating: 8.4,
    netflix_rating: 8.1,
    weekly_views: 24000000,
    monthly_views: 96000000,
    yearly_views: 1150000000,
    weekly_rank: 8,
    monthly_rank: 8,
    yearly_rank: 8,
    genre: "Crime, Drama, Thriller",
    release_year: 2017,
    trending_weeks: 14,
    peak_views: 28000000,
    audience_score: 85,
    critic_score: 86
  },
  {
    id: 9,
    title: "The Night Agent",
    type: 'tv',
    overview: "A low-level FBI agent works in the White House basement and is thrust into a dangerous conspiracy when a caller warns of a plot to overthrow the government.",
    poster_path: "",
    imdb_rating: 7.5,
    netflix_rating: 7.8,
    weekly_views: 22000000,
    monthly_views: 88000000,
    yearly_views: 1050000000,
    weekly_rank: 9,
    monthly_rank: 9,
    yearly_rank: 9,
    genre: "Action, Thriller",
    release_year: 2023,
    trending_weeks: 12,
    peak_views: 25000000,
    audience_score: 83,
    critic_score: 82
  },
  {
    id: 10,
    title: "One Piece",
    type: 'tv',
    overview: "The series follows Monkey D. Luffy, a young pirate who sets out to find the legendary treasure 'One Piece' and become the King of the Pirates.",
    poster_path: "",
    imdb_rating: 8.5,
    netflix_rating: 8.7,
    weekly_views: 20000000,
    monthly_views: 80000000,
    yearly_views: 950000000,
    weekly_rank: 10,
    monthly_rank: 10,
    yearly_rank: 10,
    genre: "Action, Adventure, Fantasy",
    release_year: 2023,
    trending_weeks: 10,
    peak_views: 23000000,
    audience_score: 89,
    critic_score: 85
  }
];

// Mock Movies Data (20 trending movies)
const mockMovies: MockShow[] = [
  {
    id: 11,
    title: "Glass Onion: A Knives Out Mystery",
    type: 'movie',
    overview: "Detective Benoit Blanc travels to Greece to peel back the layers of a mystery involving a wealthy cast of characters on a private island.",
    poster_path: "",
    imdb_rating: 7.8,
    netflix_rating: 7.9,
    weekly_views: 42000000,
    monthly_views: 168000000,
    yearly_views: 2000000000,
    weekly_rank: 1,
    monthly_rank: 1,
    yearly_rank: 1,
    genre: "Comedy, Crime, Drama",
    release_year: 2022,
    trending_weeks: 8,
    peak_views: 48000000,
    audience_score: 91,
    critic_score: 88
  },
  {
    id: 12,
    title: "The Gray Man",
    type: 'movie',
    overview: "When the CIA's top asset uncovers dark agency secrets, he becomes a primary target and is hunted around the world by his former colleagues.",
    poster_path: "",
    imdb_rating: 6.5,
    netflix_rating: 7.2,
    weekly_views: 38000000,
    monthly_views: 152000000,
    yearly_views: 1800000000,
    weekly_rank: 2,
    monthly_rank: 2,
    yearly_rank: 2,
    genre: "Action, Thriller",
    release_year: 2022,
    trending_weeks: 7,
    peak_views: 42000000,
    audience_score: 79,
    critic_score: 75
  },
  {
    id: 13,
    title: "Red Notice",
    type: 'movie',
    overview: "In the world of international crime, an Interpol agent attempts to hunt down and capture the world's most wanted art thief.",
    poster_path: "",
    imdb_rating: 6.3,
    netflix_rating: 7.1,
    weekly_views: 35000000,
    monthly_views: 140000000,
    yearly_views: 1650000000,
    weekly_rank: 3,
    monthly_rank: 3,
    yearly_rank: 3,
    genre: "Action, Comedy",
    release_year: 2021,
    trending_weeks: 6,
    peak_views: 40000000,
    audience_score: 78,
    critic_score: 72
  },
  {
    id: 14,
    title: "Don't Look Up",
    type: 'movie',
    overview: "Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.",
    poster_path: "",
    imdb_rating: 6.2,
    netflix_rating: 7.3,
    weekly_views: 32000000,
    monthly_views: 128000000,
    yearly_views: 1500000000,
    weekly_rank: 4,
    monthly_rank: 4,
    yearly_rank: 4,
    genre: "Comedy, Sci-Fi",
    release_year: 2021,
    trending_weeks: 5,
    peak_views: 38000000,
    audience_score: 82,
    critic_score: 74
  },
  {
    id: 15,
    title: "Extraction 2",
    type: 'movie',
    overview: "Tyler Rake is back, and this time he's not just saving a life - he's saving the world from a terrorist threat.",
    poster_path: "",
    imdb_rating: 7.1,
    netflix_rating: 7.6,
    weekly_views: 30000000,
    monthly_views: 120000000,
    yearly_views: 1400000000,
    weekly_rank: 5,
    monthly_rank: 5,
    yearly_rank: 5,
    genre: "Action, Thriller",
    release_year: 2023,
    trending_weeks: 4,
    peak_views: 35000000,
    audience_score: 84,
    critic_score: 78
  },
  {
    id: 16,
    title: "The Adam Project",
    type: 'movie',
    overview: "A time-traveling pilot teams up with his younger self and his late father to come to terms with his past.",
    poster_path: "",
    imdb_rating: 6.8,
    netflix_rating: 7.4,
    weekly_views: 28000000,
    monthly_views: 112000000,
    yearly_views: 1300000000,
    weekly_rank: 6,
    monthly_rank: 6,
    yearly_rank: 6,
    genre: "Sci-Fi, Action, Adventure",
    release_year: 2022,
    trending_weeks: 3,
    peak_views: 32000000,
    audience_score: 81,
    critic_score: 76
  },
  {
    id: 17,
    title: "Bird Box",
    type: 'movie',
    overview: "Five years after an ominous unseen presence drives most of society to suicide, a survivor and her two children embark on a dangerous journey.",
    poster_path: "",
    imdb_rating: 6.6,
    netflix_rating: 7.0,
    weekly_views: 26000000,
    monthly_views: 104000000,
    yearly_views: 1200000000,
    weekly_rank: 7,
    monthly_rank: 7,
    yearly_rank: 7,
    genre: "Horror, Thriller",
    release_year: 2018,
    trending_weeks: 2,
    peak_views: 30000000,
    audience_score: 77,
    critic_score: 71
  },
  {
    id: 18,
    title: "6 Underground",
    type: 'movie',
    overview: "Six strangers find themselves in a maze of deadly mystery rooms and must use their wits to survive.",
    poster_path: "",
    imdb_rating: 6.4,
    netflix_rating: 6.9,
    weekly_views: 24000000,
    monthly_views: 96000000,
    yearly_views: 1100000000,
    weekly_rank: 8,
    monthly_rank: 8,
    yearly_rank: 8,
    genre: "Horror, Thriller",
    release_year: 2019,
    trending_weeks: 1,
    peak_views: 28000000,
    audience_score: 75,
    critic_score: 70
  },
  {
    id: 19,
    title: "The Irishman",
    type: 'movie',
    overview: "An aging hitman recalls his time working for the mob and the relationships he formed with a union leader and his family.",
    poster_path: "",
    imdb_rating: 7.9,
    netflix_rating: 8.1,
    weekly_views: 22000000,
    monthly_views: 88000000,
    yearly_views: 1000000000,
    weekly_rank: 9,
    monthly_rank: 9,
    yearly_rank: 9,
    genre: "Crime, Drama",
    release_year: 2019,
    trending_weeks: 1,
    peak_views: 25000000,
    audience_score: 88,
    critic_score: 89
  },
  {
    id: 20,
    title: "Marriage Story",
    type: 'movie',
    overview: "A stage director and his actress wife struggle through a grueling, coast-to-coast divorce that pushes them to their personal extremes.",
    poster_path: "",
    imdb_rating: 7.9,
    netflix_rating: 8.0,
    weekly_views: 20000000,
    monthly_views: 80000000,
    yearly_views: 900000000,
    weekly_rank: 10,
    monthly_rank: 10,
    yearly_rank: 10,
    genre: "Drama, Romance",
    release_year: 2019,
    trending_weeks: 1,
    peak_views: 23000000,
    audience_score: 86,
    critic_score: 87
  }
];

export class MockDataService {
  // Get weekly trending shows (top 10)
  static getWeeklyTrending(type?: 'tv' | 'movie'): MockShow[] {
    const allShows = [...mockTVShows, ...mockMovies];
    const filtered = type ? allShows.filter(show => show.type === type) : allShows;
    return filtered
      .sort((a, b) => b.weekly_views - a.weekly_views)
      .slice(0, 10)
      .map((show, index) => ({ ...show, weekly_rank: index + 1 }));
  }

  // Get monthly trending shows (top 10)
  static getMonthlyTrending(type?: 'tv' | 'movie'): MockShow[] {
    const allShows = [...mockTVShows, ...mockMovies];
    const filtered = type ? allShows.filter(show => show.type === type) : allShows;
    return filtered
      .sort((a, b) => b.monthly_views - a.monthly_views)
      .slice(0, 10)
      .map((show, index) => ({ ...show, monthly_rank: index + 1 }));
  }

  // Get yearly trending shows (top 10)
  static getYearlyTrending(type?: 'tv' | 'movie'): MockShow[] {
    const allShows = [...mockTVShows, ...mockMovies];
    const filtered = type ? allShows.filter(show => show.type === type) : allShows;
    return filtered
      .sort((a, b) => b.yearly_views - a.yearly_views)
      .slice(0, 10)
      .map((show, index) => ({ ...show, yearly_rank: index + 1 }));
  }

  // Get most popular shows (all-time top 10)
  static getMostPopular(type?: 'tv' | 'movie'): MockShow[] {
    const allShows = [...mockTVShows, ...mockMovies];
    const filtered = type ? allShows.filter(show => show.type === type) : allShows;
    return filtered
      .sort((a, b) => b.audience_score - a.audience_score)
      .slice(0, 10)
      .map((show, index) => ({ ...show, yearly_rank: index + 1 }));
  }

  // Get all trending data
  static getAllTrendingData(): TrendingData {
    return {
      weekly: this.getWeeklyTrending(),
      monthly: this.getMonthlyTrending(),
      yearly: this.getYearlyTrending(),
      most_popular: this.getMostPopular()
    };
  }

  // Get TV shows only
  static getTVShows(): MockShow[] {
    return mockTVShows;
  }

  // Get movies only
  static getMovies(): MockShow[] {
    return mockMovies;
  }

  // Get show by ID
  static getShowById(id: number): MockShow | null {
    const allShows = [...mockTVShows, ...mockMovies];
    return allShows.find(show => show.id === id) || null;
  }

  // Get genre breakdown
  static getGenreBreakdown(): { genre: string; count: number; totalViews: number }[] {
    const allShows = [...mockTVShows, ...mockMovies];
    const genreMap = new Map<string, { count: number; totalViews: number }>();
    
    allShows.forEach(show => {
      const genres = show.genre.split(', ');
      genres.forEach(genre => {
        if (!genreMap.has(genre)) {
          genreMap.set(genre, { count: 0, totalViews: 0 });
        }
        const current = genreMap.get(genre)!;
        current.count++;
        current.totalViews += show.yearly_views;
      });
    });
    
    return Array.from(genreMap.entries()).map(([genre, data]) => ({
      genre,
      count: data.count,
      totalViews: data.totalViews
    }));
  }

  // Get rating distribution
  static getRatingDistribution(): { rating: string; count: number }[] {
    const allShows = [...mockTVShows, ...mockMovies];
    const ratingRanges = [
      { rating: '9.0-10.0', count: 0 },
      { rating: '8.0-8.9', count: 0 },
      { rating: '7.0-7.9', count: 0 },
      { rating: '6.0-6.9', count: 0 },
      { rating: 'Below 6.0', count: 0 }
    ];
    
    allShows.forEach(show => {
      const rating = show.imdb_rating;
      if (rating >= 9.0) ratingRanges[0].count++;
      else if (rating >= 8.0) ratingRanges[1].count++;
      else if (rating >= 7.0) ratingRanges[2].count++;
      else if (rating >= 6.0) ratingRanges[3].count++;
      else ratingRanges[4].count++;
    });
    
    return ratingRanges;
  }
}
