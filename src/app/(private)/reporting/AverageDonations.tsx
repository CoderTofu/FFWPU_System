'use client';

import React from 'react';

interface AverageDonationsProps {
  currency: 'USD' | 'PHP' | 'EUR' | 'JPY' | 'KRW' | 'CNY';
  period: 'week' | 'month' | 'year';
  // now requires each entry to carry its date
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

export default function AverageDonations({
  currency,
  period,
  monthlyData,
  weeklyData,
  yearlyData,
}: AverageDonationsProps) {
  const now = new Date();
  let windowStart: Date;
  let filtered: { date: string; amount: number }[] = [];
  let avgUSD = 0;

  if (period === 'week') {
    // last 28 days → average per 3 weeks
    windowStart = new Date(now);
    windowStart.setDate(now.getDate() - 28);

    filtered = weeklyData.filter(({ date }) => {
      const d = new Date(date);
      return d >= windowStart && d <= now;
    });

    const total = filtered.reduce((sum, { amount }) => sum + amount, 0);
    avgUSD = filtered.length ? total / 3 : 0;
  } else if (period === 'month') {
    // last 12 months → average per 12 months
    windowStart = new Date(now);
    windowStart.setMonth(now.getMonth() - 12);

    filtered = monthlyData.filter(({ date }) => {
      const d = new Date(date);
      return d >= windowStart && d <= now;
    });

    const total = filtered.reduce((sum, { amount }) => sum + amount, 0);
    avgUSD = filtered.length ? total / 12 : 0;
  } else {
    // all-time → average per year-span
    filtered = yearlyData.filter(({ date }) => {
      const d = new Date(date);
      return d <= now;
    });

    const total = filtered.reduce((sum, { amount }) => sum + amount, 0);
    if (filtered.length) {
      const years =
        now.getFullYear() -
        Math.min(...filtered.map(({ date }) => new Date(date).getFullYear())) +
        1;
      avgUSD = total / years;
    }
  }

  // log what went into the average
  console.log('AverageDonations – filtered data for', period, filtered);

  // convert & format
  const rate = conversionRates[currency];
  const avg = avgUSD * rate;
  const zeroDec = currency === 'JPY' || currency === 'KRW';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: zeroDec ? 0 : 2,
    maximumFractionDigits: zeroDec ? 0 : 2,
  }).format(avg);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-4xl font-bold text-[#01438F]">{formatted}</p>
      <p className="text-sm text-gray-500 mt-1">
        {period === 'week'
          ? `(past 28 days, averaged over 3 weeks — ${filtered.length} donations)`
          : period === 'month'
          ? `(past 12 months, averaged over 12 months — ${filtered.length} donations)`
          : `(all-time average over ${filtered.length} years)`}
      </p>
    </div>
  );
}
