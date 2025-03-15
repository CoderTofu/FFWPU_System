"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/axiosInstance";
import Cookies from "js-cookie";
export default function EditDonation() {
  const params = useParams();
  const router = useRouter();

  // This is the donation ID from the URL
  console.log(params.donationID);
  const [data, setData] = useState({});
  const [member, setMember] = useState({});
  const [church, setChurch] = useState({});
  useEffect(() => {
    axiosInstance.get(`/donations/${params.donationID}`).then((res) => {
      setData(res.data);
      setMember(res.data.Member);
      setChurch(res.data.Church);
    });
  }, []);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsOpen(false);
    router.push("/blessings");
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        (!dropdownButtonRef.current ||
          !dropdownButtonRef.current.contains(event.target as Node))
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
    <div className="min-h-screen flex flex-col items-center px-0 lg:px-[150px] mt-7">
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">Edit Donation</p>
      </div>

      <div className="flex flex-col items-center mt-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Member ID</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={member["Member ID"]}
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Date</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="date"
              value={data.Date}
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Church</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="text"
              value={church.ID}
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Amount</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={data.Amount}
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
                <ChevronDown className="w-[16px] h-[16px] text-[#01438F]" />
              </button>

              {openDropdown === "Select" && (
                <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md">
                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("$ USD", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "$ USD"}
                      readOnly
                    />{" "}
                    $ USD
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("₱ PHP", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "₱ PHP"}
                      readOnly
                    />{" "}
                    ₱ PHP
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("€ EUR", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "€ EUR"}
                      readOnly
                    />{" "}
                    € EUR
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("¥ JPY", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "¥ JPY"}
                      readOnly
                    />{" "}
                    ¥ JPY
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("₩ KRW", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "₩ KRW"}
                      readOnly
                    />{" "}
                    ₩ KRW
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("¥ CNY", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "¥ CNY"}
                      readOnly
                    />{" "}
                    ¥ CNY
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center">
            <button
              type="submit"
              className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
              onSubmit={() => setIsOpen(true)}
            >
              SAVE CHANGES
            </button>
          </div>
        </form>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          message="Are you sure you want to edit the donation?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}
