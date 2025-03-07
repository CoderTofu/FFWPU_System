"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Modal from "@/components/Modal";
import Table from "@/components/Table";

export default function Donation() {
  const [selectedRow, setSelectedRow] = useState<{ ID: number } | null>(null);
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const data = [
    { "Donation ID": 1001, ID: 5001, Name: "Gregorio, Princess Nicole L.", Date: "2024-02-01", Church: "Manila Cathedral", Amount: 100.50 },
    { "Donation ID": 1002, ID: 5002, Name: "Bilan, Edrill F.", Date: "2024-02-02", Church: "San Agustin Church", Amount: 250.00 },
    { "Donation ID": 1003, ID: 5003, Name: "Jagonoy, Jhon Mar F.", Date: "2024-02-03", Church: "Sto. Nino de Pandacan Parish Church", Amount: 75.25 },
    { "Donation ID": 1001, ID: 5001, Name: "Gregorio, Princess Nicole L.", Date: "2024-02-01", Church: "Manila Cathedral", Amount: 100.50 },
    { "Donation ID": 1002, ID: 5002, Name: "Bilan, Edrill F.", Date: "2024-02-02", Church: "San Agustin Church", Amount: 250.00 },
    { "Donation ID": 1003, ID: 5003, Name: "Jagonoy, Jhon Mar F.", Date: "2024-02-03", Church: "Sto. Nino de Pandacan Parish Church", Amount: 75.25 },
    { "Donation ID": 1001, ID: 5001, Name: "Gregorio, Princess Nicole L.", Date: "2024-02-01", Church: "Manila Cathedral", Amount: 100.50 },
    { "Donation ID": 1002, ID: 5002, Name: "Bilan, Edrill F.", Date: "2024-02-02", Church: "San Agustin Church", Amount: 250.00 },
    { "Donation ID": 1003, ID: 5003, Name: "Jagonoy, Jhon Mar F.", Date: "2024-02-03", Church: "Sto. Nino de Pandacan Parish Church", Amount: 75.25 },
    { "Donation ID": 1001, ID: 5001, Name: "Gregorio, Princess Nicole L.", Date: "2024-02-01", Church: "Manila Cathedral", Amount: 100.50 },
    { "Donation ID": 1002, ID: 5002, Name: "Bilan, Edrill F.", Date: "2024-02-02", Church: "San Agustin Church", Amount: 250.00 },
    { "Donation ID": 1003, ID: 5003, Name: "Jagonoy, Jhon Mar F.", Date: "2024-02-03", Church: "Sto. Nino de Pandacan Parish Church", Amount: 75.25 },
  ];

  const column = {
    lg: ["Donation ID", "ID", "Name", "Date", "Church", "Amount"],
    md: ["Donation ID", "Name", "Date", "Amount"],
    sm: ["Name", "Amount"],
  };

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

  // Button behavior
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement)?.closest("table")) {
        setSelectedRow(null); // Reset when clicking outside the table
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  
  return (
    <div className="bg-[#D9D9D9] min-h-screen flex flex-col">

    {/* Title Section */}
    <div className="w-full mx-auto max-w-[1450px] flex flex-col md:flex-row justify-center items-center
                    bg-white rounded-md shadow-md shadow-black/25 p-4 mt-8">
        <p className=" text-[28px] font-bold">DONATIONS</p>
    </div>

    {/* Search & Filters Section */}
    <div className="w-full max-w-6xl flex flex-wrap items-start justify-start gap-4 p-4 mt-6 ml-[18px]">  
    {/* Search Bar */}
    <div className="relative w-full sm:w-[250px] md:w-[30%] lg:w-[25%] xl:w-[20%]">
      <img
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
        src="/icons/search_icon.png"
        alt="Search Icon"
      />
      <input
        className="w-full h-10 pl-10 border border-[#01438F] rounded-md outline-none"
        type="text"
        placeholder="Search"
      />
    </div>

    {/*Filters Section */}
    <span className="text-sm mt-[10px]">Filter By:</span>

    {/* Dropdowns */}
    <div className="flex flex-wrap items-center gap-4" ref={dropdownRef}>
      {["Member ID", "Date", "Church", "Amount"].map((filter) => (
        <div key={filter} className="relative">
          <button
            onClick={() => toggleDropdown(filter)}
            className="w-[120px] md:w-[140px] lg:w-[160px] h-10 border border-[#01438F] rounded-md px-3 outline-none bg-white text-gray-600 flex justify-between items-center"
            style={{ backgroundImage: "url('/icons/caret_down.png')", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
            {filter}
          </button>

          {openDropdown === filter && (
            <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
              {filter === "Amount" ? (
                <>
                  <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                    <input type="checkbox" className="mr-2"/> $ USD
                  </label>
                  
                  <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                    <input type="checkbox" className="mr-2"/> ₱ PHP
                  </label>
                </>
              ) : (
                <>
                  <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                    <input type="radio" name={filter} className="mr-2"/> Ascending
                  </label>

                  <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
                    <input type="radio" name={filter} className="mr-2"/> Descending
                  </label>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  
      {/* Table Section */}
      
      <div className= "overflow-hidden rounded-lg mt-5 mx-auto sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[96%] items-center justify-center">

      <div className="bg-white"
        onClick={(event) => {
        const target = event.target as HTMLElement;
        const row = target.closest("tr"); // Find the clicked row

      if (row) {
        const rowIndex = row.rowIndex - 1; //Adjust for header row
      if (rowIndex >= 0 && data[rowIndex]) {
        setSelectedRow(data[rowIndex]); //Store the selected row
      }
    }
  }}
>

      <Table data={data} columns={column} />
      </div>

      <div className="font-bold text-[#FCC346] text-[20px] mt-[32px] mb-[180px] flex flex-wrap justify-center gap-[22px]">
        <button onClick={() => router.push('/donation/add-donation')} className="w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25">
          ADD
        </button>

        <button onClick={() => {console.log("", selectedRow); setSelectedRow(null); //Reset after clicking
         }}
            disabled={!selectedRow}
            className={`${
            selectedRow
            ? "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25"
            : "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25 opacity-50 cursor-not-allowed"
            }`}
        >
            EDIT
        </button>

        <button onClick={() => setShowDeleteModal(true)}
            disabled={!selectedRow} // Disable if no row is selected
            className={`${
            selectedRow
            ? "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25"
            : "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25 opacity-50 cursor-not-allowed"
            }`}
        >
            DELETE
        </button>
      </div>
      
      {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <Modal 
            isOpen={showDeleteModal} 
            onClose={() => setShowDeleteModal(false)} 
            onConfirm={() => {
            console.log("");
            setShowDeleteModal(false);
          }} 
        />
      )}

    </div>
  </div>

  );
}