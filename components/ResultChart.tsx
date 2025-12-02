
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ROW_STYLES } from '../types';
import { calculateCompoundInterest } from '../utils/calculations';

interface ResultChartProps {
  monthlyAmount: number;
  maxYear: number;
  rates: number[];
}

export const ResultChart: React.FC<ResultChartProps> = ({ monthlyAmount, maxYear, rates }) => {
  if (monthlyAmount <= 0 || maxYear <= 0) return null;

  // Generate data for every year from 0 to maxYear for smooth chart
  const data = Array.from({ length: maxYear + 1 }, (_, i) => i).map(year => {
    const point: any = { year };
    rates.forEach((rate, index) => {
      // Use row index as key to handle duplicate rates gracefully
      point[`row${index}`] = calculateCompoundInterest(monthlyAmount, rate, year);
    });
    return point;
  });

  const formatYAxis = (value: number) => {
    if (value >= 100000000) return `${(value / 100000000).toFixed(1)}億`;
    if (value >= 10000) return `${(value / 10000).toFixed(0)}萬`;
    return value.toString();
  };

  return (
    <div className="mt-8 h-[400px] w-full bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">資產累積趨勢圖 (0 - {maxYear} 年)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="year" label={{ value: '年', position: 'insideBottomRight', offset: -5 }} />
          <YAxis tickFormatter={formatYAxis} width={60} />
          <Tooltip 
            formatter={(value: number) => value.toLocaleString()}
            labelFormatter={(label) => `第 ${label} 年`}
          />
          <Legend />
          {rates.map((rate, index) => {
            const style = ROW_STYLES[index % ROW_STYLES.length];
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={`row${index}`}
                name={`${rate}% 報酬`}
                stroke={style.chartColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
