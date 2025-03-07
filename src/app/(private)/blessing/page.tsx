"use client";

import { useState, useRef, useEffect } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Search, ChevronDown } from "lucide-react";

export default function ViewBlessing() {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<{ "Blessing ID": number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const columns = {
    lg: ["Blessing ID", "Date", "Name of Blessing", "Year"],
    md: ["Blessing ID", "Date", "Name of Blessing"],
    sm: ["Blessing ID", "Date"],
  };

  const [blessing, setBlessing] = useState([
    { "Blessing ID": 102010, Date: "02/19/2021", "Name of Blessing": "Blessing 1", Year: 2021 },
    { "Blessing ID": 124495, Date: "02/21/2025", "Name of Blessing": "First Sunday Event", Year: 2025 },
    { "Blessing ID": 321345, Date: "02/26/2025", "Name of Blessing": "Blessing 3", Year: 2025 },
    { "Blessing ID": 124495, Date: "02/21/2025", "Name of Blessing": "Blessing 4", Year: 2019 },
  ]);

  const availableYears = ["All Years", ...Array.from(new Set(blessing.map(item => item.Year.toString())))];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = blessing.filter(
    (item) =>
      Object.values(item).join(" ").toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedYear && selectedYear !== "All Years" ? item.Year.toString() === selectedYear : true)
  );

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/blessing/${selectedRow["Blessing ID"]}/edit`);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleConfirm = () => {
    if (selectedRow) {
      setBlessing(blessing.filter((item) => item["Blessing ID"] !== selectedRow["Blessing ID"]));
    }
    console.log("Data deleted successfully!");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 flex justify-center items-center mt-8">
        <h1 className="text-2xl font-bold uppercase">BLESSINGS INFORMATION</h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between max-w-6xl mx-auto">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            className="w-full h-7 pl-8 border border-[#01438F] rounded outline-none text-sm"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#01438F] w-4 h-5" />
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(openDropdown === "Year" ? null : "Year")}
            className="w-30 md:w-36 lg:w-40 h-7 border border-[#01438F] rounded-md px-3 outline-none bg-white text-sm text-gray-500 flex justify-between items-center"
          >
            Year
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          {openDropdown === "Year" && (
            <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
              {availableYears.map((year) => (
                <label
                  key={year}
                  className="flex items-center px-3 py-2 hover:bg-gray-200 text-[14px]"
                >
                  <input
                    type="radio"
                    name="year"
                    className="mr-2"
                    checked={selectedYear === year}
                    onChange={() => setSelectedYear(year)}
                  />
                  {year}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto overflow-hidden rounded-lg bg-white mt-6">
        <Table data={filteredData} columns={columns} rowDoubleClickPath="/blessing" onRowSelect={setSelectedRow} />
      </div>

      {/* Buttons */}
      <div className="flex justify-center items-center m-7 gap-5">
        <button className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold" onClick={() => router.push("/blessing/add")}>
          ADD
        </button>
        <button
          onClick={handleEditClick}
          disabled={!selectedRow}
          className={`px-6 py-2 rounded ${selectedRow ? "bg-[#01438F] text-[#FCC346] font-bold" : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"}`}
        >
          EDIT
        </button>
        <button
          onClick={() => setIsOpen(true)}
          disabled={!selectedRow}
          className={`px-4 py-2 rounded ${selectedRow ? "bg-[#01438F] text-[#FCC346] font-bold" : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"}`}
        >
          DELETE
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleConfirm} message="Are you sure you want to delete the data?" confirmText="Yes" cancelText="No" />
    </div>
  );
}
