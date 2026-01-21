
import React from 'react';
import { CodeIssue } from '../types';

const getTypeColor = (type: string) => {
  switch (type) {
    case 'bug': return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'security': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'performance': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'readability': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

const IssueCard: React.FC<{ issue: CodeIssue }> = ({ issue }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 transition-all hover:border-slate-600">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-200">{issue.title}</h4>
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getTypeColor(issue.type)}`}>
          {issue.type}
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-3 leading-relaxed">
        {issue.description}
      </p>
      {issue.fixExample && (
        <div className="mt-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Suggested Fix</p>
          <pre className="p-3 bg-black/40 rounded text-xs font-mono-code text-green-400 overflow-x-auto">
            {issue.fixExample}
          </pre>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
