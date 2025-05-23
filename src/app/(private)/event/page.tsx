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

<<<<<<< HEAD
  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] mt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">
          WORSHIP EVENT INFORMATION
        </p>
      </div>

      <div className="w-full flex flex-wrap items-center justify-between mt-[30px] gap-4">
        <div className="relative w-full sm:w-[310px] h-[29px] ">
          <Search className="absolute left-[10px] top-1/2 transform -translate-y-1/2 text-[#01438F] w-[18px] h-[18px]" />
=======
  const handleAddClick = () => {
    router.push("/event/add-event");
  };

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/event/edit-event/${selectedRow[dataID]}`);
    }
  };

  const handleDeleteClick = () => {
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setShowDeleteModal(true);
    }
  };

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full bg-[#f8fafc] pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">EVENTS INFORMATION</p>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between ">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
>>>>>>> 22a6cef (IN PROGRESS: UI Update)
          <input
            className="w-full h-full pl-[35px] pr-[12px] border border-[#01438F] rounded-md outline-none text-[14px]"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

<<<<<<< HEAD
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[14px]">Filter By:</span>
          <div className="flex items-center gap-4" ref={dropdownRef}>
            {["Year", "Type"].map((filter) => (
              <div key={filter} className="relative">
                <button
                  onClick={() => toggleDropdown(filter)}
                  className="w-[120px] md:w-[140px] lg:w-[160px] h-[29px] border border-[#01438F] rounded-md px-[12px] outline-none bg-white text-[14px] text-gray-500 flex justify-between items-center"
                >
                  {filter}
                  <ChevronDown className="w-[16px] h-[16px] text-gray-500" />
                </button>
                {openDropdown === filter && (
                  <div className="absolute mt-1 w-full bg-white border border-[#01438F] rounded-md shadow-md z-10">
                    {filter === "Type"
                      ? ["Onsite", "Online"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center px-3 py-2 hover:bg-gray-200 text-[14px]"
                          >
                            <input
                              type="radio"
                              name="type"
                              className="mr-2"
                              checked={selectedType === type}
                              onChange={() => setSelectedType(type)}
                            />{" "}
                            {type}
                          </label>
                        ))
                      : ["2023", "2024"].map((year) => (
                          <label
                            key={year}
                            className="flex items-center px-3 py-2 hover:bg-gray-200 text-[14px]"
                          >
                            <input
                              type="radio"
                              name="year"
                              className="mr-2"
                              checked={selectedYear === year}
                              onChange={() => setSelectedYear(year)}
                            />{" "}
                            {year}
                          </label>
                        ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full mt-[25px]">
=======
        {/* INSERT FILTER DROPDOWN HERE */}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
>>>>>>> 22a6cef (IN PROGRESS: UI Update)
        <Table
          data={filteredData}
          columns={columnConfig}
          rowDoubleClickPath="/event"
          idName={dataID}
          onRowSelect={setSelectedRow}
        />
      </div>

      {/* Action Buttons Section */}
      <div className="w-full flex flex-wrap justify-center gap-[22px] mt-[28px] mb-[15px]">
        <button
          onClick={() => router.push("/event/add-event")}
          className="w-20 h-10 flex items-center justify-center rounded mb-4 m-4 bg-[#01438F] text-[#FCC346] hover:bg-blue-600 font-bold text-base"
        >
          ADD
        </button>
        <button
          onClick={() =>
            selectedRow &&
            router.push(`/event/edit-event/${selectedRow[dataID]}`)
          }
          disabled={!selectedRow}
          className={`w-20 h-10 flex items-center justify-center rounded mb-4 m-4 ${
            selectedRow
              ? "bg-[#01438F] text-[#FCC346] hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } font-bold text-base`}
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
          className={`w-20 h-10 flex items-center justify-center rounded mb-4 m-4 ${
            selectedRow
              ? "bg-[#01438F] text-[#FCC346] hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } font-bold text-base`}
        >
          DELETE
        </button>
      </div>

      {/* Delete Confirmation Modal */}
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
