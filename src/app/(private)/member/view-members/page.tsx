"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import Table from "@/components/Table";
import Modal from "@/components/Modal"; // Assuming you have a Modal component

export default function Member() {
  const [searchQuery, setSearchQuery] = useState("");
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
  const [isOpen, setIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<{ ID: number } | null>(null);
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
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setIsOpen(true);
    }
  };

  const handleConfirm = () => {
    console.log("Confirmed!", rowToDelete);
    // Add your deletion logic here
    setIsOpen(false);
  };

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4 bg-[#D9D9D9] min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div className="w-full max-w-[1450px] mt-6 bg-white rounded-md drop-shadow-lg p-4">
        <p className="text-center text-3xl font-bold">MEMBER INFORMATION</p>
      </div>

      {/* Search & Filters Section */}
      <div className="w-full max-w-[1450px] flex flex-col md:flex-row items-start gap-4 p-4 mt-6">
        {/* Search Bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#01438F' }} />
          <input
            className="w-full h-8 pl-10 pr-3 border border-[#01438F] rounded-md outline-none"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter By Section */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base md:text-sm">Filter By:</span>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-2" ref={dropdownRef}>
            {["Gender", "Age", "Marital Status", "Nation", "Region", "Membership Category", "Archived"].map((filter) => {
              const buttonWidth = {
                Gender: '80px',
                Age: '70px',
                "Marital Status": '120px',
                Nation: '100px',
                Region: '100px',
                "Membership Category": '160px',
                Archived: '90px'
              }[filter];

              return (
                <div key={filter} className="relative">
                  <button
                    onClick={() => toggleDropdown(filter)}
                    className="border border-[#01438F] rounded-md px-2 outline-none bg-white text-gray-600 flex justify-between items-center text-xs whitespace-nowrap"
                    style={{ width: buttonWidth, height: '32px' }}
                  >
                    {filter}
                    {openDropdown === filter ? (
                      <ChevronUp className="ml-2 w-4 h-4" style={{ color: '#01438F' }} />
                    ) : (
                      <ChevronDown className="ml-2 w-4 h-4" style={{ color: '#01438F' }} />
                    )}
                  </button>

                  {openDropdown === filter && (
                    <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10 text-xs max-h-40 overflow-y-auto">
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
      <div className="w-full max-w-[1450px] mt-1 overflow-hidden rounded-lg">
        {filteredData.length > 0 ? (
          <Table data={filteredData} columns={columnConfig} rowDoubleClickPath={url} onRowSelect={setSelectedRow} />
        ) : (
          <p className="text-left text-base mt-4" style={{ marginTop: '20px' }}>No result found.</p>
        )}
      </div>

      {/* Button Section */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-center h-32 gap-4">
          <button
            onClick={handleAddClick}
            className="w-20 h-10 flex items-center justify-center rounded mb-4 m-4 bg-[#01438F] text-[#FCC346] hover:bg-blue-600 font-bold text-base"
          >
            ADD
          </button>
          <button
            onClick={handleEditClick}
            disabled={!selectedRow}
            className={`w-20 h-10 flex items-center justify-center rounded mb-4 m-4 ${
              selectedRow ? "bg-[#01438F] text-[#FCC346] hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-bold text-base`}
          >
            EDIT
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={!selectedRow}
            className={`w-20 h-10 flex items-center justify-center rounded mb-4 m-4 ${
              selectedRow ? "bg-[#01438F] text-[#FCC346] hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-bold text-base`}
          >
            DELETE
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
}