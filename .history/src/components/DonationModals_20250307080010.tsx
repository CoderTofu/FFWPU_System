// DonationModals.tsx
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
  handleSort: (key: keyof DataItem, order: "asc" | "desc" | "USD" | "PHP" | "ALL") => void;
  selectedCurrency: string | null;
  setSelectedCurrency: (currency: string | null) => void;
  openSortDropdown: string | null;
  openCurrencyDropdown: boolean;
  toggleSortDropdown: (dropdown: string | null) => void;
  setOpenCurrencyDropdown: (open: boolean) => void;
}

export default function DonationModals({
  handleSort,
  selectedCurrency,
  setSelectedCurrency,
  openSortDropdown,
  openCurrencyDropdown,
  toggleSortDropdown,
  setOpenCurrencyDropdown,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleSortDropdown(null);
        setOpenCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleSortDropdown, setOpenCurrencyDropdown]);

  const filterKeyMap: { [key: string]: keyof DataItem } = {
    "Member ID": "Member ID",
    Date: "Date",
    Church: "Church",
    Amount: "Amount",
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative min-w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#01438F]" />
        <input
          className="w-full h-10 pl-10 border border-[#01438F] rounded-md outline-none"
          type="text"
          placeholder="Search"
        />
      </div>

      <span className="text-[14px] flex-none">Filter by:</span>

      <div ref={dropdownRef} className="flex flex-wrap items-center gap-4 sm:w-auto">
        {["Member ID", "Date", "Church"].map((filter) => (
          <div key={filter} className="relative">
            <button
              onClick={() => toggleSortDropdown(openSortDropdown === filter ? null : filter)}
              className="w-[120px] md:w-[140px] lg:w-[160px] h-10 border border-[#01438F] rounded-md px-3 outline-none bg-white text-gray-600 flex justify-between items-center"
            >
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
                      handleSort(filterKeyMap[filter], "asc");
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
                      handleSort(filterKeyMap[filter], "desc");
                      toggleSortDropdown(null);
                    }}
                  />
                  Descending
                </label>
              </div>
            )}
          </div>
        ))}

        <div className="relative">
          <button
            onClick={() => setOpenCurrencyDropdown(!openCurrencyDropdown)}
            className="w-[120px] md:w-[140px] lg:w-[160px] h-10 border border-[#01438F] rounded-md px-3 outline-none bg-white text-gray-600 flex justify-between items-center"
          >
            Amount
            <ChevronDown className="w-4 h-4 text-[#01438F]" />
          </button>

          {openCurrencyDropdown && (
            <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
              <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                <input
                  type="radio"
                  name="currency"
                  className="mr-2"
                  checked={selectedCurrency === null}
                  onChange={() => {
                    setSelectedCurrency(null);
                    handleSort("Amount", "ALL");
                    setOpenCurrencyDropdown(false);
                  }}
                />
                ALL
              </label>

              <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                <input
                  type="radio"
                  name="currency"
                  className="mr-2"
                  checked={selectedCurrency === "USD"}
                  onChange={() => {
                    setSelectedCurrency("USD");
                    handleSort("Amount", "USD");
                    setOpenCurrencyDropdown(false);
                  }}
                />
                USD
              </label>

              <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                <input
                  type="radio"
                  name="currency"
                  className="mr-2"
                  checked={selectedCurrency === "PHP"}
                  onChange={() => {
                    setSelectedCurrency("PHP");
                    handleSort("Amount", "PHP");
                    setOpenCurrencyDropdown(false);
                  }}
                />
                PHP
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}