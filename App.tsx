
import React, { useState, useCallback } from 'react';
import { LANGUAGES, Icons } from './constants';
import { CodeReviewResult } from './types';
import { reviewCode } from './services/geminiService';
import CodeEditor from './components/CodeEditor';
import ResultPanel from './components/ResultPanel';

function App() {
  const [code, setCode] = useState<string>('function calculateSum(a, b) {\n  var result = a + b\n  return result\n}');
  const [language, setLanguage] = useState<string>('JavaScript');
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) return;
    setReviewResult(null);
    setError(null);
    setLoading(true);

    try {
      const result = await reviewCode(code, language);
      setReviewResult(result);
    } catch (err: any) {
      setError(`Analysis failed: ${err.message || 'Check your internet and try again.'}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [code, language]);

  const handleClear = () => {
    setCode('');
    setReviewResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Icons.Review className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AI Code Sentinel
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Expert Code Reviewer</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 text-slate-300 text-sm font-medium py-2 px-4 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all appearance-none pr-10 cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Clear All"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Editor Section */}
        <section className="flex-1 flex flex-col min-h-[400px]">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            disabled={loading}
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleReview}
              disabled={loading || !code.trim()}
              className="flex-1 group relative overflow-hidden bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl shadow-sky-900/20 active:scale-[0.98]"
            >
              <div className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Deep Thinking Logic Audit...</span>
                  </>
                ) : (
                  <>
                    <Icons.Review className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Run</span>
                  </>
                )}
              </div>
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center space-x-3 text-rose-400">
              <Icons.Error className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </section>

        {/* Results Section */}
        <section className="flex-1 lg:max-w-[600px] h-full bg-slate-900/30 rounded-2xl border border-slate-800 p-6 shadow-inner min-h-[500px]">
          <ResultPanel result={reviewResult} loading={loading} />
        </section>
      </main>
    </div>
  );
}

export default App;
