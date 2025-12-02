
import React, { useState, useMemo } from 'react';
import { CalculatorInput } from './components/CalculatorInput';
import { ResultTable } from './components/ResultTable';
import { ResultChart } from './components/ResultChart';
import { AiAdvisor } from './components/AiAdvisor';

const App: React.FC = () => {
  const [monthlyAmount, setMonthlyAmount] = useState<number | ''>('');
  // Default year columns
  const [years, setYears] = useState<number[]>([1, 2, 3, 4, 5, 10]);
  // Default rates matching the original design
  const [rates, setRates] = useState<number[]>([0, 2, 6, 9, 13]);

  const handleYearChange = (index: number, value: number) => {
    const newYears = [...years];
    newYears[index] = value;
    setYears(newYears);
  };

  const handleRateChange = (index: number, value: number) => {
    const newRates = [...rates];
    newRates[index] = value;
    setRates(newRates);
  };

  // Determine the maximum year for the chart and AI advisor
  const maxYear = useMemo(() => {
    return Math.max(...years, 0);
  }, [years]);

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          定期定額複利計算機
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          輸入每月投資金額與時間，預見未來的財富自由
        </p>
      </header>

      <main className="w-full max-w-5xl">
        <CalculatorInput 
          monthlyAmount={monthlyAmount} 
          onMonthlyAmountChange={setMonthlyAmount} 
        />

        <div className="bg-white p-1 sm:p-4 rounded-xl shadow-2xl overflow-hidden">
           {/* Pass 0 if empty string to avoid NaN in calculations */}
          <ResultTable 
            monthlyAmount={monthlyAmount === '' ? 0 : monthlyAmount} 
            years={years}
            onYearChange={handleYearChange}
            rates={rates}
            onRateChange={handleRateChange}
          />
        </div>

        {/* Visualization Chart */}
        {typeof monthlyAmount === 'number' && monthlyAmount > 0 && maxYear > 0 && (
          <ResultChart 
            monthlyAmount={monthlyAmount} 
            maxYear={maxYear}
            rates={rates}
          />
        )}

        {/* Gemini AI Integration */}
        {typeof monthlyAmount === 'number' && monthlyAmount > 0 && maxYear > 0 && (
          <AiAdvisor 
            monthlyAmount={monthlyAmount} 
            years={maxYear}
          />
        )}
      </main>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Financial Projection Tool. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
