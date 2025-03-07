"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";

export default function AddDonation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsOpen(false);
  }

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

    return (
    <>
      <div className="w-full mx-auto max-w-[1450px] flex flex-col md:flex-row justify-center items-center
                    bg-white rounded-md shadow-md shadow-black/25 p-4 mt-8">
        <p className=" text-[28px] font-bold">DONATIONS</p>
      </div>

      <div className="flex md:flex-nowrap mt-[63px] justify-center">

    
      {/* Member ID */}
      <div className="flex flex-col w-[80%] sm:w-[50%] md:w-auto mr-[45px]">
        <label className="text-[14px] mb-[4px]">Member ID*</label>
          <input
            className="max-w-[200px] h-[36px] pl-2 border border-[#01438F] rounded-md outline-none
                       appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
          />
      </div>

      {/* Date */}
      <div className="flex flex-col w-[80%] sm:w-[50%] md:w-auto mr-[45px]">
        <label className="text-[14px] mb-[4px]">Date*</label>
          <input
            className="w-full max-w-[170px] h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
            type="date"
          />
      </div>

      {/* Church */}
      <div className="flex flex-col w-[80%] sm:w-[80%] md:w-[394px] mr-[45px]">
        <label className="text-[14px] mb-[4px]">Church*</label>
        <input
          className="max-w-[500px] h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
          type="text"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col w-[80%] sm:w-[50%] md:w-auto mr-[45px]">
        <label className="text-[14px] mb-[4px]">Amount*</label>
        <input
          className="max-w-[200px] h-[36px] pl-2 border border-[#01438F] rounded-md outline-none
          appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
        />
      </div>

      {/* Currency */}
      <div className="flex flex-col w-[80%] sm:w-[50%] md:w-auto">
        <label className="text-[14px] mb-[4px]">Currency*</label>
        <div ref={dropdownRef} className="relative">
          <button onClick={() => toggleDropdown("SELECT")}
              className="w-[120px] md:w-[140px] lg:w-[160px] h-9 border border-[#01438F] rounded-md px-3 outline-none
                         bg-white text-gray-600 flex justify-between items-center"
              style={{
                backgroundImage: "url('/icons/caret_down.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}>SELECT
          </button>

      {openDropdown === "SELECT" && (
        <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
            <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
              <input type="radio" name="currency" className="mr-2" /> $ USD
            </label>

            <label className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm">
              <input type="radio" name="currency" className="mr-2" /> ₱ PHP
            </label>
        </div>
        )}
    </div>
    </div>

    </div>
    
        <div className="font-bold text-[#FCC346] text-[20px] mt-[40px] mb-[180px] flex flex-wrap justify-center">
          <button onClick={() => setIsOpen(true)} className="w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25"> ADD </button>
        </div>
            <Modal 
              isOpen={isOpen} 
              onClose={() => setIsOpen(false)} 
              onConfirm={handleConfirm}
              message="Are you sure you want to add the data?"
              confirmText="Confirm"
              cancelText="Cancel"
          />
      
  </>
  );
}