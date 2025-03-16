"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { Search, ChevronDown } from "lucide-react";
import Modal from "@/components/Modal";
import { axiosInstance } from "@/app/axiosInstance";

export default function EventInfo() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      const resp = await fetch("/api/event", { method: "GET" });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        setData(data);
      } else {
        alert("Error while fetching events: " + resp.statusText);
      }
    })();
  }, []);

  const dataID = "Worship ID";

  // Column configuration for responsive table
  const columnConfig = {
    lg: ["Worship ID", "Name", "Date", "Church Name", "Worship Type"],
    md: ["Name", "Date", "Church Name", "Worship Type"],
    sm: ["Name", "Church Name"],
  };

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
          <input
            className="w-full h-full pl-[35px] pr-[12px] border border-[#01438F] rounded-md outline-none text-[14px]"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
          className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
        >
          ADD
        </button>
        <button
          onClick={() =>
            selectedRow &&
            router.push(`/event/edit-event/${selectedRow[dataID]}`)
          }
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
          onClick={() => {
            if (selectedRow) {
              setRowToDelete(selectedRow);
              setShowDeleteModal(true);
            }
          }}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            console.log("Deleting event...");
            axiosInstance
              .delete(`/worship/${rowToDelete["Worship ID"]}`)
              .then(() => location.reload());
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
