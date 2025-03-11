"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// Donation interface for type safety
interface Donation {
  "Member ID"?: number;
  Date: string;
  Church: string;
  Amount?: number;
  Currency: string;
}

export default function EditDonation() {
  const params = useParams();

  console.log(params.donationID);

  // Initial donation state with added Currency field
  const [donation, setDonation] = useState<Donation>({
    "Member ID": undefined,
    Date: "",
    Church: "",
    Amount: undefined,
    Currency: "PHP", // Default currency
  });

  // Currency options
  const currencyOptions = ["PHP", "USD"];

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setDonation({
      ...donation,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hooray! Form submitted!");
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen flex flex-col">
      {/* Title Section */}
      <div className="bg-white p-4 rounded-md flex justify-center items-center shadow-md shadow-black/25 mt-8 mx-auto max-w-[1450px] w-full">
        <h1 className="text-[28px] font-bold">DONATIONS</h1>
      </div>
      <div className="w-full max-w-md mx-auto mt-8 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Member ID */}
          <div className="mb-6 w-full">
            <label className="block mb-2 font-medium">Member ID</label>
            <input
              type="number"
              name="Member ID"
              value={donation?.["Member ID"]}
              onChange={handleInputChange}
              className="w-full p-2 border border-blue-900 rounded-md"
              placeholder="Enter Member ID"
            />
          </div>

          {/* Date */}
          <div className="mb-6 w-full">
            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              name="Date"
              value={donation.Date}
              onChange={handleInputChange}
              className="w-full p-2 border border-blue-900 rounded-md"
            />
          </div>

          {/* Church */}
          <div className="mb-6 w-full">
            <label className="block mb-2 font-medium">Church</label>
            <input
              type="text"
              name="Church"
              value={donation.Church}
              onChange={handleInputChange}
              className="w-full p-2 border border-blue-900 rounded-md"
              placeholder="Enter church name"
            />
          </div>

          {/* Amount */}
          <div className="mb-6 w-full">
            <label className="block mb-2 font-medium">Amount</label>
            <input
              type="number"
              name="Amount"
              value={donation.Amount}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className="w-full p-2 border border-blue-900 rounded-md"
              placeholder="Enter Amount"
            />
          </div>

          {/* Currency */}
          <div className="mb-6 w-full">
            <label className="block mb-2 font-medium">Currency</label>
            <select
              name="Currency"
              value={donation.Currency}
              onChange={handleInputChange}
              className="w-full p-2 border border-blue-900 rounded-md"
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency === "PHP" ? "₱ PHP" : "$ USD"}
                </option>
              ))}
            </select>
          </div>
          {/* Buttons in center below the form */}
          <div className="flex justify-center gap-10 mt-10 mb-10">
            <button
              type="submit"
              className="bg-blue-900 text-yellow-400 p-3 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
