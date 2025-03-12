"use client";

import { useRef, useState } from "react";
import { PlusCircle, Calendar, XCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";

export default function AddWorshipEvent() {
  const [members, setMembers] = useState([
    { "Member ID": "M001", Name: "Binose" },
    { "Member ID": "M002", Name: "Lans" },
    { "Member ID": "M001", Name: "Ye Em" },
    { "Member ID": "M002", Name: "Cess" },
    { "Member ID": "M001", Name: "Dril" },
    { "Member ID": "M002", Name: "Pao" },
  ]);

  const [guests, setGuests] = useState([
    { Name: "Blake" },
    { Name: "Sloane" },
    { Name: "Nisamon" },
    { Name: "Chekwa" },
    { Name: "Chiki" },
    { Name: "Hiro" },
  ]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "member" | "guest" | null
  >(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOpenRegistration = (type: "member" | "guest") => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };

  const handleGuestDelete = () => {
    setGuests(guests.filter((guest) => guest !== selectedGuest));
    console.log("Deleting Guest: " + selectedGuest);
  };

  const handleMemberDelete = () => {
    setMembers(members.filter((member) => member !== selectedMember));
    console.log("Deleting Member: " + selectedMember);
  };

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] mt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">ADD WORSHIP EVENT</p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen py-4 pb-0 w-full gap-6">
        {/* Attendance Tables */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">
            Member Attendees
            <div title="Register Member">
              <PlusCircle
                className="text-[#01438F] cursor-pointer hover:text-[#FCC346]"
                size={24}
                aria-label="Register Member"
                onClick={() => handleOpenRegistration("member")}
              />
            </div>
          </h2>
          <div className="max-h-[250px] overflow-y-auto">
            <Table
              data={members}
              columns={{
                lg: ["Member ID", "Name"],
                md: ["Member ID", "Name"],
                sm: ["Name"],
              }}
              onRowSelect={setSelectedMember}
            />
          </div>
          <button
            onClick={handleMemberDelete}
            disabled={!selectedMember}
            className={`py-1 w-[100px] text-sm rounded mt-5 transition duration-300 ease-in-out border-2 ${
              selectedMember
                ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg"
                : "border-gray-400 text-gray-400 cursor-not-allowed"
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
                onClick={() => handleOpenRegistration("guest")}
              />
            </div>
          </h2>
          <div className="max-h-[250px] overflow-y-auto">
            <Table
              data={guests}
              columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }}
              onRowSelect={setSelectedGuest}
            />
          </div>
          <button
            onClick={handleGuestDelete}
            disabled={!selectedGuest}
            className={`py-1 w-[100px] rounded mt-5 text-sm transition duration-300 ease-in-out border-2 ${
              selectedGuest
                ? "border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg"
                : "border-gray-400 text-gray-400 cursor-not-allowed"
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
          />

          <label className="block font-medium mt-5">Event Name</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Event Name"
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
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Worship Type"
          />

          <label className="block font-medium mt-5">Sub-region</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Sub-region"
          />

          <label className="block font-medium mt-5">Nation</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Nation"
          />

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

      {/* Add Button Message */}
      <div className="w-full flex justify-center my-4">
        <button
          className="px-4 py-2 font-bold bg-[#01438F] text-[#FCC346] rounded"
          onSubmit={() => setShowModal(true)}
          type="submit"
        >
          ADD WORSHIP EVENT
        </button>
      </div>

      {/* Modal for Adding Event*/}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            console.log("Saving...");
            setShowModal(false);
          }}
          message="Are you sure you want to add this worship event?"
          confirmText="Add"
          cancelText="Cancel"
        />
      )}

      {isRegistrationModalOpen && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          onSubmit={(formData) => {
            console.log("Registered:", formData);
            handleSubmit(formData);
          }}
          title={
            registrationType === "member"
              ? "Member Registration"
              : "Guest Registration"
          }
          fields={
            registrationType === "member"
              ? [
                  {
                    name: "memberId",
                    label: "Member ID:",
                    type: "text",
                    required: true,
                  },
                ]
              : [
                  {
                    name: "fullName",
                    label: "Full Name:",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "email",
                    label: "Email:",
                    type: "email",
                    required: true,
                  },
                  { name: "invitedBy", label: "Invited By:", type: "text" },
                ]
          }
        />
      )}
    </div>
  );
}
