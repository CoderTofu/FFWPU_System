"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { Search, ChevronDown } from "lucide-react";
import Modal from "@/components/Modal";
import { axiosInstance } from "@/app/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function EventInfo() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const eventQuery = useQuery({
    queryKey: ["worships"],
    queryFn: async () => {
      const res = await fetch("/api/worship", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  useEffect(() => {
    if (eventQuery.status === "success") {
      const data = eventQuery.data.map((event) => ({
        ...event,
        Church: event.Church.Name,
      }));
      setData(data);
    } else if (eventQuery.status === "error") {
      alert("An error occurred while fetching data.");
    }
  }, [eventQuery.data, eventQuery.status]);

  const dataID = "ID";

  // Column configuration for responsive table
  const columnConfig = {
    lg: ["ID", "Event Name", "Date", "Church", "Worship Type"],
    md: ["Event Name", "Date", "Church Name", "Worship Type"],
    sm: ["Event Name", "Church Name"],
  };
  const queryClient = useQueryClient();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

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

  const filteredData = data.filter(
    (event) =>
      Object.values(event).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (selectedType ? event.Type === selectedType : true) &&
      (selectedYear ? event.Date.startsWith(selectedYear) : true)
  );

  const handleAddClick = () => {
    router.push("/event/add-event")
  }

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/event/edit-event/${selectedRow[dataID]}`)
    }
  }

  const handleDeleteClick = () => {
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setShowDeleteModal(true);
    }
  }

  return (
    <div className="px-0 md:px-[150px] mt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">WORSHIP EVENT INFORMATION</p>
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
      <div className="overflow-hidden rounded-lg bg-white mt-6">
        <Table
          data={filteredData}
          columns={columnConfig}
          rowDoubleClickPath="/event"
          idName={dataID}
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
      {showDeleteModal && (
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={async () => {
              console.log("Deleting event...");
              const resp = await fetch(`/api/worship/${rowToDelete["ID"]}`, {
                method: "DELETE",
              });
              if (resp.ok) {
                queryClient.refetchQueries(["worships"]);
              } else {
                alert(
                  "An error occurred while deleting worship: " + resp.statusText
                );
              }
              setShowDeleteModal(false);
            }}
            message="Are you sure you want to delete this worship event?"
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}
    </div>
  );
}
