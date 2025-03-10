"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import DonationModals from "@/components/DonationModals";

interface DataItem {
  "Donation ID": number;
  "Member ID": number;
  Name: string;
  Date: string;
  Church: string;
  Amount: string;
}

export default function Donation() {
  const [selectedRow, setSelectedRow] = useState<{ ID: number } | null>(null);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [openSortDropdown, setOpenSortDropdown] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortedData, setSortedData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);

  const data: DataItem[] = [
    { "Donation ID": 1001, "Member ID": 5001, Name: "Gregorio, Princess Nicole L.", Date: "2024-02-01", Church: "Manila Cathedral", Amount: "PHP 100.50" },
    { "Donation ID": 1002, "Member ID": 5122, Name: "Bilan, Edrill F.", Date: "2024-02-02", Church: "San Agustin Church", Amount: "USD 250.00" },
    { "Donation ID": 1003, "Member ID": 5563, Name: "Jagonoy, Jhon Mar F.", Date: "2024-08-02", Church: "Sto. Nino de Pandacan Parish Church", Amount: "PHP 75.25" },
    { "Donation ID": 1004, "Member ID": 5938, Name: "Balba, Johan Paolo B.", Date: "2010-03-06", Church: "St. Jude Parish Church", Amount: "USD 90.00" },
    { "Donation ID": 1005, "Member ID": 7009, Name: "Sanchez, Princess Aira", Date: "2015-07-12", Church: "San Fernando De Dilao Parish Church", Amount: "PHP 5.00" },
    { "Donation ID": 1006, "Member ID": 1039, Name: "Lagumbay, Lantis Violet F.", Date: "2003-02-02", Church: "San Beda Church", Amount: "USD 1000.00" },
    { "Donation ID": 1007, "Member ID": 1098, Name: "Fulgencio, Sonaj A.", Date: "2019-10-12", Church: "Quiapo Church", Amount: "PHP 1500.50" },
  ];

  useEffect(() => {
    setOriginalData(data);
    setSortedData(data);
  }, []);

  const column = {
    lg: ["Donation ID", "Member ID", "Name", "Date", "Church", "Amount"],
    md: ["Donation ID", "Name", "Date", "Amount"],
    sm: ["Name", "Amount"],
  };

  const toggleSortDropdown = (dropdown: string | null) => {
    setOpenSortDropdown(openSortDropdown === dropdown ? null : dropdown);
  };

  // Sort function to handle the sorting by amount
  const handleSort = (key: keyof DataItem, order: "asc" | "desc") => {
    const exchangeRates = {
      USD: 55, // Example: 1 USD = 55 PHP
      PHP: 1,
    };

    const getAmountInPHP = (amount: string) => {
      const [currency, value] = amount.split(" ");
      return parseFloat(value) * exchangeRates[currency as keyof typeof exchangeRates];
    };

    const sorted = [...sortedData].sort((a, b) => {
      const aAmount = getAmountInPHP(a.Amount);
      const bAmount = getAmountInPHP(b.Amount);

      if (order === "asc") {
        return aAmount - bAmount;
      } else {
        return bAmount - aAmount;
      }
    });

    setSortedData(sorted); // Update sorted data
  };

  const handleAddClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/donation/add-donation');
    }, 400);
  };

  const handleEditClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/donation/edit-donation');
    }, 400);
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen flex flex-col">
      <div className="w-full mx-auto max-w-[1450px] flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md shadow-black/25 p-4 mt-8">
        <p className="text-[28px] font-bold">DONATIONS</p>
      </div>

      <div className="w-full max-w-6xl flex flex-wrap items-start justify-start gap-4 p-4 mt-6 ml-[18px]">
        <DonationModals
          openSortDropdown={openSortDropdown}
          toggleSortDropdown={toggleSortDropdown}
          handleSort={handleSort} // Pass handleSort here
        />
      </div>

      <div className="overflow-hidden rounded-lg mt-5 mx-auto sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[96%] items-center justify-center">
        <div className="bg-white">
          <Table data={sortedData} columns={column} onRowSelect={setSelectedRow} />
        </div>

        <div className="font-bold text-[#FCC346] text-[20px] mt-[32px] mb-[180px] flex flex-wrap justify-center gap-[22px]">
          <button onClick={handleAddClick} className="w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25">
            ADD
          </button>

          <button
            onClick={() => { console.log(selectedRow); setSelectedRow(null); handleEditClick() }}
            disabled={!selectedRow}
            className={`${selectedRow ? "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25" : "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25 opacity-50 cursor-not-allowed"}`}
          >
            EDIT
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={!selectedRow}
            className={`${selectedRow ? "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25" : "w-[101px] bg-[#01438F] p-2 rounded-sm shadow-md shadow-black/25 opacity-50 cursor-not-allowed"}`}
          >
            DELETE
          </button>
        </div>

        {showDeleteModal && (
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => { console.log(""); setShowDeleteModal(false); }}
          />
        )}
      </div>
    </div>
  );
}