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

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencySelect = (currency: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Stop event propagation
    setSelectedCurrency(currency);
    setOpenDropdown(null);
  };

  return (
    <div>
      <div className="w-full mx-auto max-w-[1450px] flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md shadow-black/25 p-4 mt-8">
        <p className="text-[28px] font-bold">DONATIONS</p>
      </div>

      <div className="flex flex-col items-center mt-[63px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          {/* ... (rest of the form) ... */}

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
                    onClick={(event) => handleCurrencySelect("$ USD", event)}
                  >
                    <input type="radio" name="currency" className="mr-2" checked={selectedCurrency === "$ USD"} readOnly/> $ USD
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("₱ PHP", event)}
                  >
                    <input type="radio" name="currency" className="mr-2" checked={selectedCurrency === "₱ PHP"} readOnly/> ₱ PHP
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ... (rest of the form) ... */}
        </form>

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