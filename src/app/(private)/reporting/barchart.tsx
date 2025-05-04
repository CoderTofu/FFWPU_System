'use client';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyDonationProps {
  currency: 'USD' | 'PHP' | 'EUR' | 'JPY' | 'KRW' | 'CNY';
  period: 'week' | 'month' | 'year';
  monthlyData: { amount: number }[];
  weeklyData: { amount: number }[];
  yearlyData: { amount: number }[];
}

const MonthlyDonation: React.FC<MonthlyDonationProps> = ({
  currency,
  period,
  monthlyData,
  weeklyData,
  yearlyData,
}) => {
  // Static conversion rates per 1 USD
  const conversionRates: Record<string, number> = {
    USD: 1,
    PHP: 55.6,
    EUR: 0.93,
    JPY: 145.3,
    KRW: 1310.4,
    CNY: 7.15,
  };

  // Symbol map
  const currencySymbols: Record<string, string> = {
    USD: '$',
    PHP: '₱',
    EUR: '€',
    JPY: '¥',
    KRW: '₩',
    CNY: '¥',
  };

  // Pick dataset & labels
  let selectedData;
  let labels: string[];
  if (period === 'week') {
    selectedData = weeklyData;
    labels = ['Week 1', 'Week 2', 'Week 3'];
  } else if (period === 'year') {
    selectedData = yearlyData;
    labels = ['2024', '2025', '2026', '2027'];
  } else {
    selectedData = monthlyData;
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  // Convert amounts
  const rate = conversionRates[currency] ?? 1;
  const displayData = selectedData.map((d) => d.amount * rate);

  // Y-axis max
  const maxValue = Math.ceil(Math.max(...displayData) / 5) * 5;

  const data = {
    labels,
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
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false, drawOnChartArea: true },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: maxValue / 5,
          min: 0,
          max: maxValue,
          callback: (value: number) => {
            const symbol = currencySymbols[currency] || '';
            // no decimals for JPY/KRW
            const formatted = ['JPY', 'KRW'].includes(currency)
              ? Math.round(value).toLocaleString()
              : value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                });
            return `${symbol}${formatted}`;
          },
        },
        grid: { display: true },
      },
    },
  };

  return (
    <div className="relative w-full">
      <h3 className="mb-7 text-gray-500">SUM Amount ({currency})</h3>
      <Bar data={data} options={options} />
      <h3 className="absolute bottom-[10px] right-0 text-sm text-gray-500 rotate-90">
        {period === 'week' ? 'Week' : period === 'month' ? 'Month' : 'Year'}
      </h3>
    </div>
  );
};

export default MonthlyDonation;
