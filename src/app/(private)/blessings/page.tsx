"use client";

import { useState, useRef, useEffect } from "react";
import Table from "@/components/Table";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { Search, ChevronDown } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export default function ViewBlessing() {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<{
    ID: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [blessings, setBlessings] = useState([]);
  const [rowToDelete, setRowToDelete] = useState(null);
  const blessingQuery = useQuery({
    queryKey: ["blessings"],
    queryFn: async () => {
      const res = await fetch("/api/blessings/", { method: "GET" });
      if (!res.ok) {
        throw new Error("An error occurred while fetching blessings");
      }
      return await res.json();
    },
  });

  useEffect(() => {
    if (blessingQuery.status === "success") {
      setBlessings(blessingQuery.data);
    } else if (blessingQuery.status === "error") {
      alert(blessingQuery.error.message);
    }
  }, [blessingQuery.data, blessingQuery.status]);

  const columns = {
    lg: ["ID", "Date", "Name", "Chaenbo"],
    md: ["ID", "Date", "Name"],
    sm: ["ID", "Date"],
  };

  // DATA ID
  const dataId = "ID";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = blessings.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/blessings/edit-blessing/${selectedRow[dataId]}`);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleConfirm = async () => {
    // if (selectedRow) {
    //   setBlessings(
    //     blessings.filter(
    //       (item) => item["Blessing ID"] !== selectedRow["Blessing ID"]
    //     )
    //   );
    // }

    const res = await fetch(`/api/blessings/${rowToDelete["ID"]}`, {
      method: "DELETE",
    });
    if (res.ok) {
      queryClient.refetchQueries(["blessings"]);
    } else {
      alert("An error occurred while deleting blessing: " + res.statusText);
    }
    setIsOpen(false);
  };

  const handleAddClick = () => {
    router.push("/blessings/add-blessing");
  };

  const handleDeleteClick = () => {
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setIsOpen(true);
    }
  };

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">BLESSINGS INFORMATION</p>
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

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
        <Table
          data={filteredData}
          columns={columns}
          rowDoubleClickPath="/blessings"
          idName={dataId}
          onRowSelect={setSelectedRow}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center items-center m-7 gap-5">
        <button
          className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
          onClick={handleAddClick}
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
          onClick={handleDeleteClick}
          disabled={!selectedRow}
          className={`px-4 py-2 rounded ${
            selectedRow
              ? "bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed font-bold"
          }`}
        >
          DELETE
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        message="Are you sure you want to delete the data?"
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
}
