"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { Search, ChevronDown } from "lucide-react";
import Modal from "@/components/Modal";

export default function EventInfo() {
  const router = useRouter();

  // Sample event data for the table
  const data = [
    {
      "Worship ID": 2001,
      Name: "Sunday Service",
      Date: "2024-02-01",
      Church: "Manila Cathedral",
      Type: "Onsite",
    },
    {
      "Worship ID": 2002,
      Name: "Bible Study",
      Date: "2024-02-02",
      Church: "San Agustin Church",
      Type: "Online",
    },
    {
      "Worship ID": 2003,
      Name: "Youth Fellowship",
      Date: "2024-02-03",
      Church: "Sto. Nino de Pandacan Parish Church",
      Type: "Onsite",
    },
    {
      "Worship ID": 2001,
      Name: "Sunday Service",
      Date: "2024-02-01",
      Church: "Manila Cathedral",
      Type: "Onsite",
    },
    {
      "Worship ID": 2002,
      Name: "Bible Study",
      Date: "2024-02-02",
      Church: "San Agustin Church",
      Type: "Online",
    },
    {
      "Worship ID": 2003,
      Name: "Youth Fellowship",
      Date: "2024-02-03",
      Church: "Sto. Nino de Pandacan Parish Church",
      Type: "Onsite",
    },
    {
      "Worship ID": 2001,
      Name: "Sunday Service",
      Date: "2024-02-01",
      Church: "Manila Cathedral",
      Type: "Onsite",
    },
    {
      "Worship ID": 2002,
      Name: "Bible Study",
      Date: "2024-02-02",
      Church: "San Agustin Church",
      Type: "Online",
    },
    {
      "Worship ID": 2003,
      Name: "Youth Fellowship",
      Date: "2024-02-03",
      Church: "Sto. Nino de Pandacan Parish Church",
      Type: "Onsite",
    },
    {
      "Worship ID": 2001,
      Name: "Sunday Service",
      Date: "2024-02-01",
      Church: "Manila Cathedral",
      Type: "Onsite",
    },
    {
      "Worship ID": 2002,
      Name: "Bible Study",
      Date: "2024-02-02",
      Church: "San Agustin Church",
      Type: "Online",
    },
    {
      "Worship ID": 2003,
      Name: "Youth Fellowship",
      Date: "2024-02-03",
      Church: "Sto. Nino de Pandacan Parish Church",
      Type: "Onsite",
    },
  ];

  const dataID = "Worship ID";

  // Column configuration for responsive table
  const columnConfig = {
    lg: ["Worship ID", "Name", "Date", "Church", "Type"],
    md: ["Name", "Date", "Church", "Type"],
    sm: ["Name", "Church"],
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

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
    <div className="bg-[#D9D9D9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[1420px] h-[72px] mt-[15px] bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-[28px] font-bold">WORSHIP EVENT INFORMATION</p>
      </div>

      <div className="w-full max-w-[1350px] flex flex-wrap items-center justify-between mt-[30px] gap-4">
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
      <div className="w-full max-w-[1350px] mt-[25px]">
        <Table
          data={filteredData}
          columns={columnConfig}
          rowDoubleClickPath="/event"
          idName={dataID}
          onRowSelect={(row) => setSelectedRow(row)}
        />
      </div>

      {/* Action Buttons Section */}
      <div className="w-full max-w-6xl flex flex-wrap justify-center gap-[22px] mt-[28px] mb-[15px]">
        <button
          onClick={() => router.push("/event/add-event")}
          className="w-[106px] h-[40px] bg-[#01438F] text-[#FCC346] text-[16px] font-bold rounded-md shadow-md"
        >
          ADD
        </button>
        <button
          onClick={() =>
            selectedRow &&
            router.push(`/event/edit-event/${selectedRow[dataID]}`)
          }
          disabled={!selectedRow}
          className={`w-[106px] h-[40px] ${
            selectedRow
              ? "bg-[#01438F] text-[#FCC346]"
              : "bg-[#01438F] text-[#FCC346] cursor-not-allowed"
          } text-[16px] font-bold rounded-md shadow-md`}
        >
          EDIT
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={!selectedRow}
          className={`w-[106px] h-[40px] ${
            selectedRow
              ? "bg-[#01438F] text-[#FCC346]"
              : "bg-[#01438F] text-[#FCC346] cursor-not-allowed"
          } text-[16px] font-bold rounded-md shadow-md`}
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
