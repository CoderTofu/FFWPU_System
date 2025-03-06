"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";

export default function Member() {
  const data = [
    { ID: 645969, "Full Name": "Gregorio, Venus Aira L.", Gender: "M", Nation: "Philippines", Region: "Asia Pacific", "Marital Status": "Widowed", Age: 69 },
    { ID: 645970, "Full Name": "Sanchez, Princess Nicole A.", Gender: "F", Nation: "USA", Region: "North America", "Marital Status": "Single", Age: 40 },
    { ID: 645969, "Full Name": "Gregorio, Venus Aira L.", Gender: "M", Nation: "Philippines", Region: "Asia Pacific", "Marital Status": "Widowed", Age: 69 },
    { ID: 645970, "Full Name": "Sanchez, Princess Nicole A.", Gender: "F", Nation: "USA", Region: "North America", "Marital Status": "Single", Age: 40 },
  ];

  const columnConfig = {
    lg: ["ID", "Full Name", "Gender", "Nation", "Region", "Marital Status", "Age"],
    md: ["ID", "Full Name", "Gender", "Age"],
    sm: ["ID", "Full Name"],
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedRow, setSelectedRow] = useState<{ ID: number } | null>(null);
  const router = useRouter();
  const url = "/user";

  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`${url}/${selectedRow.ID}/edit`);
    }
  };

  const handleAddClick = () => {
    // Handle add click
  };

  const handleDeleteClick = () => {
    // Handle delete click
  };

  return (
    <div className="p-4 bg-[#D9D9D9] min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div className="w-full max-w-[1450px] mt-6 bg-white rounded-md drop-shadow-lg p-4">
        <p className="text-center text-3xl font-bold">MEMBER INFORMATION</p>
      </div>

      {/* Search & Filters Section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-4 p-4 mt-6">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <img
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            src="/icons/search_icon.png"
            alt="Search Icon"
          />
          <input
            className="w-full h-8 pl-10 pr-3 border border-[#01438F] rounded-md outline-none"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* Filter By Section */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base md:text-sm">Filter By:</span>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-2" ref={dropdownRef}>
            {["Gender", "Age", "Marital Status", "Nation", "Region", "Membership Category", "Archived"].map((filter) => {
              const buttonClassName = filter.includes(" ") 
                ? "two-word-filter w-42 h-8 border border-[#01438F] rounded-md px-2 outline-none bg-white text-gray-600 flex justify-between items-center text-xs whitespace-nowrap"
                : "one-word-filter w-24 h-8 border border-[#01438F] rounded-md px-2 outline-none bg-white text-gray-600 flex justify-between items-center text-xs whitespace-nowrap";

              return (
                <div key={filter} className="relative">
                  <button
                    onClick={() => toggleDropdown(filter)}
                    className={buttonClassName}
                    style={{ backgroundImage: "url('/icons/caret_down.png')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "20px" }}>
                    {filter}
                  </button>

                  {openDropdown === filter && (
                    <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10 text-xs">
                      {filter === "Gender" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Male
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Female
                          </label>
                        </>
                      ) : filter === "Age" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> 18-25
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> 26-35
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> 36-45
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> 46+
                          </label>
                        </>
                      ) : filter === "Marital Status" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Single
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Married
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Widowed
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Divorced
                          </label>
                        </>
                      ) : filter === "Nation" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> USA
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Philippines
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Others
                          </label>
                        </>
                      ) : filter === "Region" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> North America
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Asia Pacific
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Europe
                          </label>
                        </>
                      ) : filter === "Membership Category" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Regular
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Associate
                          </label>
                        </>
                      ) : filter === "Archived" ? (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> Yes
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" className="mr-2" /> No
                          </label>
                        </>
                      ) : (
                        <>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" name={filter} className="mr-2" /> Ascending
                          </label>
                          <label className="flex items-center px-2 py-2 hover:bg-gray-200">
                            <input type="checkbox" name={filter} className="mr-2" /> Descending
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white mt-5 w-full overflow-hidden rounded-lg">
       <Table data={data} columns={columnConfig} rowDoubleClickPath="/user" onRowSelect={setSelectedRow}/> 
      </div>

      {/* Button Section */}
      <div className="flex items-center justify-center h-32 gap-4">
        <button
          onClick={handleAddClick}
          className="w-32 px-4 py-2 rounded mb-4 m-4 justify-center bg-[#01438F] text-[#FCC346] hover:bg-blue-600 font-bold text-base"
        >
          ADD
        </button>
        <button
          onClick={handleEditClick}
          disabled={!selectedRow}
          className={`w-32 px-4 py-2 rounded mb-4 m-4 justify-center ${
            selectedRow ? "bg-[#01438F] text-[#FCC346] hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } font-bold text-base`}
        >
          EDIT
        </button>
        <button
          onClick={handleDeleteClick}
          disabled={!selectedRow}
          className={`w-32 px-4 py-2 rounded mb-4 m-4 justify-center ${
            selectedRow ? "bg-[#01438F] text-[#FCC346] hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } font-bold text-base`}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}