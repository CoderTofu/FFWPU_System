"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Donation interface for type safety
interface Donation {
  "Member ID": number;
  Date: string;
  Church: string;
  Amount: number;
  Currency: string;
}

export default function EditDonation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial donation state with added Currency field
  const [donation, setDonation] = useState<Donation>({
    "Member ID": 0,
    Date: "",
    Church: "",
    Amount: 0,
    Currency: "PHP", // Default currency
  });

  // Currency options
  const currencyOptions = ["PHP", "USD"];
  const usdToPhp = 55.6;

  // Dummy data (replace with actual data source in real application)
  const donationData = [
    {
      "Donation ID": 1001,
      "Member ID": 5001,
      Name: "Gregorio, Princess Nicole L.",
      Date: "2024-02-01",
      Church: "Manila Cathedral",
      Amount: 56.6,
      Currency: "PHP",
    },
    {
      "Donation ID": 1002,
      "Member ID": 5002,
      Name: "Bilan, Edrill F.",
      Date: "2024-02-02",
      Church: "San Agustin Church",
      Amount: 250.0,
      Currency: "PHP",
    },
    {
      "Donation ID": 1003,
      "Member ID": 5003,
      Name: "Jagonoy, Jhon Mar F.",
      Date: "2024-02-03",
      Church: "Sto. Nino de Pandacan Parish Church",
      Amount: 75.25,
      Currency: "USD",
    },
  ];

  // Effect to load donation data when component mounts
  useEffect(() => {
    // Get the Donation ID from URL query parameters
    const donationIdParam = searchParams.get("id");

    console.log("Donation ID from URL:", donationIdParam); // Debug log

    // Check if donation ID is present
    if (!donationIdParam) {
      console.error("No donation ID provided");
      router.push("/donation");
      return;
    }

    // Convert donation ID to number
    const donationId = parseInt(donationIdParam, 10);

    // Find the donation in the sample data
    const selectedDonation = donationData.find(
      (d) => d["Donation ID"] === donationId
    );

    console.log("Selected Donation:", selectedDonation); // Debug log

    // If donation found, set the state
    if (selectedDonation) {
      setDonation(selectedDonation);
    } else {
      console.error("No donation found with ID:", donationId);
      // If no donation found, redirect back to donations page
      router.push("/donation");
    }
  }, [searchParams, router]);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // If currency is changed, adjust the amount
    if (name === "Currency") {
      let newAmount = donation.Amount;

      if (value === "USD" && donation.Currency === "PHP") {
        // Convert from PHP to USD and round to 2 decimal places
        newAmount = parseFloat((donation.Amount / usdToPhp).toFixed(2));
      } else if (value === "PHP" && donation.Currency === "USD") {
        // Convert from USD to PHP and round to 2 decimal places
        newAmount = parseFloat((donation.Amount * usdToPhp).toFixed(2));
      }

      setDonation({
        ...donation,
        [name]: value,
        Amount: newAmount,
      });
    } else if (name === "Amount") {
      // Update the amount directly
      setDonation({
        ...donation,
        [name]: name === "Amount" ? parseFloat(value) : parseInt(value, 10),
      });
    } else {
      setDonation({
        ...donation,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving donation:", donation);
    // Here you would typically send the updated donation to your backend
    // For this example, we'll just redirect back to the donations page
    router.push("/donation");
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
              value={donation["Member ID"]}
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
