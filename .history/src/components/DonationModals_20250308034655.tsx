"use client";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface DataItem {
  "Donation ID": number;
  "Member ID": number;
  Name: string;
  Date: string;
  Church: string;
  Amount: string;
}

interface FilterDropdownProps {
  handleSort: (key: keyof DataItem, order: "asc" | "desc") => void;
  openSortDropdown: string | null;
  toggleSortDropdown: (dropdown: string | null) => void;
}

const exchangeRates = {
  USD: 55,
  PHP: 1,
  EUR: 60,
  WON: 0.042,
  YEN: 0.37
};

export default function DonationModals({
  handleSort, openSortDropdown,toggleSortDropdown,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: "Ascending" | "Descending" }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleSortDropdown(null);
  
        setSelectedFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          if (openSortDropdown) {
            delete updatedFilters[openSortDropdown];
          }
          return updatedFilters;
        });
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleSortDropdown, openSortDropdown]);

  const filterKeyMap: { [key: string]: keyof DataItem } = {
    "Member ID": "Member ID",
    Date: "Date",
    Church: "Church",
    Amount: "Amount",
  };

  // To convert Amounts into a comparable numeric value
  const getAmountInPHP = (amount: string) => {
    const currency = amount.split(" ")[0]; // Extract currency from the string
    const value = parseFloat(amount.split(" ")[1]); // Extract the amount or value
    return value * exchangeRates[currency as keyof typeof exchangeRates]; // Convert to currency equivalent
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative min-w-[250px] sm:w-[275px] md:w-[300px] lg:w-[325px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#01438F]" />
        <input
          className="w-full h-10 pl-10 border border-[#01438F] rounded-md outline-none"
          type="text"
          placeholder="Search"
        />
      </div>

      <span className="text-[14px] flex-wrap sm:w-auto w-full">Filter by:</span>

      <div ref={dropdownRef} className="flex flex-wrap items-center gap-4 sm:w-auto">
        {["Member ID", "Date", "Church", "Amount"].map((filter) => (
          <div key={filter} className="relative">
            <button
              onClick={() => toggleSortDropdown(openSortDropdown === filter ? null : filter)}
              className="w-[120px] md:w-[140px] lg:w-[160px] h-10 border border-[#01438F] rounded-md px-3 outline-none
              bg-white text-gray-600 flex justify-between items-center">
              {filter}
              <ChevronDown className="w-4 h-4 text-[#01438F]" />
            </button>

            {openSortDropdown === filter && (
              <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
                <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                  <input
                    type="radio"
                    name={filter}
                    className="mr-2"
                    checked={selectedFilters[filter] === "Ascending"}
                    onChange={() => {
                      setSelectedFilters({ ...selectedFilters, [filter]: "Ascending" });
                      if (filter === "Amount") {
                        handleSort(filterKeyMap[filter], "asc");
                      } else {
                        handleSort(filterKeyMap[filter], "asc");
                      }
                      toggleSortDropdown(null);
                    }}
                  />
                  Ascending
                </label>
                
                <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                  <input
                    type="radio"
                    name={filter}
                    className="mr-2"
                    checked={selectedFilters[filter] === "Descending"}
                    onChange={() => {
                      setSelectedFilters({ ...selectedFilters, [filter]: "Descending" });
                      if (filter === "Amount") {
                        handleSort(filterKeyMap[filter], "desc");
                      } else {
                        handleSort(filterKeyMap[filter], "desc");
                      }
                      toggleSortDropdown(null);
                    }}
                  />
                  Descending
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
