"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyDonationProps {
  currency: string;
  period: string;
} 

const MonthlyDonation: React.FC<MonthlyDonationProps> = ({ currency, period }) => {
  const usdToPhpRate = 55.6; // 1 USD = 0.018 PHP
  
  // Different data sets based on time period
  const monthlyData = [100000, 80000, 60000, 40000, 20000, 0, 0, 0, 0, 0, 0, 0];
  const weeklyData = [25000, 22000, 28000]; // Example weekly data for current month
  const yearlyData = [300000, 0, 0, 0]; // Example yearly data
  
  // Choose the right dataset based on selected period
  let selectedData;
  let labels;
  
  if (period === "week") {
    selectedData = weeklyData;
    labels = ['Week 1', 'Week 2', 'Week 3'];
  } else if (period === "year") {
    selectedData = yearlyData;
    labels = ['2024', '2025', '2026', '2027'];
  } else {
    selectedData = monthlyData;
    labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  }
  
  // Apply currency conversion if needed
  const displayData = currency === "PHP" 
    ? selectedData.map(amount => amount * usdToPhpRate) 
    : selectedData;
  
  // Find maximum value for Y axis scaling
  const maxValue = Math.ceil(Math.max(...displayData) / 20000) * 20000;
  
  const data = {
    labels: labels,
    datasets: [
      {
        data: displayData,
        backgroundColor: '#01438F',
        borderColor: '#01438F',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: true,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: maxValue / 5,
          min: 0,
          max: maxValue,
          callback: function(value: any) {
            return currency === "USD" 
              ? `$${value.toLocaleString()}`
              : `₱${value.toLocaleString()}`;
          }
        },
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="relative w-full">
      <h3 className="mb-7 text-gray-500">
        SUM Amount ({currency})
      </h3>
      <Bar data={data} options={options} />
      <h3 className="absolute bottom-[10px] right-[-25px] text-sm right-0 text-gray-500 rotate-90 ml-0">
        {period === "week" ? "Week" : period === "month" ? "Month" : "Year"}
      </h3>
    </div>
  );
};

export default MonthlyDonation;