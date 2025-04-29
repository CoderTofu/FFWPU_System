"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import AddDonationModal from '@/components/AddDonationModal'; // ← import it
import { useQuery } from '@tanstack/react-query';

import MemberListModal from '@/components/MemberListModal';

interface DataItem {
  ID: number;
  Member: number;
  Name: string;
  Date: string;
  Church: string;
  Amount: string;
  Currency: string;
}

export default function Donation() {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any>(null);
  const [data, setData] = useState<DataItem[]>([]);
  const [churches, setChurches] = useState([]);

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [memberIds, setMemberIds] = useState<number[]>([]);
  const [selectedMember, setSelectedMember] = useState(null); // for display selected member

  const donationQuery = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await fetch('/api/donations', { method: 'GET' });
      if (!res.ok) throw new Error('Error fetching donations');
      return await res.json();
    },
  });

  const churchQuery = useQuery({
    queryKey: ['churches'],
    queryFn: async () => {
      const res = await fetch('/api/church', { method: 'GET' });
      if (!res.ok) throw new Error('Error fetching churches');
      return await res.json();
    },
  });

  useEffect(() => {
    if (donationQuery.status === 'success') {
      const donations = donationQuery.data.map((donation: any) => ({
        ...donation,
        'Member ID': donation.Member.ID,
        'Full Name': donation.Member['Full Name'],
        Church: donation.Church?.Name || '-',
      }));
      setData(donations);
    }
  }, [donationQuery.data]);

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

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/donation/edit-donation/${selectedRow['ID']}`);
    }
  };

  const handleAddDonation = async (formData: any) => {
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // important!
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Successfully added donation!');
        setIsAddModalOpen(false);
        location.reload();
      } else {
        const errorData = await res.text();
        console.error('Server error:', errorData);
        alert('Failed to add donation: ' + res.statusText);
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }
  };

  useEffect(() => {
    if (!selectedMember) return;
    setIsAddModalOpen(true);
  }, [selectedMember]);

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] mt-8">
      <div className="w-full flex flex-col md:flex-row justify-center items-center bg-white rounded-md shadow-md p-4">
        <p className="text-[28px] font-bold">DONATIONS</p>
      </div>

      <div className="rounded-lg items-center justify-center mt-4">
        <div className="bg-white">
          <Table data={data} columns={column} onRowSelect={setSelectedRow} />
        </div>

        <div className="flex justify-center items-center m-7 gap-5">
          <button
            onClick={() => {
              setIsMemberListOpen(true);
            }}
            className="px-6 py-2 bg-[#01438F] text-[#FCC346] rounded font-bold hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
          >
            Add
          </button>
          <button
            onClick={handleEditClick}
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
              if (selectedRow) {
                setRowToDelete(selectedRow);
                setShowDeleteModal(true);
              }
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
          setMemberIds={setSelectedMember} // ← here you now directly set the selected Member
          forUnique={false} // Important
        />

        {isAddModalOpen && selectedMember && (
          <AddDonationModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddDonation}
            churches={churches}
            memberParam={selectedMember} // Pass selected member
          />
        )}

        {showDeleteModal && (
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={async () => {
              const res = await fetch(`/api/donations/${rowToDelete['ID']}`, {
                method: 'DELETE',
              });
              if (res.ok) {
                location.reload();
              } else {
                alert('Failed to delete donation: ' + res.statusText);
              }
              setShowDeleteModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
