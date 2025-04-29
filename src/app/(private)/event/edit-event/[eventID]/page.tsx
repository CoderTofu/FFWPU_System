'use client';

import { useEffect, useRef, useState } from 'react';
import { PlusCircle, Calendar, XCircle } from 'lucide-react';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import RegistrationModal from '@/components/RegistrationModal';
import { useParams } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import MemberListModal from '@/components/MemberListModal';
import { useAlert } from '@/components/context/AlertContext.jsx';
import Button from '@/components/Button';

interface Field {
  name: string;
  label: string;
  type: string;
}

export default function EditWorshipEvent() {
  const { showAlert } = useAlert();

  const params = useParams();

  // This is the blessing ID from the URL
  const [worshipInfo, setWorshipInfo] = useState({});
  const [attendees, setAttendees] = useState([]);
  const [guests, setGuests] = useState([]);
  const [churches, setChurches] = useState([]);

  const [memberIds, setMemberIds] = useState([]);
  const worshipTypes = { Onsite: 1, Online: 2 };
  const [worshipID, setWorshipID] = useState('');
  const [worshipType, setWorshipType] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [church, setChurch] = useState(null);
  const [eventName, setEventName] = useState('');

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [newGuests, setNewGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<string>('');
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<'member' | 'guest' | null>(null);

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/worship/${params.eventID}`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setGuests(data.Attendees.filter((attendee) => attendee.Type === 'Guest'));
        const members = data.Attendees.filter((attendee) => attendee.Type === 'Member');
        if (members.length < 0) {
          setAttendees(
            members.map((attendee) => ({
              ...attendee,
              attendee_id: attendee.ID,
              ID: attendee.Member.ID,
              'Full Name': attendee.Member['Full Name'],
            }))
          );
        }
        setWorshipID(data.ID);
        setEventName(data['Event Name']);
        setDate(data.Date);
        setWorshipType(data['Worship Type']);
        setChurch(data.Church);
        // set images
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const selectedChurch = churches.filter((church) => {
      return church.ID == worshipInfo.Church;
    });

    if (selectedChurch.length > 0) setChurch(selectedChurch[0]);
  }, [churches, worshipInfo]);

  useEffect(() => {
    const fetchMembers = async () => {
      const newMembers = await Promise.all(
        memberIds.map(async (id) => {
          try {
            const resp = await fetch(`/api/members/${id}`, { method: 'GET' });
            if (resp.ok) {
              return await resp.json();
            } else {
              showAlert({
                type: 'error',
                message: 'Error while fetching member id: ' + id,
              });
              return null;
            }
          } catch (error) {
            console.error('Error fetching member:', error);
            return null;
          }
        })
      );

      // Filter out failed fetches (null)
      const validMembers = newMembers.filter((member) => member !== null);

      // Merge: old attendees + new fetched members
      const merged = [...attendees, ...validMembers];

      // Remove duplicates by ID
      const unique = Array.from(new Map(merged.map((m) => [m.ID, m])).values());

      setAttendees(unique);
    };

    fetchMembers();
  }, [memberIds]);

  const churchQuery = useQuery({
    queryKey: ['churches'],
    queryFn: async () => {
      const res = await fetch('/api/church', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  useEffect(() => {
    if (churchQuery.status === 'success') {
      setChurches(churchQuery.data);
    } else if (churchQuery.status === 'error') {
      showAlert({
        type: 'error',
        message: 'An error occurred while fetching data.',
      });
    }
  }, [churchQuery.data, churchQuery.status]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOpenRegistration = (type: 'member' | 'guest') => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };

  const [attendeesToDelete, setAttendeesToDelete] = useState([]);

  const handleMemberDelete = async () => {
    setMemberIds(memberIds.filter((member) => member !== selectedMember.ID));
    setAttendees(attendees.filter((member) => member !== selectedMember));
    setAttendeesToDelete((prev) => [...prev, selectedMember.attendee_id]);
  };
  const handleGuestDelete = async () => {
    setGuests(guests.filter((member) => member !== selectedGuest));
    setNewGuests(newGuests.filter((guest) => guest !== selectedGuest));
    setAttendeesToDelete((prev) => [...prev, selectedGuest.ID]);
  };

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] my-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">EDIT EVENT</p>
      </div>

      <div className="flex flex-col lg:flex-row py-4 w-full gap-6">
        {/* Attendance Tables */}
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
              data={attendees}
              columns={{
                lg: ['ID', 'Full Name'],
                md: ['ID', 'Full Name'],
                sm: ['Full Name'],
              }}
              onRowSelect={setSelectedMember}
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

        {/* Worship Event Details */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Worship Event Details</h2>

          <label className="block font-medium">Worship ID</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Worship ID"
            disabled
            value={worshipID || ''}
          />

          <label className="block font-medium mt-5">Event Name</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Event Name"
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />

          {/* Date Picker */}
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-[#01438F] p-2 rounded mt-2 appearance-none"
            />
          </div>

          <label className="block font-medium mt-5">Worship Type</label>
          <div
            onClick={() => toggleDropdown('type')}
            className="relative flex flex-col justify-start items-start border border-[#01438F] rounded p-2 hover:cursor-pointer "
          >
            <div className="flex w-full justify-between">
              {worshipType === '' ? (
                <button className="opacity-50">Worship Type</button>
              ) : (
                <button>{worshipType}</button>
              )}
              {openDropdown === 'type' ? (
                <ChevronUp style={{ color: '#01438F' }} />
              ) : (
                <ChevronDown style={{ color: '#01438F' }} />
              )}
            </div>
            {openDropdown === 'type' && (
              <div className="absolute z-50 mt-10 flex flex-col w-full bg-white border border-[#01438F] rounded">
                {['Onsite', 'Online'].map((val) => {
                  return (
                    <button
                      key={val}
                      className="hover:bg-gray-200 w-full text-left rounded p-2"
                      onClick={() => {
                        setWorshipType(val);
                        toggleDropdown('type');
                      }}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <label className="block font-medium mt-5">Church</label>
          <div
            onClick={() => toggleDropdown('church')}
            className="relative flex flex-col justify-start items-start border border-[#01438F] rounded p-2 hover:cursor-pointer "
          >
            <div className="flex w-full justify-between">
              {!church ? (
                <button className="opacity-50">Church</button>
              ) : (
                <button> {`${church.Name} (${church.Country})`}</button>
              )}
              {openDropdown === 'church' ? (
                <ChevronUp style={{ color: '#01438F' }} />
              ) : (
                <ChevronDown style={{ color: '#01438F' }} />
              )}
            </div>
            {openDropdown === 'church' && (
              <div className="absolute mt-10 flex flex-col w-full bg-white border border-[#01438F] rounded">
                {churches.map((val) => {
                  return (
                    <button
                      key={val.ID}
                      className="hover:bg-gray-200 w-full text-left rounded p-2"
                      onClick={() => {
                        setChurch(val);
                        toggleDropdown('church');
                      }}
                    >
                      {`${val.Name} (${val.Country})`}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upload Multiple Photos */}
          <label className="block font-medium mt-5">Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full border border-[#01438F] p-2 rounded mt-2"
          />

          {/* Show uploaded images */}
          {images.length > 0 && (
            <div className="mt-4 w-full overflow-x-auto">
              <div className="flex space-x-2 p-2">
                {images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24 flex-shrink-0">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-1 right-1"
                    >
                      <XCircle className="text-red-500 w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full flex justify-center my-4">
        <Button
          type="primary"
          onClick={() => {
            if (!eventName.trim()) {
              showAlert({
                type: 'error',
                message: 'Please enter an Event Name.',
              });
              return;
            }

            if (!date) {
              showAlert({
                type: 'error',
                message: 'Please select a Date for the event.',
              });
              return;
            }

            if (!worshipType) {
              showAlert({
                type: 'error',
                message: 'Please select a Worship Type.',
              });
              return;
            }

            if (!church) {
              showAlert({
                type: 'error',
                message: 'Please select a Church.',
              });
              return;
            }

            // All required fields are filled, proceed to open the confirmation modal
            setShowModal(true);
          }}
        >
          Save Changes
        </Button>
      </div>

      <MemberListModal
        isOpen={isMemberListOpen}
        onClose={() => setIsMemberListOpen(false)}
        memberIds={memberIds}
        setMemberIds={setMemberIds}
      ></MemberListModal>

      {/* Modal for Updating Event*/}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            try {
              const res = await fetch(`/api/worship/${params.eventID}`, {
                method: 'PATCH',
                body: JSON.stringify({
                  event_name: eventName,
                  date,
                  worship_type: worshipType,
                  church: church.ID,
                }),
              });
              const data = await res.json();
              const addedID = params.eventID;
              await Promise.all([
                ...memberIds.map(async (id) => {
                  const resp = await fetch(`/api/worship/attendee`, {
                    method: 'POST',
                    body: JSON.stringify({
                      worship: addedID,
                      member: id,
                      type: 'Member',
                    }),
                  });
                  if (!resp.ok) {
                    showAlert({
                      type: 'error',
                      message: 'Error adding member: ' + id,
                    });
                  }
                }),
                ...newGuests.map(async (guest) => {
                  const resp = await fetch(`/api/worship/attendee`, {
                    method: 'POST',
                    body: JSON.stringify({
                      worship: addedID,
                      type: 'Guest',
                      full_name: guest['Full Name'],
                      email: guest.Email,
                      invited_by: guest.invitedBy || null,
                    }),
                  });
                  if (!resp.ok) {
                    showAlert({
                      type: 'error',
                      message: 'Error adding guest: ' + guest['Full Name'],
                    });
                  }
                }),
                ...attendeesToDelete.map(async (attendee) => {
                  const resp = await fetch(`/api/worship/attendee/${attendee}`, {
                    method: 'DELETE',
                  });
                  if (!resp.ok) {
                    showAlert({
                      type: 'error',
                      message: 'Error deleting attendee: ' + attendee,
                    });
                  }
                }),
              ]);
              location.reload();
            } catch (err) {
              showAlert({
                type: 'error',
                message: 'Error while editing worship: ' + err,
              });
            }

            setShowModal(false);
          }}
          message="Are you sure you want to save your changes?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          onSubmit={(formData) => {
            console.log(formData);
            setNewGuests((prev) => [...prev, formData]);
          }}
          title={registrationType === 'member' ? 'Member Registration' : 'Guest Registration'}
          fields={
            registrationType === 'member'
              ? [
                  {
                    name: 'memberId',
                    label: 'Member ID:',
                    type: 'text',
                    required: true,
                  },
                ]
              : [
                  {
                    name: 'Full Name',
                    label: 'Full Name:',
                    type: 'text',
                    required: true,
                  },
                  {
                    name: 'Email',
                    label: 'Email:',
                    type: 'email',
                    required: true,
                  },
                  { name: 'invitedBy', label: 'Invited By:', type: 'text' },
                ]
          }
        />
      )}
    </div>
  );
}
