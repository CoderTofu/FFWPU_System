"use client";

import { useEffect, useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";

import MemberListModal from '@/components/MemberListModal';
import { useAlert } from '@/components/context/AlertContext';

export default function AddBlessing() {
  const { showAlert } = useAlert();

  const [members, setMembers] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [blessingName, setBlessingName] = useState('');
  const [chaenbo, setChaenbo] = useState('');
  const [guests, setGuests] = useState([]);

  const [selectedMember, setSelectedMember] = useState<{
    'Member ID': number;
  } | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<'member' | 'guest' | null>(null);
  const handleOpenRegistration = (type: 'member' | 'guest') => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };

  const handleSubmit = (formData: Record<string, string>) => {
    console.log('Form Data Submitted:', formData);
  };

  const handleGuestDelete = () => {
    console.log('Deleting Guest: ' + selectedGuest);
    setGuests(guests.filter((guest) => guest != selectedGuest));
  };
  const handleMemberDelete = () => {
    console.log('Deleting Member: ' + selectedMember);
    setMemberIds(memberIds.filter((id) => id != selectedMember['ID']));
    setMembers(members.filter((member) => member != selectedMember));
  };

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);

  useEffect(() => {
    const getMember = async () => {
      const m = await Promise.all(
        memberIds.map(async (id) => {
          const res = await fetch(`/api/members/${id}`, { method: 'GET' });
          if (!res.ok) {
            alert(`Member with ID ${id} does not exist`);
          } else {
            return await res.json();
          }
        })
      );
      setMembers(m);
    };
    getMember();
  }, [memberIds]);

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] my-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">ADD BLESSING</p>
      </div>

      <div className="flex flex-col lg:flex-row py-4 w-full gap-6">
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">
            Members Blessed
            <div title="Register Member">
              <PlusCircle
                className="text-[#01438F] cursor-pointer hover:text-[#FCC346]"
                size={24}
                aria-label="Register Member"
                onClick={() => setIsMemberListOpen(true)}
              />
            </div>
          </h2>
          <div className="max-h-[250px] overflow-y-auto border border-[#CBCBCB] shadow-lg rounded-lg">
            <Table
              data={members}
              columns={{
                lg: ['ID', 'Full Name'],
                md: ['ID', 'Full Name'],
                sm: ['Full Name'],
              }}
              onRowSelect={(row) => {
                setSelectedMember(row);
              }}
            />
          </div>
          <button
            onClick={handleMemberDelete}
            disabled={!selectedMember}
            className={`py-1 w-[100px] text-sm rounded mt-5 transition duration-300 ease-in-out border-2 ${
              selectedMember
                ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg'
                : 'border-gray-400 text-gray-400 cursor-not-allowed'
            }`}
          >
            Remove
          </button>
          <h2 className="text-lg font-semibold mt-4 mb-3 flex justify-between">
            Guests Blessed
            <div title="Register Guest">
              <PlusCircle
                className="text-[#01438F] cursor-pointer hover:text-[#FCC346]"
                size={24}
                aria-label="Register Guest"
                onClick={() => handleOpenRegistration('guest')}
              />
            </div>
          </h2>
          <div className="max-h-[250px] overflow-y-auto border border-[#CBCBCB] shadow-lg rounded-lg">
            <Table
              data={[...guests]}
              columns={{
                lg: ['Full Name', 'Email'],
                md: ['Full Name', 'Email'],
                sm: ['Full Name'],
              }}
              onRowSelect={setSelectedGuest}
            />
          </div>
          <button
            onClick={handleGuestDelete}
            disabled={!selectedGuest}
            className={`py-1 w-[100px] rounded mt-5 text-sm transition duration-300 ease-in-out border-2 ${
              selectedGuest
                ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg'
                : 'border-gray-400 text-gray-400 cursor-not-allowed'
            }`}
          >
            Remove
          </button>
        </div>
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Blessing</h2>
          <label className="block font-medium">Name</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Name"
            onChange={(e) => setBlessingName(e.target.value)}
          />
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              className="w-full border border-[#01438F] p-2 rounded mt-2"
              type="date"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/*Checkbox*/}
          <div className="mt-8">
            <fieldset>
              <h2 className="text-lg font-semibold mb-2">Chaenbo/HTM</h2>
              <div className="block mb-1">
                <input
                  type="radio"
                  className="mr-2"
                  name="chaenbo"
                  onChange={(e) => setChaenbo(e.target.checked ? 'Vertical' : 'Horizontal')}
                />
                <label>Vertical</label>
              </div>
              <div className="block">
                <input
                  type="radio"
                  className="mr-2"
                  name="chaenbo"
                  onChange={(e) => setChaenbo(e.target.checked ? 'Horizontal' : 'Vertical')}
                />
                <label>Horizontal</label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* Save Button Below Container */}
      <div className="w-full flex justify-center my-3">
        <button
          className="px-4 py-2 font-bold bg-[#01438F] text-[#FCC346] rounded"
          onClick={() => {
            if (!blessingName || !date || !chaenbo) {
              showAlert({
                type: 'error',
                message: 'Please fill in all the required fields: Name, Date, and Chaenbo.',
              });
            } else {
              setShowModal(true);
            }
          }}
        >
          ADD BLESSING
        </button>
      </div>

      {/* Modal for Adding Blessing*/}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            console.log('Saving...');
            console.log(blessingName);
            console.log(date);
            console.log(chaenbo);
            const res = await fetch('/api/blessings', {
              method: 'POST',
              body: JSON.stringify({
                date,
                name: blessingName,
                chaenbo,
              }),
            });

            const addedID = (await res.json())['ID'];
            await Promise.all([
              ...memberIds.map(async (id) => {
                const resp = await fetch(`/api/blessings/recipient`, {
                  method: 'POST',
                  body: JSON.stringify({
                    blessing: addedID,
                    type: 'Member',
                    member: id,
                  }),
                });
                if (!resp.ok) {
                  alert('Error adding member ' + id);
                }
              }),
              ...guests.map(async (guest) => {
                const resp = await fetch(`/api/blessings/recipient`, {
                  method: 'POST',
                  body: JSON.stringify({
                    blessing: addedID,
                    type: 'Guest',
                    full_name: guest['Full Name'],
                    email: guest.Email,
                    invited_by: guest.invitedBy || null,
                  }),
                });
                if (!resp.ok) {
                  alert('Error adding guest' + guest.Name);
                }
              }),
            ]);

            setShowModal(false);
          }}
          message="Are you sure you want to add this blessing?"
          confirmText="Add"
          cancelText="Cancel"
        />
      )}

      <MemberListModal
        isOpen={isMemberListOpen}
        onClose={() => setIsMemberListOpen(false)}
        memberIds={memberIds}
        setMemberIds={setMemberIds}
      ></MemberListModal>

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          onSubmit={(formData) => {
            console.log('Registered:', formData);
            if (registrationType === 'member') {
              const id = parseInt(formData.memberId);
              if (memberIds.includes(id)) {
                showAlert({
                  type: 'error',
                  message: `Member ID ${formData.memberId} is already in the blessing.`,
                });
              } else {
                setMemberIds((prev) => [...prev, id]);
              }
            } else {
              setNewGuests([...newGuests, formData]);
            }
            setIsRegistrationModalOpen(false);
          }}
          title={registrationType === 'member' ? 'Member Registration' : 'Guest Registration'}
          fields={
            registrationType === 'member'
              ? [{ name: 'memberId', label: 'Member ID', type: 'text' }]
              : [
                  {
                    name: 'Full Name',
                    label: 'Full Name',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'Email',
                    label: 'Email',
                    type: 'email',
                    required: true,
                  },
                  { name: 'invitedBy', label: 'Invited By', type: 'text' },
                ]
          }
        />
      )}
    </div>
  );
}
