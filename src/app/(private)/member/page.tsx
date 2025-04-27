"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal"; // Assuming you have a Modal component
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Member() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const memberQuery = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch("/api/members", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const dataID = "ID";

  const columnConfig = {
    lg: [
      "ID",
      "Full Name",
      "Gender",
      "Birthday",
      "Age",
      "Marital Status",
      "Address",
      "Nation",
      "Region",
      "Membership Category",
      "Generation",
      "Blessing Status",
      "Spiritual Birthday",
    ],
    md: ["Member ID", "Full Name", "Gender", "Age"],
    sm: ["Member ID", "Full Name"],
  };

  const [selectedRow, setSelectedRow] = useState<{ ID: number } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<{ ID: number } | null>(null);
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/member/edit-member/${selectedRow[dataID]}`);
    }
  };

  const handleAddClick = () => {
    router.push("/member/add-member");
  };

  const handleDeleteClick = () => {
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setIsOpen(true);
    }
  };

  const handleConfirm = async () => {
    console.log("Confirmed!", rowToDelete);
    // Add your deletion logic here
    const response = await fetch(`/api/members/${rowToDelete["ID"]}`, {
      method: "DELETE",
    });
    if (response.ok) {
      queryClient.refetchQueries(["members"]);
      alert("Deleted successfully");
    } else {
      alert("An error occurred while deleting member: " + response.statusText);
    }
    setIsOpen(false);
  };

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    if (memberQuery.status === "success") {
      console.log(memberQuery.data);
      const data = memberQuery.data.map((member) => ({
        ...member,
        Region: member.Region.name,
        Subregion: member.Subregion.name,
      }));
      setData(data);
    } else if (memberQuery.status === "error") {
      alert("An error occurred while fetching data.");
    }
  }, [memberQuery.data, memberQuery.status]);

  return (
    <div className="px-0 md:px-[150px] mt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">MEMBERS INFORMATION</p>
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
          rowDoubleClickPath={`/member/display-member`}
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
