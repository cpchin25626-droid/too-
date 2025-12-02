/**
 * Calculates the Future Value of a Series (Monthly investments)
 * FV = P * ((1 + r)^n - 1) / r
 * 
 * @param monthlyAmount - The amount invested per month
 * @param annualRatePercent - The annual interest rate in percent (e.g., 6 for 6%)
 * @param years - Number of years
 */
export const calculateCompoundInterest = (
  monthlyAmount: number,
  annualRatePercent: number,
  years: number
): number => {
  if (monthlyAmount <= 0 || years <= 0) return 0;
  
  const n = years * 12; // Total months
  
  // Special case for 0% interest
  if (annualRatePercent === 0) {
    return monthlyAmount * n;
  }

  const r = annualRatePercent / 100 / 12; // Monthly interest rate
  
  const fv = monthlyAmount * ((Math.pow(1 + r, n) - 1) / r);
  return Math.round(fv);
};

export const formatCurrency = (value: number): string => {
  // Using generic locale string for clear separation
  return value.toLocaleString('zh-TW');
};