// donation.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
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
  const [openSortDropdown, setOpenSortDropdown] = useState<string | null>(null); // For sorting dropdowns
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

  const handleSort = (key: keyof DataItem, order: "asc" | "desc") => {
    const sorted = [...originalData].sort((a, b) => {
      if (key === "Amount") {
        const aAmount = parseFloat(a.Amount.replace(/[^0-9.]/g, ''));
        const bAmount = parseFloat(b.Amount.replace(/[^0-9.]/g, ''));
        return order === "asc" ? aAmount - bAmount : bAmount - aAmount;
      } else {
        if (a[key] < b[key]) return order === "asc" ? -1 : 1;
        if (a[key] > b[key]) return order === "asc" ? 1 : -1;
        return 0;
      }
    });

    setSortedData(sorted);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setSortedData(originalData);
      return;
    }

    const filtered = originalData.filter((item) =>
      item.Name.toLowerCase().includes(term.toLowerCase()) ||
      item.Church.toLowerCase().includes(term.toLowerCase()) ||
      String(item["Donation ID"]).includes(term) ||
      String(item["Member ID"]).includes(term) ||
      item.Amount.includes(term) ||
      item.Date.includes(term)
    );
    setSortedData(filtered);
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
          handleSort={handleSort}
        />
      </div>

      <div className="overflow-hidden rounded-lg mt-5 mx-auto sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[96%] items-center justify-center">
        <div className="bg-white">
          <Table data={sortedData} columns={column} />
        </div>
      </div>
    </div>
  );
}
