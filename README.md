# StreamPulse Analytics: Netflix-Style Data Dashboard

![StreamPulse Banner](https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1200&h=400)

StreamPulse is a professional Netflix-style analytics dashboard demonstrating expertise in **React development**, **data visualization**, and **modern frontend architecture**. It simulates a real-world video streaming analytics platform with comprehensive metrics, interactive charts, and responsive design.

## 🚀 Key Features

- **Netflix-Style Dashboard**: Professional UI with dark theme and red accents
- **Live Data Analytics**: Real-time metrics with 40 shows database
- **Multi-Currency Support**: USD, INR, EUR, GBP with dynamic formatting
- **Interactive Charts**: Line charts, pie charts, bar charts using Recharts
- **Show Detail Pages**: Individual analytics with ratings, trends, and revenue
- **Genre Distribution**: Visual breakdown of content categories
- **Trending Analysis**: Weekly, monthly, yearly performance metrics
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## � Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Data Visualization**: Recharts (Line, Pie, Bar charts)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Netflix-inspired design

## 📊 Features Overview

### 📈 Dashboard
- Financial metrics (Revenue, Subscribers, ARM, Churn)
- Currency switching with real-time conversion
- Historical performance trends
- Seasonality heatmaps

### 🎬 Live Trending Data
- Total shows and top performers
- Genre distribution pie chart
- Top 5 shows bar chart
- Real-time data updates

### 📺 Trending Shows
- Weekly rankings with 40 shows
- IMDB ratings integration
- View counts and engagement metrics
- Filter by TV shows or movies

### 📊 Comprehensive Library
- All shows & movies database
- Filter by type (TV/Movie) and period
- Genre and rating analysis
- Search and sort functionality

### 📈 Trending Analysis
- Monthly competitive analysis
- Year-over-year comparisons
- Performance trends and insights
- Historical data visualization

### 🎯 Show Details
- Individual show analytics
- Rating achievement timeline
- Revenue and profit analysis
- Historical performance charts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd StreamPulse

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
# Start development server (http://localhost:3001)
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📂 Project Structure

```text
├── components/          # React Components
│   ├── Dashboard.tsx    # Main financial dashboard
│   ├── LiveData.tsx     # Real-time analytics
│   ├── NetflixTrending.tsx
│   ├── ComprehensiveTrending.tsx
│   ├── NetflixTrendingAnalysis.tsx
│   └── ShowDetail.tsx   # Individual show analytics
├── services/            # Data Services
│   ├── mockService.ts   # Mock data service
│   └── mockDataService.ts
├── types.ts             # TypeScript interfaces
├── constants.tsx        # Mock data and constants
├── App.tsx              # Main application
└── vite.config.ts       # Build configuration
```

## 📊 Data Model

The application uses a comprehensive mock data structure:

```typescript
interface MockShow {
  id: number;
  title: string;
  type: 'tv' | 'movie';
  genre: string;
  imdb_rating: number;
  weekly_views: number;
  monthly_views: number;
  yearly_views: number;
  weekly_rank: number;
  monthly_rank: number;
  yearly_rank: number;
  description: string;
  release_year: number;
  seasons?: number;
  episodes?: number;
}
```

## 🎨 Design System

- **Colors**: Netflix-inspired dark theme with red accents
- **Typography**: Clean, modern sans-serif fonts
- **Components**: Consistent card-based layouts
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 📱 Responsive Design

- **Desktop**: Full-featured dashboard with all charts
- **Tablet**: Optimized layout with touch interactions
- **Mobile**: Simplified interface with essential metrics

## 🚀 Deployment

The application is optimized for production deployment:

- **Build Optimization**: Terser minification with console removal
- **Code Splitting**: Separate chunks for vendor, charts, and icons
- **Asset Optimization**: Compressed CSS and JavaScript
- **Environment Ready**: Production-ready configuration

### Deployment Options

```bash
# Build for production
npm run build

# Deploy to any static hosting service
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3 + CloudFront
```

## 🎯 Key Demonstrations

This project showcases expertise in:

- **React Development**: Modern hooks, TypeScript, component architecture
- **Data Visualization**: Complex charts with Recharts library
- **UI/UX Design**: Professional Netflix-style interface
- **State Management**: Efficient data flow and component communication
- **Performance**: Optimized builds and responsive design
- **TypeScript**: Strong typing and interface design

## 📊 Sample Metrics

- **40 Shows**: Complete database with TV shows and movies
- **4 Currencies**: USD, INR, EUR, GBP support
- **Multiple Views**: Weekly, monthly, yearly analytics
- **Real-time Updates**: Live data simulation
- **Interactive Charts**: 5+ chart types with interactions

## 🎉 Conclusion

StreamPulse Analytics demonstrates professional frontend development skills through a comprehensive Netflix-style dashboard. It showcases modern React development, data visualization expertise, and attention to user experience design.

Perfect for demonstrating:
- React and TypeScript proficiency
- Data visualization skills
- UI/UX design capabilities
- Component architecture
- Performance optimization
- Production deployment readiness

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
```

## ⚙️ Setup & Deployment

1. **Clone the Repo**
   ```bash
   git clone https://github.com/your-username/streampulse-analytics.git
   cd streampulse-analytics
   ```

2. **Environment Variables**
   Ensure your environment has access to a Gemini API Key. The application expects `process.env.API_KEY`.

3. **Running Locally**
   Since this project uses ESM importmaps, you don't need a complex build step. Use any local static server:
   ```bash
   npx serve .
   ```

## 📈 Engineering Highlights

### Revenue Attribution Model
The platform demonstrates a "Watch-Time Weighted" revenue attribution model where subscription MRR is distributed to content titles based on their share of total global engagement within a billing window.

### Data Quality & Encapsulation
The project follows a strict encapsulation strategy:
- **Raw SQL Isolation**: Database-specific DDL is handled via the data warehouse controller, keeping analytics code platform-agnostic.
- **Schema Validation**: Includes a simulated automated QA suite that validates referential integrity and schema drift for external finance datasets.

---
**Contact: [Parth Khillare](https://github.com/ParthKhillare)**  
*Created as a Portfolio Piece for Analytics Engineering.*
