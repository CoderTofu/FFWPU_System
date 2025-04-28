'use client';
import React from 'react';

interface AverageDonationsProps {
  currency: string;
  period: string;
  monthlyData: any[];
  yearlyData: any[];
  weeklyData: any[];
}

const AverageDonations: React.FC<AverageDonationsProps> = ({
  currency,
  period,
  monthlyData,
  yearlyData,
  weeklyData,
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

  // Calculate the average of non-zero values
  const nonZeroValues = selectedData ? selectedData.filter((value) => value.amount > 0) : [];
  let averageDonation =
    nonZeroValues.length > 0
      ? nonZeroValues.reduce((sum, value) => sum + value.amount, 0) / nonZeroValues.length
      : 0;

  // Apply currency conversion if needed
  if (currency === 'PHP') {
    averageDonation = averageDonation * usdToPhpRate;
  }

  // Format the average as currency
  const formattedAverage = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(averageDonation);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-4xl font-bold text-[#01438F]">{formattedAverage}</p>
    </div>
  );
};

export default AverageDonations;
