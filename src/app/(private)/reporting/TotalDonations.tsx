'use client';

import React from 'react';

interface TotalDonationsProps {
  currency: 'USD' | 'PHP' | 'EUR' | 'JPY' | 'KRW' | 'CNY';
  period: 'week' | 'month' | 'year';
  monthlyData: { date: string; amount: number }[];
  weeklyData: { date: string; amount: number }[];
  yearlyData: { date: string; amount: number }[];
}

const conversionRates: Record<string, number> = {
  USD: 1,
  PHP: 55.6,
  EUR: 0.93,
  JPY: 145.3,
  KRW: 1310.4,
  CNY: 7.15,
};

export const TotalDonations: React.FC<TotalDonationsProps> = ({
  currency,
  period,
  monthlyData,
  weeklyData,
  yearlyData,
}) => {
  const now = new Date();

  let filtered: { date: string; amount: number }[] = [];

  if (period === 'week') {
    // last 28 days
    const windowStart = new Date(now);
    windowStart.setDate(now.getDate() - 28);

    filtered = weeklyData.filter(({ date }) => {
      const d = new Date(date);
      return d >= windowStart && d <= now;
    });
  } else if (period === 'month') {
    // last 12 months
    const windowStart = new Date(now);
    windowStart.setMonth(now.getMonth() - 11, 1);
    windowStart.setHours(0, 0, 0, 0);

    filtered = monthlyData.filter(({ date }) => {
      const d = new Date(date);
      return d >= windowStart && d <= now;
    });
  } else {
    // all-time
    filtered = yearlyData.filter(({ date }) => {
      const d = new Date(date);
      return d <= now;
    });
  }

  // sum in USD
  const totalUSD = filtered.reduce((sum, { amount }) => sum + amount, 0);

  // convert
  const rate = conversionRates[currency] || 1;
  const total = totalUSD * rate;

  // format (0 decimals for JPY/KRW)
  const zeroDec = currency === 'JPY' || currency === 'KRW';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: zeroDec ? 0 : 2,
    maximumFractionDigits: zeroDec ? 0 : 2,
  }).format(total);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-4xl font-bold text-[#01438F]">{formatted}</p>
      <p className="text-sm text-gray-500 mt-1">
        {period === 'week'
          ? `(total for last 28 days – ${filtered.length} donations)`
          : period === 'month'
          ? `(total for last 12 months – ${filtered.length} donations)`
          : `(all-time total – ${filtered.length} years of data)`}
      </p>
    </div>
  );
};

export default TotalDonations;
