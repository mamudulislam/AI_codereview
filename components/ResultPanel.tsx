
import React, { useState } from 'react';
import { CodeReviewResult } from '../types';
import IssueCard from './IssueCard';
import { Icons } from '../constants';

interface ResultPanelProps {
  result: CodeReviewResult | null;
  loading: boolean;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ result, loading }) => {
  const [copied, setCopied] = useState(false);

  if (loading) {
    return (
      <div className="h-full flex flex-col space-y-4 animate-pulse">
        <div className="h-10 bg-slate-800 rounded w-1/3"></div>
        <div className="h-24 bg-slate-800 rounded"></div>
        <div className="h-40 bg-slate-800 rounded"></div>
        <div className="h-64 bg-slate-800 rounded"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center p-8">
        <Icons.Review className="w-16 h-16 mb-4 opacity-20" />
        <h3 className="text-xl font-semibold mb-2">Ready for Review</h3>
        <p className="max-w-xs text-sm">Enter your code and click "Run Full Audit" to get an expert AI analysis including AI-authorship detection.</p>
      </div>
    );
  }

  const ratingColors = {
    Better: 'text-emerald-400',
    Good: 'text-sky-400',
    Normal: 'text-amber-400',
    Bad: 'text-rose-400'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.improvedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const aiPercent = result.aiUsagePercentage || 0;
  const humanPercent = 100 - aiPercent;

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <h2 className="text-2xl font-bold text-white">Review Summary</h2>
          <span className={`text-lg font-black uppercase ${ratingColors[result.rating]}`}>
            {result.rating}
          </span>
        </div>
        <p className="text-slate-400 italic text-sm">"{result.summary}"</p>
      </header>

      {/* AI Authorship Detector */}
      <section className="mb-8 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
          <span className="mr-2">Provenance Analysis</span>
          <span className={`px-2 py-0.5 rounded text-[10px] ${aiPercent > 50 ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {aiPercent > 70 ? 'Likely AI' : aiPercent < 30 ? 'Likely Human' : 'Mixed Origin'}
          </span>
        </h3>
        
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1 px-1">
          <span>HUMAN {humanPercent}%</span>
          <span>AI {aiPercent}%</span>
        </div>
        
        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex mb-3">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
            style={{ width: `${humanPercent}%` }}
          />
          <div 
            className="h-full bg-purple-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
            style={{ width: `${aiPercent}%` }}
          />
        </div>
        
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="text-slate-200 font-semibold">Heuristic Check:</span> {result.originAnalysis}
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Logical Flow</h3>
        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {result.explanation}
        </div>
      </section>

      {result.issues.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Detected Issues ({result.issues.length})</h3>
          <div className="grid grid-cols-1 gap-4">
            {result.issues.map((issue, idx) => (
              <IssueCard key={idx} issue={issue} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Growth Suggestions</h3>
        <ul className="space-y-2">
          {result.suggestions.map((s, idx) => (
            <li key={idx} className="flex items-start space-x-2 text-sm text-slate-400">
              <span className="text-emerald-500 mt-1 shrink-0">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Optimized Version</h3>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-[10px] font-bold uppercase bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded transition-colors"
          >
            {copied ? <Icons.Check className="w-3 h-3 text-emerald-500" /> : <Icons.Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
        <pre className="p-5 bg-black/60 rounded-xl border border-slate-700 font-mono-code text-xs text-sky-300 overflow-x-auto leading-relaxed">
          {result.improvedCode}
        </pre>
      </section>
    </div>
  );
};

export default ResultPanel;
