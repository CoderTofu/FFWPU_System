'use client';
import React from 'react';

interface TotalDonationsProps {
  currency: 'USD' | 'PHP' | 'EUR' | 'JPY' | 'KRW' | 'CNY';
  period: 'week' | 'month' | 'year';
  monthlyData: { amount: number }[];
  weeklyData: { amount: number }[];
  yearlyData: { amount: number }[];
}

const TotalDonations: React.FC<TotalDonationsProps> = ({
  currency,
  period,
  monthlyData,
  weeklyData,
  yearlyData,
}) => {
  const dataSet = period === 'week' ? weeklyData : period === 'year' ? yearlyData : monthlyData;

  // USD → target currency
  const rates: Record<string, number> = {
    USD: 1,
    PHP: 55.6,
    EUR: 0.93,
    JPY: 145.3,
    KRW: 1310.4,
    CNY: 7.15,
  };
  const rate = rates[currency] || 1;

  // sum in USD, then convert once
  const totalUSD = dataSet.reduce((sum, x) => sum + x.amount, 0);
  const total = totalUSD * rate;

  // JPY/KRW: no decimals; else 2
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
    </div>
  );
};

export default TotalDonations;
