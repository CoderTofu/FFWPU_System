"use client";

import { useState, useRef, useEffect, use } from "react";
import Modal from "@/components/Modal";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function AddDonation() {
  const router = useRouter();
  const [churches, setChurches] = useState([]);
  const [church, setChurch] = useState(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    member: null,
    date: null,
    church: null,
    amount: null,
    currency: null,
  });
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const churchQuery = useQuery({
    queryKey: ["churches"],
    queryFn: async () => {
      const res = await fetch("/api/church", { method: "GET" });
      if (!res.ok) {
        throw new Error("Error while fetching churches");
      }
      return await res.json();
    },
  });

  useEffect(() => {
    if (churchQuery.status === "success") {
      setChurches(churchQuery.data);
    } else if (churchQuery.status === "error") {
      alert(churchQuery.error.message);
    }
  }, [churchQuery.data, churchQuery.status]);

  const handleConfirm = async () => {
    console.log("Confirmed!");
    console.log(formData);
    setIsOpen(false);

    const res = await fetch("/api/donations", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("successfully added donation");
      router.push("/donation");
    } else {
      alert("An error occurred: " + res.statusText);
    }
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
    setFormData({ ...formData, currency });
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-0 lg:px-[150px] mt-7">
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">Add Donation</p>
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
              onChange={(e) =>
                setFormData({ ...formData, member: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Date</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="date"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          {/* <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4">
            <label className="text-[14px] mb-1">Church</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none"
              type="text"
              
              required
            />
          </div> */}

          <label className="block font-medium">Church</label>
          <div
            onClick={() => toggleDropdown("church")}
            className="relative flex flex-col justify-start items-start bg-white border border-[#01438F] rounded p-2 hover:cursor-pointer "
          >
            <div className="flex w-full justify-between">
              {!church ? (
                <button>Select</button>
              ) : (
                <button> {`${church.Name} (${church.Country})`}</button>
              )}
              {openDropdown === "church" ? (
                <ChevronUp style={{ color: "#01438F" }} />
              ) : (
                <ChevronDown style={{ color: "#01438F" }} />
              )}
            </div>
            {openDropdown === "church" && (
              <div className="absolute mt-10 flex flex-col w-full max-h-32 overflow-y-auto bg-white border border-[#01438F] rounded ">
                {churches.map((val) => {
                  return (
                    <button
                      key={val.ID}
                      className="hover:bg-gray-200 w-full text-left rounded p-2"
                      onClick={() => {
                        setChurch(val);
                        setFormData({ ...formData, church: val.ID });
                        toggleDropdown("church");
                      }}
                    >
                      {`${val.Name} (${val.Country})`}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col w-[394px] max-w-[100%] min-w-[50%] flex-shrink-1 mb-4 mt-4">
            <label className="text-[14px] mb-1">Amount</label>
            <input
              className="w-full h-[36px] px-2 border border-[#01438F] rounded-md outline-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
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
                    onClick={(event) => handleCurrencySelect("USD", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "USD"}
                      readOnly
                    />{" "}
                    $ USD
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("PHP", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "PHP"}
                      readOnly
                    />{" "}
                    ₱ PHP
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("EUR", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "EUR"}
                      readOnly
                    />{" "}
                    € EUR
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("JPY", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "JPY"}
                      readOnly
                    />{" "}
                    ¥ JPY
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("KRW", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "KRW"}
                      readOnly
                    />{" "}
                    ₩ KRW
                  </div>

                  <div
                    className="flex items-center px-3 py-2 hover:bg-gray-200 hover:rounded-sm cursor-pointer"
                    onClick={(event) => handleCurrencySelect("CNY", event)}
                  >
                    <input
                      type="radio"
                      name="currency"
                      className="mr-2"
                      checked={selectedCurrency === "CNY"}
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
  );
}
