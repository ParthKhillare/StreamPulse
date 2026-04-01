import { Message, MessageSource, LiveBenchmarks } from "../types";

export interface ChatResponse {
  text: string;
  sources?: MessageSource[];
}

export class AnalyticsConsultant {
  constructor() {
    console.log('StreamPulse Analytics Consultant initialized with mock data');
  }

  private parseRawNumeric(val: string, multiplier: number = 1): number {
    const clean = val.replace(/[^0-9.]/g, '');
    return parseFloat(clean) * multiplier;
  }

  async fetchLiveNetflixBenchmarks(): Promise<LiveBenchmarks | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Fetching Netflix benchmarks (mock data)');
    
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

  async chat(history: Message[], userInput: string): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const responses = [
      "Based on the current streaming analytics landscape, your data architecture follows industry best practices with proper partitioning and clustering strategies.",
      "Your Medallion Architecture implementation is solid. Consider implementing incremental models for better performance.",
      "The SCD Type 2 approach for subscription tracking is excellent for historical analysis. Make sure to validate the surrogate key generation.",
      "For streaming platforms like yours, I recommend implementing data quality checks at each layer of the medallion architecture.",
      "Your current ARM calculation methodology aligns with industry standards. Consider adding cohort analysis for deeper insights."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      text: randomResponse,
      sources: [
        {
          title: "Streaming Analytics Best Practices",
          uri: "https://example.com/analytics-guide"
        }
      ]
    };
  }
}

export const analyticsConsultant = new AnalyticsConsultant();