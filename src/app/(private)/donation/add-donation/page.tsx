"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";
<<<<<<< HEAD
import { ChevronDown } from 'lucide-react';
=======
>>>>>>> 841164c (added add-donation  layouts & pop-ups)

export default function AddDonation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
=======
>>>>>>> 841164c (added add-donation  layouts & pop-ups)

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsOpen(false);
<<<<<<< HEAD
  };

=======
  }

  // Toggle dropdown visibility
>>>>>>> 841164c (added add-donation  layouts & pop-ups)
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

<<<<<<< HEAD
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        (!dropdownButtonRef.current || !dropdownButtonRef.current.contains(event.target as Node)) // Check if target is not the dropdown button
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdown]);

  const handleCurrencySelect = (currency: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCurrency(currency);
    setOpenDropdown(null);
  };

  return (
    <div>
      <div className="w-full mx-auto max-w-[1450px] flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md shadow-black/25 p-4 mt-8">
        <p className="text-[28px] font-bold">ADD DONATION</p>
      </div>

      <div className="flex flex-col items-center mt-[63px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Member ID</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Date</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="date"
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Church</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="text"
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Amount</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-[14px] mb-1">Currency</label>
            <div ref={dropdownRef} className="relative">
              <button
                ref={dropdownButtonRef}
                onClick={() => toggleDropdown("Select")}
                className="w-[394px] h-[36px] border border-[#01438F] rounded-md px-[12px] outline-none
                 bg-white text-[16px] text-black flex justify-between items-center
                 max-w-[100%] min-w-[50%] flex-shrink-1"
                type="button" 
              >
                {selectedCurrency || "Select"}
                <ChevronDown className="w-[16px] h-[16px] text-[#01438F]"/>
              </button>

              {openDropdown === "Select" && (
                <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md">
                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("USD", event)}>
                    <input type="radio" name="currency" className="mr-2" checked={selectedCurrency === "USD"} readOnly/> USD
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("PHP", event)}>
                    <input type="radio" name="currency" className="mr-2" checked={selectedCurrency === "PHP"} readOnly/> PHP
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="font-bold text-[#FCC346] text-[20px] mt-[40px] mb-[180px] flex flex-wrap justify-center">
            <button type="submit" className="w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25">
              ADD
            </button>
          </div>
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
=======
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
>>>>>>> 841164c (added add-donation  layouts & pop-ups)
  );
}