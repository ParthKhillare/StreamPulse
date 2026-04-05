# Netflix Pulse: Live Market Intelligence Dashboard

![Netflix Pulse Banner](https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1200&h=400)

Netflix Pulse is a high-fidelity, real-time analytics dashboard that tracks global Netflix performance metrics and trending content. It leverages the **Google Gemini 3 API** with **Google Search Grounding** to fetch verified fiscal data and current global trends.

## 🚀 Key Features

- **Live Market Dashboard**: Real-time tracking of Global Revenue, Paid Members, ARM (Avg Revenue per Member), and Churn Rate.
- **Trending Content Intelligence**:
  - **Top 20 Shows**: Detailed performance metrics, episode ratings, and regional popularity.
  - **Top 20 Movies**: Global ranking and popularity trajectory.
  - **Top 20 Anime**: Dedicated tracking for the global anime market on Netflix.
- **Regional Popularity**: Visual breakdown of content performance across different global regions.
- **Historical Seasonality**: Analysis of engagement intensity trends based on verified historical cycles.

## 🛠 Tech Stack

- **Frontend**: React 18+, Vite, Tailwind CSS.
- **Animations**: Framer Motion (motion/react).
- **Charts**: Recharts (Area, Bar, and Heatmap visualizations).
- **AI/LLM**: **Google Gemini 3 API** for live data grounding and search-based intelligence.
- **Icons**: Lucide React.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Parthkhillare/StreamPulse.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel

This project is ready for one-click deployment to Vercel.

1. Push your code to a GitHub repository.
2. Connect your repository to Vercel.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel dashboard.
4. Deploy!

### GitHub Pages / Static Hosting

1. Run the build command:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist/` folder to your hosting provider.

---
**Developed by [Parth Khillare](https://github.com/Parthkhillare)**  
*Live Market Intelligence & Analytics Portfolio Piece.*
