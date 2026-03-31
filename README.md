# StreamPulse Analytics: Engineering Portfolio

![StreamPulse Banner](https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1200&h=400)

StreamPulse is a high-fidelity digital twin of a production-grade analytics engineering project. It simulates a large-scale video streaming data platform (analogous to Netflix) to demonstrate expertise in **BigQuery architecture**, **dbt transformation modeling**, and **AI-driven data observability**.

## 🚀 Key Features

- **Live Netflix Grounding**: Uses Gemini 3 API with Google Search grounding to fetch real-world Q3/Q4 2024 financial benchmarks.
- **dbt Medallion Architecture**: Full lineage demonstration from `Staging (Bronze)` to `Intermediate (Silver)` and `Marts (Gold)`.
- **SCD Type 2 Modeling**: Logic for tracking subscription lifecycle and churn state changes over time, abstracted into modeled dbt code.
- **Abstracted Data Layers**: Demonstrates separation of concerns by isolating raw ingestion logic from consumer-facing metric layers.
- **Architect Q&A**: An integrated AI consultant trained on the StreamPulse schema to answer technical implementation questions.

## 🛠 Tech Stack

- **Frontend**: React 19, Tailwind CSS, Lucide Icons.
- **Data Visualization**: Recharts (Composed charts for MRR trends and seasonality heatmaps).
- **AI/LLM**: Google Gemini 2.0 Flash (for live search and technical consulting).
- **Engineering Docs**: dbt-style documentation and SQL definitions for complex attribution models.

## 📂 Project Structure

```text
├── components/          # UI Modules (Dashboard, Lineage, Chat)
├── services/            # Gemini API & Data Fetching Logic
├── constants.tsx        # Mock Data & dbt Model Definitions
├── types.ts             # TypeScript Interfaces
├── App.tsx              # Main Application Controller
└── index.html           # Entry point with ESM Import Maps
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
