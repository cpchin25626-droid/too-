import React, { useState, useEffect } from 'react';
import { getFinancialAdvice } from '../services/geminiService';
import { calculateCompoundInterest } from '../utils/calculations';

interface AiAdvisorProps {
  monthlyAmount: number;
  years: number;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ monthlyAmount, years }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Reset state when inputs change significantly
  useEffect(() => {
      setHasFetched(false);
      setAdvice('');
  }, [monthlyAmount, years]);

  const handleGetAdvice = async () => {
    if (monthlyAmount <= 0 || years <= 0) return;
    
    setLoading(true);
    const totalAtEnd = calculateCompoundInterest(monthlyAmount, 6, years);
    const result = await getFinancialAdvice(monthlyAmount, totalAtEnd, years);
    setAdvice(result);
    setLoading(false);
    setHasFetched(true);
  };

  if (monthlyAmount <= 0 || years <= 0) return null;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI 投資理財觀點
        </h3>
        {!hasFetched && (
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? '分析中...' : '獲取分析'}
          </button>
        )}
      </div>

      {loading && (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      )}

      {advice && !loading && (
        <div className="prose max-w-none text-gray-700 bg-blue-50 p-4 rounded-md border border-blue-100">
           <p className="whitespace-pre-wrap leading-relaxed">{advice}</p>
        </div>
      )}
      
      {!hasFetched && !loading && (
        <p className="text-gray-500 text-sm">點擊上方按鈕，讓 AI 根據您的投入金額 ({monthlyAmount}元/月) 與 時間 ({years}年) 提供分析。</p>
      )}
    </div>
  );
};
