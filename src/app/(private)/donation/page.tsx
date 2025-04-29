'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import Table from '@/components/Table';
import DonationModal from '@/components/DonationModal';
import MemberListModal from '@/components/MemberListModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAlert } from '@/components/context/AlertContext';

export default function Donation() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
    <div className="px-0 md:px-[60px] lg:px-[150px] mt-8">
      <div className="w-full flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md p-4">
        <p className="text-[28px] font-bold">DONATIONS</p>
      </div>

      <div className="rounded-lg items-center justify-center mt-4">
        <div className="bg-white">
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

        <div className="flex justify-center items-center m-7 gap-5">
          <button
            onClick={() => setIsMemberListOpen(true)}
            className="px-6 py-2 bg-[#01438F] text-[#FCC346] rounded font-bold hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
          >
            Add
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            disabled={!selectedRow}
            className={`px-6 py-2 rounded font-bold ${
              selectedRow
                ? 'bg-[#01438F] text-[#FCC346] hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (selectedRow) setRowToDelete(selectedRow);
              setShowDeleteModal(true);
            }}
            disabled={!selectedRow}
            className={`px-6 py-2 rounded font-bold ${
              selectedRow
                ? 'bg-[#01438F] text-[#FCC346] hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Delete
          </button>
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
