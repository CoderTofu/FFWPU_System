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
  CNY: 0.37,
  JPY: 0.38,
};

export default function DonationModals({
  handleSort,
  openSortDropdown,
  toggleSortDropdown,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: "Ascending" | "Descending";
  }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative w-full sm:max-w-xs">
        <input
          className="w-full h-7 pl-8 py-3 border border-[#01438F] rounded outline-none text-sm"
          type="text"
          placeholder="Search"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#01438F] w-4 h-5" />
      </div>

      <div className="flex justify-center align-center">
        <div ref={dropdownRef} className="flex flex-wrap items-center gap-4">
          {["Member ID", "Date", "Church", "Amount"].map((filter) => (
            <div key={filter} className="relative">
              <button
                onClick={() =>
                  toggleSortDropdown(
                    openSortDropdown === filter ? null : filter
                  )
                }
                className="w-[160px] py-1 border border-[#01438F] rounded-md px-3 outline-none
              bg-white text-gray-600 flex justify-between items-center text-sm"
              >
                {filter}
                <ChevronDown className="w-4 h-4 text-[#01438F]" />
              </button>

              {openSortDropdown === filter && (
                <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
                  <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer text-sm">
                    <input
                      type="radio"
                      name={filter}
                      className="mr-2"
                      checked={selectedFilters[filter] === "Ascending"}
                      onChange={() => {
                        setSelectedFilters({
                          ...selectedFilters,
                          [filter]: "Ascending",
                        });
                        handleSort(filterKeyMap[filter], "asc");
                        toggleSortDropdown(null);
                      }}
                    />
                    Ascending
                  </label>

                  <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer text-sm">
                    <input
                      type="radio"
                      name={filter}
                      className="mr-2"
                      checked={selectedFilters[filter] === "Descending"}
                      onChange={() => {
                        setSelectedFilters({
                          ...selectedFilters,
                          [filter]: "Descending",
                        });
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
        </div>
      </div>
    </div>
  );
}
