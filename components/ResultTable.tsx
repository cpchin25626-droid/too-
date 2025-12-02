
import React from 'react';
import { ROW_STYLES } from '../types';
import { calculateCompoundInterest, formatCurrency } from '../utils/calculations';

interface ResultTableProps {
  monthlyAmount: number;
  years: number[];
  onYearChange: (index: number, value: number) => void;
  rates: number[];
  onRateChange: (index: number, value: number) => void;
}

export const ResultTable: React.FC<ResultTableProps> = ({ 
  monthlyAmount, 
  years, 
  onYearChange,
  rates,
  onRateChange
}) => {
  const handleYearInputChange = (index: number, val: string) => {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onYearChange(index, parsed);
    } else if (val === '') {
       onYearChange(index, 0);
    }
  };

  const handleRateInputChange = (index: number, val: string) => {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed >= 0) {
      onRateChange(index, parsed);
    } else if (val === '') {
       onRateChange(index, 0);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-left border-r border-gray-600 w-32 sticky left-0 bg-gray-700 z-10">
              報酬率 / 投資年數
            </th>
            {years.map((year, index) => (
              <th key={index} className="p-3 text-right border-l border-gray-600 min-w-[100px]">
                <div className="flex items-center justify-end gap-1">
                   <input 
                    type="number"
                    value={year === 0 ? '' : year}
                    onChange={(e) => handleYearInputChange(index, e.target.value)}
                    className="w-12 bg-gray-600 text-white text-center border-b border-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-gray-500 transition-colors rounded-t"
                   />
                   <span className="text-sm">年</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rates.map((rate, rowIndex) => {
            const style = ROW_STYLES[rowIndex % ROW_STYLES.length];
            return (
              <tr key={rowIndex} className={`${style.colorClass} ${style.textColorClass}`}>
                <td className="p-3 font-bold text-xl border-r border-gray-600/30 sticky left-0 inherit-bg z-10 bg-inherit">
                   <div className="flex items-center gap-1 w-full">
                     <input 
                       type="number"
                       value={rate}
                       onChange={(e) => handleRateInputChange(rowIndex, e.target.value)}
                       className="w-full bg-transparent text-inherit border-b border-current focus:outline-none text-left focus:border-white/50"
                     />
                     <span>%</span>
                   </div>
                </td>
                {years.map((year, colIndex) => {
                  const total = calculateCompoundInterest(monthlyAmount, rate, year);
                  return (
                    <td key={colIndex} className="p-3 text-right font-medium border-l border-gray-600/20">
                      {monthlyAmount > 0 && year > 0 ? formatCurrency(total) : '-'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
