"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { Search } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
interface DataItem {
  ID: number;
  Member: number;
  Name: string;
  Date: string;
  Church: string;
  Amount: string;
}

export default function Donation() {
    const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedRow, setSelectedRow] = useState(null);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [openCurrencyDropdown, setOpenCurrencyDropdown] =
    useState<boolean>(false); // For currency dropdown
  const [openSortDropdown, setOpenSortDropdown] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortedData, setSortedData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);
  const [data, setData] = useState([]);
  const [rowToDelete, setRowToDelete] = useState(null);
  const exchangeRates = {
    USD: 55,
    PHP: 1,
    EUR: 60,
    KRW: 0.042,
    CNY: 0.37,
    JPY: 0.38,
  };

  const donationQuery = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await fetch("/api/donations", { method: "GET" });
      if (!res.ok) {
        throw new Error("Error while fetching donations");
      }
      return await res.json();
    },
  });

  useEffect(() => {
    if (donationQuery.status === "success") {
      const data = donationQuery.data.map((donation) => ({
        ...donation,
        "Member ID": donation.Member.ID,
        "Full Name": donation.Member["Full Name"],
        Church: donation.Church.Name,
      }));
      setData(data);
      setSortedData(data);
    } else if (donationQuery.status === "error") {
      alert(donationQuery.error.message);
    }
  }, [donationQuery.data, donationQuery.status]);

  const column = {
    lg: [
      "ID",
      "Member ID",
      "Full Name",
      "Date",
      "Church",
      "Amount",
      "Currency",
    ],
    md: ["ID", "Full Name", "Date", "Amount"],
    sm: ["Full Name", "Amount"],
  };

  const getAmountInPHP = (amount: string): number => {
    const [currency, value] = amount.split(" ");
    const numericValue = parseFloat(value);

    if (!exchangeRates[currency as keyof typeof exchangeRates]) {
      console.warn(`Unknown currency: ${currency}`);
      return NaN;
    }

    return numericValue * exchangeRates[currency as keyof typeof exchangeRates];
  };

  const handleSort = (key: keyof DataItem, order: "asc" | "desc") => {
    setSortedData((prevData) => {
      const sorted = [...prevData].sort((a, b) => {
        if (key === "Amount") {
          const aAmount = getAmountInPHP(a[key]);
          const bAmount = getAmountInPHP(b[key]);

          if (isNaN(aAmount) && isNaN(bAmount)) return 0;
          if (isNaN(aAmount)) return 1;
          if (isNaN(bAmount)) return -1;

          return order === "asc" ? aAmount - bAmount : bAmount - aAmount;
        }

        if (typeof a[key] === "string" && typeof b[key] === "string") {
          return order === "asc"
            ? (a[key] as string).localeCompare(b[key] as string)
            : (b[key] as string).localeCompare(a[key] as string);
        }

        if (typeof a[key] === "number" && typeof b[key] === "number") {
          return order === "asc" ? a[key] - b[key] : b[key] - a[key];
        }

        return 0;
      });
      return sorted;
    });
  };

  const dataId = "ID";

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/donation/edit-donation/${selectedRow[dataId]}`);
    }
  };

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">DONATIONS INFORMATION</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between ">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            className="w-full h-7 pl-8 border border-[#01438F] rounded outline-none text-sm"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#01438F] w-4 h-5" />
        </div>

        {/* INSERT FILTER DROPDOWN HERE */}
      </div>

      <div className="rounded-lg items-center justify-center mt-4">
        <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
          <Table data={sortedData} columns={column} onRowSelect={setSelectedRow} />
        </div>

        <div className="flex justify-center items-center m-7 gap-5">
          <button
            onClick={() => router.push('/donation/add-donation')}
            className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
          >
            ADD
          </button>

          <button
            onClick={handleEditClick}
            disabled={!selectedRow}
            className={`px-6 py-2 rounded ${
              selectedRow
                ? 'bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed font-bold'
            }`}
          >
            EDIT
          </button>

          <button
            onClick={() => {
              if (selectedRow) {
                setRowToDelete(selectedRow);
                setShowDeleteModal(true);
              }
            }}
            disabled={!selectedRow}
            className={`px-6 py-2 rounded ${
              selectedRow
                ? 'bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed font-bold'
            }`}
          >
            DELETE
          </button>
        </div>

        {showDeleteModal && (
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={async () => {
              const res = await fetch(`/api/donations/${rowToDelete['ID']}`, {
                method: 'DELETE',
              });
              if (res.ok) {
                location.reload();
              } else {
                alert('An error occurred while deleting: ' + res.statusText);
              }
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
