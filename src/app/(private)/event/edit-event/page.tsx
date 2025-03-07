"use client";

import { useRef, useState } from "react";
import { PlusCircle, Calendar, XCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";

interface Field {
  name: string;
  label: string;
  type: string;
}

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

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#D9D9D9]">
      {/* Page Title */}
      <div className="w-full max-w-[1420px] h-[72px] mt-[15px] mb-[10px] mx-[65px] bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-[28px] font-bold">EDIT WORSHIP EVENT</p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen p-4 w-full max-w-[1420px] gap-6">
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
          <Table
            data={members}
            columns={{
              lg: ["Member ID", "Name"],
              md: ["Member ID", "Name"],
              sm: ["Name"],
            }}
          />
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
          <Table
            data={guests}
            columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }}
          />
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

      {/* Save Button */}
      <div className="w-full max-w-[1420px] flex justify-center my-3">
        <button
          className="px-4 py-2 font-bold bg-[#01438F] text-[#FCC346] rounded"
          onClick={() => setShowModal(true)}
        >
          SAVE
        </button>
      </div>

      {/* Modal for Updating Event*/}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            console.log("Updating...");
            setShowModal(false);
          }}
          message="Are you sure you want to update this worship event?"
          confirmText="Update"
          cancelText="Cancel"
        />
      )}

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          onSubmit={(formData) => {
            console.log("Registered:", formData);
            setIsRegistrationModalOpen(false);
          }}
          title={
            registrationType === "member"
              ? "Member Registration"
              : "Guest Registration"
          }
          fields={
            registrationType === "member"
              ? [
                  { name: "memberId", label: "Member ID", type: "text" },
                  { name: "fullName", label: "Full Name", type: "text" },
                ]
              : [
                  { name: "fullName", label: "Full Name", type: "text" },
                  { name: "nation", label: "Nation", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "invitedBy", label: "Invited By", type: "text" },
                ]
          }
        />
      )}
    </div>
  );
}
