"use client";
import React, { useState } from "react";

interface FilterOptionsProps {
  onFilterChange: (currency: string, period: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onFilterChange }) => {
  const [currency, setCurrency] = useState<string>("USD");
  const [period, setPeriod] = useState<string>("month");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState<boolean>(false);
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState<boolean>(false);

  const handleCurrencyChange = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    onFilterChange(selectedCurrency, period);
    setCurrencyDropdownOpen(false);
  };

  const handlePeriodChange = (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
    onFilterChange(currency, selectedPeriod);
    setPeriodDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
        
        {/* Currency Dropdown */}
        <div className="relative mb-4 sm:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <div className="relative">
            <div 
              className={`bg-white shadow-md rounded-md p-2 w-[110px] border-solid border-[1px] border-[#01438F] ${
                currencyDropdownOpen ? "rounded-b-none" : ""
              }`}
            >
              <button 
                className="flex justify-between items-center w-full"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                type="button"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="mr-2 text-sm min-w-[3px]">{currency}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="#01438F"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            {currencyDropdownOpen && (
              <div className="absolute top-full left-0 w-[110px] bg-white shadow-md rounded-b-md border-solid border-[1px] border-t-0 border-[#01438F] z-10">
                <div className="py-1">
                  <label className="flex w-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={currency === "USD"} 
                      onChange={() => handleCurrencyChange("USD")}
                      className="mr-1"
                    />
                    <span className="text-sm">$ USD</span>
                  </label>
                  <label className="flex w-full px-3 py-1 hover:bg-gray-100 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={currency === "PHP"} 
                      onChange={() => handleCurrencyChange("PHP")}
                      className="mr-1"
                    />
                    <span className="text-sm group-checked:text-[#01438F]">₱ PHP</span>
                  </label>
                  <p className="text-gray-500 text-sm text-center">others</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Period Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <div 
              className={`bg-white shadow-md rounded-md p-2 w-[110px] border-solid border-[1px] border-[#01438F] ${
                periodDropdownOpen ? "rounded-b-none" : ""
              }`}
            >
              <button 
                className="flex justify-between items-center w-full"
                onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
                type="button"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="mr-2 capitalize text-sm min-w-[3px]">{period}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="#01438F"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>

            {periodDropdownOpen && (
              <div className="absolute top-full left-0 w-[110px] bg-white shadow-md rounded-b-md border-solid border-[1px] border-t-0 border-[#01438F] z-10">
                <div className="py-1">
                  <label className="flex items-center w-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={period === "week"} 
                      onChange={() => handlePeriodChange("week")}
                      className="mr-2"
                    />
                    <span className="text-sm">Week</span>
                  </label>
                  <label className="flex items-center w-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={period === "month"} 
                      onChange={() => handlePeriodChange("month")}
                      className="mr-2"
                    />
                    <span className="text-sm">Month</span>
                  </label>
                  <label className="flex items-center w-full px-3 py-1 hover:bg-gray-100 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={period === "year"} 
                      onChange={() => handlePeriodChange("year")}
                      className="mr-2"
                    />
                    <span className="text-sm">Year</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;