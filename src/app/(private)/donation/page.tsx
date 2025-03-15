"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import DonationModals from "@/components/DonationModals";
import { axiosInstance } from "@/app/axiosInstance";
import Cookies from "js-cookie";
interface DataItem {
  "Donation ID": number;
  "Member ID": number;
  Name: string;
  Date: string;
  Church: string;
  Amount: string;
}

export default function Donation() {
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
  // const data: DataItem[] = [
  //   {
  //     "Donation ID": 1001,
  //     "Member ID": 5001,
  //     Name: "Gregorio, Princess Nicole L.",
  //     Date: "2024-02-01",
  //     Church: "Manila Cathedral",
  //     Amount: "PHP 100.50",
  //   },
  //   {
  //     "Donation ID": 1002,
  //     "Member ID": 5122,
  //     Name: "Bilan, Edrill F.",
  //     Date: "2024-02-02",
  //     Church: "San Agustin Church",
  //     Amount: "USD 250.00",
  //   },
  //   {
  //     "Donation ID": 1003,
  //     "Member ID": 5563,
  //     Name: "Jagonoy, Jhon Mar F.",
  //     Date: "2024-08-02",
  //     Church: "Sto. Nino de Pandacan Parish Church",
  //     Amount: "PHP 75.25",
  //   },
  //   {
  //     "Donation ID": 1004,
  //     "Member ID": 5938,
  //     Name: "Balba, Johan Paolo B.",
  //     Date: "2010-03-06",
  //     Church: "St. Jude Parish Church",
  //     Amount: "USD 90.00",
  //   },
  //   {
  //     "Donation ID": 1005,
  //     "Member ID": 7009,
  //     Name: "Sanchez, Princess Aira",
  //     Date: "2015-07-12",
  //     Church: "San Fernando De Dilao Parish Church",
  //     Amount: "PHP 5.00",
  //   },
  //   {
  //     "Donation ID": 1006,
  //     "Member ID": 1039,
  //     Name: "Lagumbay, Lantis Violet F.",
  //     Date: "2003-02-02",
  //     Church: "San Beda Church",
  //     Amount: "USD 1000.00",
  //   },
  //   {
  //     "Donation ID": 1007,
  //     "Member ID": 1098,
  //     Name: "Fulgencio, Sonaj A.",
  //     Date: "2019-10-12",
  //     Church: "Quiapo Church",
  //     Amount: "PHP 1500.50",
  //   },

  //   {
  //     "Donation ID": 1020,
  //     "Member ID": 1100,
  //     Name: "Fulgencio, Juan Paolo.",
  //     Date: "2011-10-01",
  //     Church: "Paco Church",
  //     Amount: "KRW 1200.50",
  //   },
  // ];

  const exchangeRates = {
    USD: 55,
    PHP: 1,
    EUR: 60,
    KRW: 0.042,
    CNY: 0.37,
    JPY: 0.38,
  };

  useEffect(() => {
    axiosInstance
      .get("/donations", {
        headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
      })
      .then((res) => {
        const donations = res.data;

        const simplified = donations.map((donation) => {
          console.log(donation);
          return {
            "Donation ID": donation["Donation ID"],
            "Member ID": donation.Member["Member ID"],
            "Full Name": donation.Member["Full Name"],
            Date: donation.Date,
            Church: donation.Church["Name"],
            Amount: donation.Amount,
          };
        });
        setData(simplified);
        setOriginalData(simplified);
        setSortedData(simplified);
      });
  }, []);

  const column = {
    lg: ["Donation ID", "Member ID", "Full Name", "Date", "Church", "Amount"],
    md: ["Donation ID", "Name", "Date", "Amount"],
    sm: ["Name", "Amount"],
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

  const dataId = "Donation ID";

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/donation/edit-donation/${selectedRow[dataId]}`);
    }
  };

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] mt-8">
      <div className="w-full flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md shadow-black/25 p-4">
        <p className="text-[28px] font-bold">DONATIONS</p>
      </div>

      <div className="w-full flex flex-col mt-4">
        <DonationModals
          openSortDropdown={openSortDropdown}
          toggleSortDropdown={setOpenSortDropdown}
          handleSort={handleSort}
        />
      </div>

      <div className="rounded-lg items-center justify-center mt-4">
        <div className="bg-white">
          <Table
            data={sortedData}
            columns={column}
            onRowSelect={setSelectedRow}
          />
        </div>

        <div className="flex justify-center items-center m-7 gap-5">
          <button
            onClick={() => router.push("/donation/add-donation")}
            className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
          >
            ADD
          </button>

          <button
            onClick={handleEditClick}
            disabled={!selectedRow}
            className={`px-6 py-2 rounded ${
              selectedRow
                ? "bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"
            }`}
          >
            EDIT
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={!selectedRow}
            className={`px-6 py-2 rounded ${
              selectedRow
                ? "bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"
            }`}
          >
            DELETE
          </button>
        </div>

        {showDeleteModal && (
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
              console.log("");
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
