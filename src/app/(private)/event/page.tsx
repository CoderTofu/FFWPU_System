"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { Search } from "lucide-react";
import Modal from "@/components/Modal";
import FilterEventModal from "@/components/FilterEventModal";
import Button from "@/components/Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function EventInfo() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // fetch data
  const { data: raw, status } = useQuery({
    queryKey: ["worships"],
    queryFn: async () => {
      const res = await fetch("/api/worship");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (status === "success") {
      setData(
        raw.map((e: any) => ({
          ...e,
          Church: e.Church.Name,
        }))
      );
    }
  }, [raw, status]);

  // filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    worshipType: "",
  });

  // apply filters
  const filteredData = data.filter((ev) => {
    // search by name
    if (
      !ev["Event Name"]
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase())
    )
      return false;

    // type filter
    if (
      filters.worshipType &&
      ev["Worship Type"] !== filters.worshipType
    )
      return false;

    // date range
    if (filters.startDate && ev.Date < filters.startDate) return false;
    if (filters.endDate && ev.Date > filters.endDate) return false;

    return true;
  });

  // table selection & delete modal
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  // handlers
  const applyFilters = (f: typeof filters) => setFilters(f);
  const resetFilters = () =>
    setFilters({ startDate: "", endDate: "", worshipType: "" });

  return (
    <div className="px-0 md:px-[150px] min-h-screen bg-[#f8fafc] pt-8">
      {/* HEADER */}
      <div className="w-full p-4 bg-white rounded-md shadow-lg border-2 border-[#01438F] flex justify-center">
        <p className="text-3xl font-bold uppercase">Events Information</p>
      </div>

      {/* SEARCH + FILTER BTN */}
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between">
        <div className="relative w-full sm:max-w-md flex items-center">
          <Search className="absolute left-2 text-[#01438F] w-4 h-5" />
          <input
            type="text"
            className="w-full pl-8 h-9 border border-[#01438F] rounded text-sm"
            placeholder="Search Event Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          className="!py-2 !px-8"
          onClick={() => setFilterModalOpen(true)}
        >
          Ⴤ Filters
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
        <Table
          data={filteredData}
          columns={{
            lg: ["ID", "Event Name", "Date", "Church", "Worship Type"],
            md: ["Event Name", "Date", "Church", "Worship Type"],
            sm: ["Event Name", "Church"],
          }}
          rowDoubleClickPath="/event"
          idName="ID"
          onRowSelect={setSelectedRow}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap justify-between items-center my-7 gap-4">
        <div className="flex flex-wrap gap-3">
          <Button type="primary" onClick={() => router.push("/event/add-event")}>
            Add
          </Button>
          <Button
            type="primary"
            onClick={() =>
              selectedRow &&
              router.push(`/event/edit-event/${selectedRow["ID"]}`)
            }
            disabled={!selectedRow}
          >
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => setDeleteModal(true)}
            disabled={!selectedRow}
          >
            Delete
          </Button>
        </div>
        <Button
          type="outline"
          onClick={() =>
            selectedRow && router.push(`/event/${selectedRow["ID"]}`)
          }
          disabled={!selectedRow}
        >
          View
        </Button>
      </div>

      {/* DELETE CONFIRM */}
      {deleteModal && (
        <Modal
          isOpen
          onClose={() => setDeleteModal(false)}
          onConfirm={async () => {
            await fetch(`/api/worship/${selectedRow["ID"]}`, {
              method: "DELETE",
            });
            queryClient.invalidateQueries(["worships"]);
            setDeleteModal(false);
          }}
          message="Are you sure you want to delete this event?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}

      {/* EVENT FILTER MODAL */}
      <FilterEventModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </div>
  );
}
