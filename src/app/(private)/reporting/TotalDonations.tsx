'use client';
import React from 'react';

interface TotalDonationsProps {
  currency: string;
  period: string;
  monthlyData: any[];
  weeklyData: any[];
  yearlyData: any[];
}

const TotalDonations: React.FC<TotalDonationsProps> = ({
  currency,
  period,
  monthlyData,
  weeklyData,
  yearlyData,
}) => {
  // Choose the right dataset based on selected period
  let selectedData;

  if (period === 'week') {
    selectedData = weeklyData;
  } else if (period === 'year') {
    selectedData = yearlyData;
  } else {
    selectedData = monthlyData;
  }

  const usdToPhpRate = 55.6; // 1 USD = 55.6 PHP

  // Calculate the total donations
  let totalDonation = selectedData ? selectedData.reduce((sum, value) => sum + value.amount, 0) : 0;

  // Apply currency conversion if needed
  if (currency === 'PHP') {
    totalDonation = totalDonation * usdToPhpRate;
  }

  // Format the total as currency
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalDonation);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-4xl font-bold text-[#01438F]">{formattedTotal}</p>
    </div>
  );
};

export default TotalDonations;
