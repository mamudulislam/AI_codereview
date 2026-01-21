
import React from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  disabled?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language, disabled }) => {
  return (
    <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f172a] border-b border-slate-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{language}</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        spellCheck={false}
        className="flex-1 p-6 bg-transparent text-slate-300 font-mono-code text-sm resize-none focus:outline-none placeholder-slate-600 leading-relaxed"
        placeholder={`Paste your ${language} code here...`}
      />
    </div>
  );
};

export default CodeEditor;
