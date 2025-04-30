'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

import Modal from '@/components/Modal';
import Table from '@/components/Table';
import DonationModal from '@/components/DonationModal';
import MemberListModal from '@/components/MemberListModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '@/components/context/AlertContext';

import Button from '@/components/Button';

export default function Donation() {
  const { showAlert } = useAlert();

  const [selectedRow, setSelectedRow] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [memberIds, setMemberIds] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [toDelete, setToDelete] = useState('');

  const [churches, setChurches] = useState([]);

  const donationQuery = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await fetch('/api/donations');
      if (!res.ok) throw new Error('Error fetching donations');
      return await res.json();
    },
  });

  const churchQuery = useQuery({
    queryKey: ['churches'],
    queryFn: async () => {
      const res = await fetch('/api/church');
      if (!res.ok) throw new Error('Error fetching churches');
      return await res.json();
    },
  });

  useEffect(() => {
    if (churchQuery.status === 'success') {
      setChurches(churchQuery.data);
    }
  }, [churchQuery.data]);

  const column = {
    lg: ['ID', 'Member ID', 'Full Name', 'Date', 'Church', 'Amount', 'Currency'],
    md: ['ID', 'Full Name', 'Date', 'Amount'],
    sm: ['Full Name', 'Amount'],
  };

  const handleAddDonation = async (formData) => {
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showAlert({ type: 'success', message: 'Donation added successfully!' });
        await donationQuery.refetch();

        setIsAddModalOpen(false);
      } else {
        const errorData = await res.text();
        console.error('Server error:', errorData);
        showAlert({ type: 'error', message: 'Failed to add donation.' });
      }
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', message: 'An unexpected error occurred.' });
    }
  };

  const handleEditDonation = async (formData) => {
    try {
      const res = await fetch(`/api/donations/${formData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showAlert({ type: 'success', message: 'Donation updated successfully!' });
        await donationQuery.refetch();

        setIsEditModalOpen(false);
      } else {
        const errorData = await res.text();
        console.error('Server error:', errorData);
        showAlert({ type: 'error', message: 'Failed to update donation.' });
      }
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', message: 'An unexpected error occurred.' });
    }
  };

  const handleDeleteDonation = async () => {
    try {
      const res = await fetch(`/api/donations/${rowToDelete.ID}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await donationQuery.refetch();
        await donationQuery.refetch();

        showAlert({ type: 'success', message: 'Donation deleted successfully!' });
        setShowDeleteModal(false);
      } else {
        showAlert({ type: 'error', message: 'Failed to delete donation.' });
      }
    } catch (error) {
      showAlert({ type: 'error', message: 'An unexpected error occurred.' });
    }
  };

  useEffect(() => {
    if (selectedMember) {
      setIsAddModalOpen(true);
    }
  }, [selectedMember]);

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">DONATIONS INFORMATION</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4 justify-between">
        <div className="relative w-full sm:max-w-md flex items-center">
          <label htmlFor="">Search:</label>
          <div className="ml-2 relative w-full">
            <input
              className="w-full h-9 pl-8 border border-[#01438F] rounded outline-none text-sm"
              type="text"
              placeholder="Search Full Name"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-[#01438F] w-4 h-5" />
          </div>
        </div>

        <Button type="primary" className={'text-lg !py-2 !px-12'} disabled={true}>
          Ⴤ Filters
        </Button>
      </div>

      <div className="rounded-lg items-center justify-center mt-4">
        <div className="overflow-hidden rounded-lg bg-white mt-6 border border-[#CBCBCB] shadow-lg">
          <Table
            data={(donationQuery.data || []).map((donation) => ({
              ...donation,
              'Member ID': donation.Member.ID,
              'Full Name': donation.Member['Full Name'],
              Church: donation.Church?.Name || '-',
            }))}
            columns={column}
            onRowSelect={setSelectedRow}
          />
        </div>

        <div className="flex flex-wrap justify-between items-center my-7 gap-4">
          <div className="flex flex-wrap gap-3 sm:gap-5">
            <Button type="primary" onClick={() => setIsMemberListOpen(true)}>
              Add
            </Button>
            <Button type="primary" onClick={() => setIsEditModalOpen(true)} disabled={!selectedRow}>
              Edit
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (selectedRow) setRowToDelete(selectedRow);
                setShowDeleteModal(true);
              }}
              disabled={!selectedRow}
            >
              Delete
            </Button>
          </div>
        </div>

        <MemberListModal
          isOpen={isMemberListOpen}
          onClose={() => setIsMemberListOpen(false)}
          memberIds={memberIds}
          setMemberIds={setSelectedMember}
          forUnique={false}
        />

        {/* Add Donation Modal */}
        {isAddModalOpen && selectedMember && (
          <DonationModal
            mode="add"
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddDonation}
            churches={churches}
            selectedMember={selectedMember}
          />
        )}

        {/* Edit Donation Modal */}
        {isEditModalOpen && (
          <DonationModal
            mode="edit"
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEditDonation}
            churches={churches}
            selectedDonation={selectedRow}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteDonation}
            message="Are you sure you want to delete this donation?"
            confirmText="Delete"
            cancelText="Cancel"
          />
        )}
      </div>
    </div>
  );
}
