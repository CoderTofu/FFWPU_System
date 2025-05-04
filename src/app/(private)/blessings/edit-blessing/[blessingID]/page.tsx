"use client";

import { useEffect, useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";
import { useParams } from "next/navigation";

import MemberListModal from '@/components/MemberListModal';
import { useAlert } from '@/components/context/AlertContext';

export default function EditBlessing() {
  const showAlert = useAlert();

  const params = useParams();
  const [members, setMembers] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [guests, setGuests] = useState([]);
  const [newGuests, setNewGuests] = useState([]);
  const [formData, setFormData] = useState({
    name_of_blessing: '',
    blessing_date: '',
    chaenbo: '',
  });
  const chaenboMap = { Vertical: 1, Horizontal: 2 };
  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/blessings/${params.blessingID}`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setGuests(data.Recipients.filter((attendee) => attendee.Type === 'Guest'));
        const members = data.Recipients.filter((attendee) => attendee.Type === 'Member');
        setMembers(
          members.map((attendee) => ({
            ...attendee,
            attendee_id: attendee.ID,
            ID: attendee.Member.ID,
            'Full Name': attendee.Member['Full Name'],
          }))
        );
        // setMemberIds(members.map((attendee) => attendee.Member.ID));

        setFormData({
          name_of_blessing: data['Name'],
          blessing_date: data['Date'],
          chaenbo: data.Chaenbo,
        });
      }
    })();
  }, []);
  const [selectedMember, setSelectedMember] = useState<{
    'Member ID': number;
  } | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<{
    'Guest ID': number;
  } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<'member' | 'guest' | null>(null);
  const handleOpenRegistration = (type: 'member' | 'guest') => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };
  const [attendeesToDelete, setAttendeesToDelete] = useState([]);

  const handleMemberDelete = async () => {
    console.log('here', selectedMember, memberIds);
    // const test = memberIds.filter((member) => {
    //   console.log('here', member);
    //   return member !== selectedMember.ID;
    // });
    setMemberIds(memberIds.filter((member) => member !== selectedMember.ID));
    setMembers(members.filter((member) => member !== selectedMember));
    setAttendeesToDelete((prev) => [...prev, selectedMember.attendee_id]);
  };
  const handleGuestDelete = async () => {
    setGuests(guests.filter((member) => member !== selectedGuest));
    setNewGuests(newGuests.filter((guest) => guest !== selectedGuest));
    setAttendeesToDelete((prev) => [...prev, selectedGuest.ID]);
  };

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const fetched = await Promise.all(
        memberIds.map(async (id) => {
          try {
            const resp = await fetch(`/api/members/${id}`, { method: 'GET' });
            return await resp.json();
          } catch (error) {
            showAlert({
              type: 'error',
              message: 'Error fetching member:',
              error,
            });
            console.error('Error fetching member:', error);
            return null;
          }
        })
      );

      const validMembers = fetched.filter((member) => member !== null);
      const merged = [...members, ...validMembers];

      // Remove duplicates by ID
      const unique = Array.from(new Map(merged.map((m) => [m.ID, m])).values());

      setMembers(unique); // ✅ Only freshly fetched members, no old ones
    };

    fetchMembers();
  }, [memberIds]);

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] my-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">EDIT BLESSING</p>
      </div>

      <div className="flex flex-col lg:flex-row py-4 w-full gap-6">
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">
            Member Attendees
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
            Guest Attendees
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
              data={[...guests, ...newGuests]}
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
            value={formData.name_of_blessing}
            onChange={(e) => setFormData({ ...formData, name_of_blessing: e.target.value })}
          />
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              className="w-full border border-[#01438F] p-2 rounded mt-2 pr-10"
              type="date"
              placeholder="MM/DD/YYYY"
              value={formData.blessing_date}
              onChange={(e) => setFormData({ ...formData, blessing_date: e.target.value })}
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      chaenbo: e.target.checked ? 'Vertical' : 'Horizontal',
                    })
                  }
                  checked={formData.chaenbo === 'Vertical'}
                />
                <label>Vertical</label>
              </div>
              <div className="block">
                <input
                  type="radio"
                  className="mr-2"
                  name="chaenbo"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      chaenbo: e.target.checked ? 'Horizontal' : 'Vertical',
                    })
                  }
                  checked={formData.chaenbo === 'Horizontal'}
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
          onClick={() => setShowModal(true)}
        >
          SAVE CHANGES
        </button>
      </div>

      {/* Modal for Adding Blessing*/}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            console.log('Saving...');
            console.log(memberIds);
            const res = await fetch(`/api/blessings/${params.blessingID}`, {
              method: 'PATCH',
              body: JSON.stringify({
                name: formData.name_of_blessing,
                date: formData.blessing_date,
                chaenbo: formData.chaenbo,
              }),
            });
            const addedID = params.blessingID;
            await Promise.all([
              ...memberIds.map(async (id) => {
                const resp = await fetch(`/api/blessings/recipient`, {
                  method: 'POST',
                  body: JSON.stringify({
                    blessing: addedID,
                    member: id,
                    type: 'Member',
                  }),
                });
                if (!resp.ok) {
                  showAlert({
                    type: 'error',
                    message: 'Error adding member ' + id,
                  });
                }
              }),
              ...newGuests.map(async (guest) => {
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
                  showAlert({
                    type: 'error',
                    message: 'Error adding guest' + guest.Name,
                  });
                }
              }),
              ...attendeesToDelete.map(async (attendee) => {
                const resp = await fetch(`/api/blessings/recipient/${attendee}`, {
                  method: 'DELETE',
                });
                if (!resp.ok) {
                  showAlert({
                    type: 'error',
                    message: 'Error deleting attendee ' + attendee,
                  });
                }
              }),
            ]);
            location.reload();
            setShowModal(false);
          }}
          message="Are you sure you want to add the data?"
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
