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

const currencySymbols: Record<string, string> = {
  USD: '$',
  PHP: '₱',
  EUR: '€',
  JPY: '¥',
  KRW: '₩',
  CNY: '¥',
};

const MonthlyDonation: React.FC<MonthlyDonationProps> = ({
  currency,
  period,
  monthlyData,
  weeklyData,
  yearlyData,
}) => {
  const now = new Date();
  const rate = conversionRates[currency] ?? 1;

  let labels: string[] = [];
  let buckets: number[] = [];

  if (period === 'week') {
    // 1) Filter last 28 days
    const windowStart = new Date(now);
    windowStart.setDate(now.getDate() - 28);

    const filtered = weeklyData.filter(({ date }) => {
      const d = new Date(date);
      return d >= windowStart && d <= now;
    });
    console.log('BarChart (week) – raw filtered:', filtered);

    // 2) Group into 4 one-week buckets
    // buckets[0] = oldest (21–28 days ago), …, buckets[3] = last 7 days
    buckets = [0, 0, 0, 0];
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    filtered.forEach(({ date, amount }) => {
      const d = new Date(date).getTime();
      const diffDays = (now.getTime() - d) / MS_PER_DAY;
      const idx = Math.floor(diffDays / 7);
      if (idx >= 0 && idx < 4) buckets[3 - idx] += amount;
    });
    console.log('BarChart (week) – grouped buckets:', buckets);

    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  } else if (period === 'month') {
    // 1) Filter last 12 months
    const windowStart = new Date(now);
    windowStart.setMonth(now.getMonth() - 11, 1); // 12-month window
    windowStart.setHours(0, 0, 0, 0);

    const filtered = monthlyData.filter(({ date }) => {
      const d = new Date(date);
      return d >= windowStart && d <= now;
    });
    console.log('BarChart (month) – raw filtered:', filtered);

    // 2) Group by year-month
    const map: Record<string, number> = {};
    filtered.forEach(({ date, amount }) => {
      const d = new Date(date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      map[key] = (map[key] || 0) + amount;
    });
    console.log('BarChart (month) – grouped map:', map);

    // 3) Sort keys chronologically
    const sortedKeys = Object.keys(map).sort((a, b) => {
      return new Date(a + '-01').getTime() - new Date(b + '-01').getTime();
    });

    labels = sortedKeys.map((key) => {
      const [y, m] = key.split('-').map(Number);
      return new Date(y, m - 1).toLocaleString('default', { month: 'short' });
    });
    buckets = sortedKeys.map((key) => map[key]);
  } else {
    // YEAR: all-time, one bar per entry in yearlyData
    const filtered = yearlyData.filter(({ date }) => {
      return new Date(date) <= now;
    });
    console.log('BarChart (year) – raw filtered:', filtered);

    const sorted = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    console.log('BarChart (year) – sorted:', sorted);

    labels = sorted.map((d) => new Date(d.date).getFullYear().toString());
    buckets = sorted.map((d) => d.amount);
  }

  // convert and prepare chart data
  const displayData = buckets.map((v) => v * rate);
  const maxValue = Math.ceil(Math.max(...displayData, 0) / 5) * 5;

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
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false, drawOnChartArea: true } },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: maxValue / 5,
          min: 0,
          max: maxValue,
          callback: (value: number) => {
            const symbol = currencySymbols[currency] || '';
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
    </div>
  );
};

export default MonthlyDonation;
