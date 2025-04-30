'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/Table';
import { Search, ChevronDown } from 'lucide-react';
import Modal from '@/components/Modal';
import { axiosInstance } from '@/app/axiosInstance';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Button from '@/components/Button';

export default function EventInfo() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/event/add-event');
  }, []);

  const [data, setData] = useState([]);

  const eventQuery = useQuery({
    queryKey: ['worships'],
    queryFn: async () => {
      const res = await fetch('/api/worship', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  useEffect(() => {
    if (eventQuery.status === 'success') {
      const data = eventQuery.data.map((event) => ({
        ...event,
        Church: event.Church.Name,
      }));
      setData(data);
      console.log(data);
    } else if (eventQuery.status === 'error') {
      alert('An error occurred while fetching data.');
    }
  }, [eventQuery.data, eventQuery.status]);

  const dataID = 'ID';

  // Column configuration for responsive table
  const columnConfig = {
    lg: ['ID', 'Event Name', 'Date', 'Church', 'Worship Type'],
    md: ['Event Name', 'Date', 'Church Name', 'Worship Type'],
    sm: ['Event Name', 'Church Name'],
  };
  const queryClient = useQueryClient();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    router.push('/event/add-event');
  };

  const handleEditClick = () => {
    if (selectedRow) {
      window.location.href = `/event/edit-event/${selectedRow[dataID]}`;
      router.push(`/event/edit-event/${selectedRow[dataID]}`);
    }
  };

  const handleDeleteClick = () => {
    if (selectedRow) {
      setRowToDelete(selectedRow);
      setShowDeleteModal(true);
    }
  };

  const handleViewClick = () => {
    if (selectedRow) {
      window.location.href = `/event/${selectedRow[dataID]}`;
    }
  };

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full bg-[#f8fafc] pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">EVENTS INFORMATION</p>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between">
        <div className="relative w-full sm:max-w-md flex items-center">
          <label htmlFor="">Search:</label>
          <div className="ml-2 relative w-full">
            <input
              className="w-full h-9 pl-8 border border-[#01438F] rounded outline-none text-sm"
              type="text"
              placeholder="Search Event Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#01438F] w-4 h-5" />
          </div>
        </div>

        <Button
          type="primary"
          // onClick={() => setFilterModalOpen(true)}
          className={'text-lg !py-2 !px-12'}
          disabled={true}
        >
          Ⴤ Filters
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
        <Table
          data={filteredData}
          columns={columnConfig}
          rowDoubleClickPath="/event"
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
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            console.log('Deleting event...');
            const resp = await fetch(`/api/worship/${rowToDelete['ID']}`, {
              method: 'DELETE',
            });
            if (resp.ok) {
              queryClient.refetchQueries(['worships']);
            } else {
              alert('An error occurred while deleting worship: ' + resp.statusText);
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
