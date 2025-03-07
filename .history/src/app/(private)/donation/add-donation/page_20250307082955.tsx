"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";
import { ChevronDown } from 'lucide-react';

export default function AddDonation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsOpen(false);
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

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setOpenDropdown(null);
  };

  return (
    <div className="w-full mx-auto max-w-[1450px] flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md shadow-black/25 p-4 mt-8">
      <p className="text-[28px] font-bold">DONATIONS</p>

      <div className="flex flex-col items-center mt-[63px]">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page refresh if invalid
            setIsOpen(true);
          }}
        >
          {/* Member ID */}
          <div className="flex flex-col w-[394px] max-w-full mb-4">
            <label className="text-[14px] mb-1">Member ID</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              required
            />
          </div>

          {/* Date */}
          <div className="flex flex-col w-[394px] max-w-full mb-4">
            <label className="text-[14px] mb-1">Date</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="date"
              required
            />
          </div>

          {/* Church */}
          <div className="flex flex-col w-[394px] max-w-full mb-4">
            <label className="text-[14px] mb-1">Church</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="text"
              required
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col w-[394px] max-w-full mb-4">
            <label className="text-[14px] mb-1">Amount</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              required
            />
          </div>

          {/* Currency */}
          <div className="flex flex-col w-[394px] max-w-full mb-4">
            <label className="text-[14px] mb-1">Currency</label>
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => toggleDropdown("Select")}
                className="w-[120px] md:w-[140px] lg:w-[394px] h-[36px] border border-[#01438F] rounded-md px-[12px] outline-none bg-white text-[16px] text-gray-600 flex justify-between items-center"
              >
                {selectedCurrency || "Select"}
                <ChevronDown className="w-[16px] h-[16px] text-[#01438F]"/>
              </button>

              {openDropdown === "Select" && (
                <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md">
                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={() => handleCurrencySelect("$ USD")}
                  >
                    <input type="radio" name="currency" className="mr-2" checked={selectedCurrency === "$ USD"} readOnly/> $ USD
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={() => handleCurrencySelect("₱ PHP")}
                  >
                    <input type="radio" name="currency" className="mr-2" checked={selectedCurrency === "₱ PHP"} readOnly/> ₱ PHP
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="font-bold text-[#FCC346] text-[20px] mt-[40px] mb-[180px] flex flex-wrap justify-center">
            <button type="submit" className="w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25">
              ADD
            </button>
          </div>
        </form>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          message="Are you sure you want to add the data?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}