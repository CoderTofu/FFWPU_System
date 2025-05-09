'use client';

import { useState, useEffect, useRef } from 'react';

import ListTable from '@/components/ListTable';
import Button from './Button';

import { useAlert } from '@/components/context/AlertContext.jsx';

import loading from '@/components/assets/kinetiq-loading.gif';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type } from 'os';

// forUnique is used to determine if the modal is for the member list or not
// If it is for the member list, it should only allow unique members to be selected
const MemberListModal = ({ isOpen, onClose, memberIds, setMemberIds, forUnique = true }) => {
  const { showAlert } = useAlert();
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filtered data is used to filter the data based on the search term
  const [filteredData, setFilteredData] = useState([]);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const columns = [
    { key: 'ID', label: 'Member ID' },
    { key: 'Full Name', label: 'Name' },
  ];

  const memberQuery = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await fetch('/api/members', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  const handleConfirm = () => {
    if (!selectedCustomer) {
      showAlert({
        type: 'error',
        title: 'No member selected!',
      });
      return;
    }

    if (!forUnique) {
      // For Donation — you want to pass the FULL MEMBER
      setMemberIds(selectedCustomer); // ← pass full object (Member)
    } else {
      // For other cases (if still using unique ID array)
      if (memberIds.includes(selectedCustomer.ID)) {
        showAlert({
          type: 'error',
          title: 'Member already selected.',
        });
      } else {
        setMemberIds((prev) => [...prev, selectedCustomer.ID]);
        showAlert({
          type: 'success',
          title: 'Member selected.',
        });
      }
    }
    onClose();
  };

  useEffect(() => {
    console.log(data);
    if (memberQuery.status !== 'success') return;
    const tableData = data.filter((m) =>
      m['Full Name'].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(tableData);
  }, [searchTerm, data, memberQuery.status]);

  useEffect(() => {
    if (memberQuery.status === 'success') {
      const res = memberQuery.data.map((member) => ({
        ...member,
        Region: member.Region.name,
        Subregion: member.Subregion.name,
      }));
      setData(res);
      setFilteredData(res);
      setIsLoading(false);
    } else if (memberQuery.status === 'error') {
      showAlert({ type: 'error', title: 'An error occurred while fetching data.' });
    }
  }, [memberQuery.data, memberQuery.status]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Focus the close button when modal opens
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-1000"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 overflow-auto rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b border-[#cbcbcb] text-white">
          <h2 id="modal-title" className="text-xl font-semibold">
            List of Members
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-900 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4">
          <div className="mb-4 flex items-center gap-4">
            <p className="mr-2">Search:</p>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 py-1 border border-gray-300 rounded-md max-w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isLoading ? (
            <div className="h-[300px] rounded-md flex justify-center items-center">
              <img src={loading} alt="loading" className="h-[100px]" />
            </div>
          ) : (
            <div className="h-[300px] overflow-auto border border-[#CBCBCB] rounded-md">
              <ListTable columns={columns} data={filteredData} onSelect={setSelectedCustomer} />
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <div>
              <Button type="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                className={'mr-2'}
                onClick={handleConfirm}
                disabled={!selectedCustomer}
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberListModal;
