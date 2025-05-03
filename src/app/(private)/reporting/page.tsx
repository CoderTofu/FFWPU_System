'use client';
import React, { useEffect, useState } from 'react';
import MonthlyDonation from '../reporting/barchart';
import AverageDonations from '../reporting/AverageDonations';
import TotalDonations from '../reporting/TotalDonations';
import TopDonor from '../reporting/topDonator';
import FilterOptions from './FilterOptions';
import { useQuery } from '@tanstack/react-query';

export default function Reporting() {
  const [currency, setCurrency] = useState<string>('USD');
  const [period, setPeriod] = useState<string>('month');
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [topDonors, setTopDonors] = useState<any[]>([]);

  const handleFilterChange = (newCurrency: string, newPeriod: string) => {
    setCurrency(newCurrency);
    setPeriod(newPeriod);
  };

  const statisticsQuery = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const res = await fetch('/api/donations/statistics');
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    },
  });

  useEffect(() => {
    if (statisticsQuery.status === 'success') {
      const data = statisticsQuery.data;
      setMonthlyData(data.time_series.monthly);
      setWeeklyData(data.time_series.weekly);
      setYearlyData(data.time_series.yearly);
      setTopDonors(data.top_donors);
    }
  }, [statisticsQuery.data, statisticsQuery.status]);

  return (
    <div className="min-h-screen h-full px-4 py-8 lg:px-32 bg-gray-50">
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg mb-8">
        <p className="text-3xl font-bold uppercase">DONATIONS REPORTING</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Left Column: Metrics */}
        <div className="flex-1 space-y-8">
          {/* TOTAL DONATION */}
          <div className="bg-white rounded-2xl shadow-xl py-8 flex flex-col items-center justify-center">
            <TotalDonations
              currency={currency}
              period={period}
              monthlyData={monthlyData}
              weeklyData={weeklyData}
              yearlyData={yearlyData}
            />
            <p className="text-gray-500 mt-4 font-semibold">Total Donation</p>
          </div>

          {/* AVERAGE DONATION */}
          <div className="bg-white rounded-2xl shadow-xl py-8 flex flex-col items-center justify-center">
            <AverageDonations
              currency={currency}
              period={period}
              monthlyData={monthlyData}
              weeklyData={weeklyData}
              yearlyData={yearlyData}
            />
            <p className="text-gray-500 mt-4 font-semibold">Average Donation</p>
          </div>

          {/* TOP DONOR */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-[#BE9231] text-xl font-semibold mb-4 text-center">
              Top Member Donors
            </h2>
            <TopDonor currency={currency} period={period} topDonors={topDonors} />
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-[#BE9231] text-2xl font-semibold">
              {period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : 'Yearly'} Donation
            </h2>
            <FilterOptions onFilterChange={handleFilterChange} />
          </div>

          <div className="w-full overflow-x-auto">
            <MonthlyDonation
              currency={currency}
              period={period}
              monthlyData={monthlyData}
              weeklyData={weeklyData}
              yearlyData={yearlyData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
