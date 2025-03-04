"use client";
import React from 'react';

interface TotalDonationsProps {
  currency: string;
  period: string;
}

const TotalDonations: React.FC<TotalDonationsProps> = ({ currency, period }) => {
  // Different data sets based on time period
  const monthlyData = [100000, 80000, 60000, 40000, 20000, 0, 0, 0, 0, 0, 0, 0];
  const weeklyData = [25000, 22000, 28000, 24000]; // Example weekly data for current month
  const yearlyData = [300000, 350000, 280000, 400000]; // Example yearly data
  
  // Choose the right dataset based on selected period
  let selectedData;
  
  if (period === "week") {
    selectedData = weeklyData;
  } else if (period === "year") {
    selectedData = yearlyData;
  } else {
    selectedData = monthlyData;
  }
  
  const usdToPhpRate = 55.6; // 1 USD = 55.6 PHP
  
  // Calculate the total donations
  let totalDonation = selectedData.reduce((sum, value) => sum + value, 0);
  
  // Apply currency conversion if needed
  if (currency === "PHP") {
    totalDonation = totalDonation * usdToPhpRate;
  }
  
  // Format the total as currency
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(totalDonation);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-4xl font-bold text-[#01438F]">{formattedTotal}</p>
    </div>
  );
};

export default TotalDonations;