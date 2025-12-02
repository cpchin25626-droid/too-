import React from 'react';

interface CalculatorInputProps {
  monthlyAmount: number | '';
  onMonthlyAmountChange: (value: number | '') => void;
}

export const CalculatorInput: React.FC<CalculatorInputProps> = ({ 
  monthlyAmount, 
  onMonthlyAmountChange
}) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onMonthlyAmountChange('');
    } else {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        onMonthlyAmountChange(parsed);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mb-8 gap-4">
      <div className="text-red-500 font-bold mb-2 animate-bounce">
        ↓ 請輸入資料 ↓
      </div>
      
      <div className="flex items-center w-full bg-yellow-400 p-1 rounded shadow-md">
        <label htmlFor="monthlyInput" className="bg-yellow-400 px-4 py-2 font-bold text-gray-900 whitespace-nowrap w-32 text-right">
          定期定額/月 :
        </label>
        <input
          id="monthlyInput"
          type="number"
          value={monthlyAmount}
          onChange={handleAmountChange}
          placeholder="例如: 5000"
          className="flex-1 p-2 outline-none bg-gray-100 border-b-2 border-black focus:bg-white transition-colors text-right font-mono text-lg"
        />
      </div>
    </div>
  );
};