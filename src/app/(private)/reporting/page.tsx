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

  useEffect(() => {
    console.log(monthlyData);
  }, [monthlyData]);

  return (
    <div className="relative px-2 sm:px-4 md:px-6 lg:px-10">
      <section className="relative">
        <div className="bg-white p-3 rounded-xl h-[100px] flex flex-col justify-center items-center shadow-xl mt-7 mx-2 sm:mx-10">
          <h1 className="font-bold text-center text-2xl sm:text-3xl">REPORTING</h1>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row justify-center items-center mx-2 sm:mx-14 gap-8 lg:mr-28 mt-14">
        <div className="flex flex-col justify-center items-start gap-8 mx-4 sm:mx-2">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mt-[85px]">
            {/*TOTAL DONATION*/}
            <div className="bg-white p-3 h-[150px] sm:w-[270px] flex flex-col justify-center items-center shadow-2xl sm:mb-1">
              <TotalDonations
                currency={currency}
                period={period}
                monthlyData={monthlyData}
                weeklyData={weeklyData}
                yearlyData={yearlyData}
              />
              <h3 className="text-gray-500 text-1xl p-2 font-bold">TOTAL DONATION</h3>
            </div>
            {/*AVERAGE DONATION*/}
            <div className="bg-white p-3 h-[150px] sm:w-[270px] flex flex-col justify-center items-center shadow-2xl">
              <AverageDonations
                currency={currency}
                period={period}
                monthlyData={monthlyData}
                weeklyData={weeklyData}
                yearlyData={yearlyData}
              />
              <h3 className="text-gray-500 text-1xl p-2 font-bold">AVERAGE DONATION</h3>
            </div>
          </div>
          {/*TOP MEMBER DONOR*/}
          <div className="bg-white p-6 h-[320px] w-full sm:w-[580px] flex flex-col justify-center items-center shadow-2xl ml-0">
            <TopDonor currency={currency} period={period} topDonors={topDonors} />
            <h3 className="text-gray-500 text-1xl p-4 font-bold mt-auto">TOP MEMBER DONOR</h3>
          </div>
        </div>

        {/*MONTHLY DONATION */}
        <div className="flex flex-col justify-center items-start mt-10 lg:mt-0">
          <div className="flex justify-between w-full">
            <h2 className="text-[#BE9231] text-2xl p-3 text-left mt-6">
              {period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : 'Yearly'} Donation
            </h2>
            {/* Filtering options moved here with vertical offset */}
            <div className="flex justify-end">
              <FilterOptions onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="bg-white h-[503px] w-full sm:w-[600px] flex flex-col justify-center items-center shadow-2xl">
            <div className="h-[500px] w-full sm:w-[500px] mt-20 mr-24 ml-16 justify-center relative">
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
    </div>
  );
}
