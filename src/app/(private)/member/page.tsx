"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal"; // Assuming you have a Modal component
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from '@/components/Button';

import { useAlert } from '@/components/context/AlertContext'; // Assuming you have an AlertContext

export default function Member() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/member/add-member');
  }, []);

  const { showAlert } = useAlert();

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const memberQuery = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await fetch('/api/members', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  const dataID = 'ID';

  const columnConfig = {
    lg: [
      'ID',
      'Full Name',
      'Gender',
      'Birthday',
      'Age',
      'Marital Status',
      'Address',
      'Nation',
      'Region',
      'Membership Category',
      'Generation',
      'Blessing Status',
      'Spiritual Birthday',
    ],
    md: ['Member ID', 'Full Name', 'Gender', 'Age'],
    sm: ['Member ID', 'Full Name'],
  };

  const [selectedRow, setSelectedRow] = useState<{ ID: number } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<{ ID: number } | null>(null);

  const queryClient = useQueryClient();

  const handleEditClick = () => {
    if (selectedRow) {
      window.location.href = `/member/edit-member/${selectedRow[dataID]}`;
    }
  };

  const handleAddClick = () => {
    router.push('/member/add-member');
  };

  const handleDeleteClick = () => {
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setIsOpen(true);
    }
  };

  const handleViewClick = () => {
    if (selectedRow) {
      window.location.href = `/member/display-member/${selectedRow[dataID]}`;
    }
  };

  const handleConfirm = async () => {
    console.log('Confirmed!', rowToDelete);
    // Add your deletion logic here
    const response = await fetch(`/api/members/${rowToDelete['ID']}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      queryClient.refetchQueries(['members']);
      showAlert({ type: 'success', message: 'Deleted successfully' });
      window.location.reload();
    } else {
      alert('An error occurred while deleting member: ' + response.statusText);
    }
    setIsOpen(false);
  };

  const filteredData = data.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    if (memberQuery.status === 'success') {
      console.log(memberQuery.data);
      const data = memberQuery.data.map((member) => ({
        ...member,
        Region: member.Region.name,
        Subregion: member.Subregion.name,
      }));
      setData(data);
    } else if (memberQuery.status === 'error') {
      alert('An error occurred while fetching data.');
    }
  }, [memberQuery.data, memberQuery.status]);

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg">
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
      <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
        <Table
          data={filteredData}
          columns={columnConfig}
          rowDoubleClickPath={`/member/display-member`}
          idName={dataID}
          onRowSelect={setSelectedRow}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-between items-center my-7 gap-4">
        <div className="flex flex-wrap gap-3 sm:gap-5">
          <Button type="primary" onClick={handleAddClick}>
            Add
          </Button>
          <Button type="primary" onClick={handleEditClick} disabled={!selectedRow}>
            Edit
          </Button>
          <Button type="primary" onClick={handleDeleteClick} disabled={!selectedRow}>
            Delete
          </Button>
        </div>

        <Button type="outline" onClick={handleViewClick} disabled={!selectedRow}>
          View
        </Button>
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
