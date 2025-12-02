
export interface CalculationResult {
  year: number;
  amount: number;
}

export interface RowStyle {
  colorClass: string;
  textColorClass: string;
  chartColor: string;
}

export interface ChartDataPoint {
  year: number;
  [key: string]: number; // Dynamic keys for rates
}

export const ROW_STYLES: RowStyle[] = [
  { colorClass: 'bg-gray-200', textColorClass: 'text-gray-700', chartColor: '#9ca3af' },
  { colorClass: 'bg-[#e6dcc3]', textColorClass: 'text-gray-800', chartColor: '#d1b67b' },
  { colorClass: 'bg-[#d4c385]', textColorClass: 'text-gray-900', chartColor: '#d4c385' },
  { colorClass: 'bg-[#c7b35a]', textColorClass: 'text-white', chartColor: '#b39f36' },
  { colorClass: 'bg-[#8c6b0d]', textColorClass: 'text-white', chartColor: '#8c6b0d' },
];
