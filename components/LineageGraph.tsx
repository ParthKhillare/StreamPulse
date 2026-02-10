import React from 'react';
import { ArrowRight, Database, Table, Zap, DollarSign } from 'lucide-react';

const LineageGraph: React.FC = () => {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200 h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-8 text-slate-800">dbt Lineage Explorer</h2>
      
      <div className="flex items-start justify-between gap-8 min-w-[1200px] relative">
        {/* Staging Layer */}
        <div className="space-y-4 w-64 z-10">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase w-fit mb-4">Staging (Bronze)</div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-400 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <Database size={16} className="text-slate-400" />
              <span className="text-sm font-semibold truncate">stg_netflix__events</span>
            </div>
            <p className="text-xs text-slate-500">Raw Streaming Logs. High-volume ingestion.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-400 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Database size={16} className="text-slate-400" />
              <span className="text-sm font-semibold truncate">stg_netflix__subs</span>
            </div>
            <p className="text-xs text-slate-500">Subscription & Billing Data.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-400 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Database size={16} className="text-slate-400" />
              <span className="text-sm font-semibold truncate">stg_catalog__costs</span>
            </div>
            <p className="text-xs text-slate-500">Finance Catalog Ingestion.</p>
          </div>
        </div>

        <ArrowRight className="mt-24 text-slate-300" />

        {/* Intermediate Layer */}
        <div className="space-y-4 w-72 z-10">
          <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase w-fit mb-4">Intermediate (Silver)</div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl border-l-4 border-l-purple-500 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={16} className="text-purple-500" />
              <span className="text-sm font-semibold truncate">int_daily_engagement</span>
            </div>
            <p className="text-xs text-slate-500">Aggregated watch-time metrics.</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl border-l-4 border-l-purple-500 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={16} className="text-purple-500" />
              <span className="text-sm font-semibold truncate">int_subscription_scd2</span>
            </div>
            <p className="text-xs text-slate-500">SCD Type 2 Lifecycle Tracking.</p>
          </div>
        </div>

        <ArrowRight className="mt-24 text-slate-300" />

        {/* Marts Layer */}
        <div className="space-y-4 w-72 z-10">
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase w-fit mb-4">Marts (Gold)</div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl border-l-4 border-l-green-500 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Table size={16} className="text-green-600" />
              <span className="text-sm font-bold text-slate-900 truncate">fct_mrr</span>
            </div>
            <p className="text-xs text-slate-500">Financial truth. Normalized USD Revenue.</p>
          </div>
          <div className="p-4 bg-slate-50 border-2 border-red-500 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={16} className="text-red-600" />
              <span className="text-sm font-bold text-slate-900 truncate">fct_content_profit</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Profitability Attribution Model.</p>
            <div className="mt-2 flex gap-2">
              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] rounded font-bold">NEW</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Architectural Partitioning</h3>
          <p className="text-sm text-slate-600">Transformation logic leverages temporal partitioning strategies to optimize query performance at billion-row scale.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Attribution Strategy</h3>
          <p className="text-sm text-slate-600">Subscription revenue is dynamically allocated to content titles based on weighted engagement shares within specific billing windows.</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-700 mb-2">Governance Framework</h3>
          <p className="text-sm text-slate-600">Comprehensive CI/CD integration ensures referential integrity and prevents regression in calculated financial margins.</p>
        </div>
      </div>
    </div>
  );
};

export default LineageGraph;