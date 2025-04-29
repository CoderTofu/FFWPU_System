// Updated Member page with functional search + filter modal

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import FilterModal from '@/components/FilterMemberModal';
import { useAlert } from '@/components/context/AlertContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Member() {
  const { showAlert } = useAlert();

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    region: '',
    generation: '',
    nation: '',
    age: '',
    maritalStatus: '',
    membershipCategory: '',
    gender: '',
  });

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
    window.location.href = '/member/add-member';
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

  const filteredData = data.filter((member) => {
    console.log('data', member['Membership Category'] === filters.membershipCategory);

    const matchesSearch = member['Full Name']?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      !filters.region || member.Region?.toLowerCase().includes(filters.region.toLowerCase());
    const matchesGeneration = !filters.generation || member['Generation'] === filters.generation;
    const matchesAge = !filters.age || member.Age?.toString() < filters.age;
    const matchesMaritalStatus =
      !filters.maritalStatus || member['Marital Status'] === filters.maritalStatus;
    const membershipCategory =
      !filters.membershipCategory || member['Membership Category'] === filters.membershipCategory;
    const gender = !filters.gender || member['Gender'] === filters.gender;
    return (
      matchesSearch &&
      matchesRegion &&
      matchesGeneration &&
      matchesAge &&
      matchesMaritalStatus &&
      membershipCategory &&
      gender
    );
  });

  useEffect(() => {
    if (memberQuery.status === 'success') {
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
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between">
        <div className="relative w-full sm:max-w-md flex items-center">
          <label htmlFor="">Search:</label>
          <div className="ml-2 relative w-full">
            <input
              className="w-full h-9 pl-8 border border-[#01438F] rounded outline-none text-sm"
              type="text"
              placeholder="Search Full Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#01438F] w-4 h-5" />
          </div>
        </div>

        <Button
          type="primary"
          onClick={() => setFilterModalOpen(true)}
          className={'text-lg !py-2 !px-12'}
        >
          Ⴤ Filters
        </Button>
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

      {/* Filter Modal */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApply={setFilters}
        onReset={() =>
          setFilters({ region: '', generation: '', nation: '', age: '', maritalStatus: '' })
        }
      />
    </div>
  );
}
