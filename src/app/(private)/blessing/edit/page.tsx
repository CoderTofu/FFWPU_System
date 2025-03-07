"use client";

import { useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";

export default function AddBlessing() {
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
  const [date, setDate] = useState("");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "member" | "guest" | null
  >(null);
  const handleOpenRegistration = (type: "member" | "guest") => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#D9D9D9]">
      {/* Page Title */}
      <div className="w-full max-w-3x1 p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-2xl font-bold">EDIT BLESSING</p>
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
          <Table data={members} columns={{ lg: ["Member ID", "Name"], md: ["Member ID", "Name"], sm: ["Name"] }} />
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
          <Table data={guests} columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }} />
        </div>
        
        {/* Blessing Event Details */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Blessing</h2>
          <label className="block font-medium">Name</label>
          <input className="w-full border border-[#01438F] p-2 rounded mt-2" placeholder="Enter Name" />
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              className="w-full border border-[#01438F] p-2 rounded mt-2 pr-10"
              type="text"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Calendar className="absolute right-3 top-4 text-[#01438F] cursor-pointer" size={16} />
          </div>
          {/*Checkbox*/}
            <div className="mt-5 block">
                <input type="checkbox" className="mr-2" />
                <label>Vertical</label>
            </div>
            <div className="block">
                <input type="checkbox" className="mr-2" />
                <label>Horizontal</label>
            </div>
        </div>
      </div>
      
      {/* Save Button Below Container */}
      <div className="w-full max-w-[1420px] flex justify-center my-3">
        <button className="px-4 py-2 font-bold bg-[#01438F] text-[#FCC346] rounded" onClick={() => setShowModal(true)}>EDIT BLESSING</button>
      </div>

      {/* Modal for Adding Blessing*/}
      {showModal && (
        <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          console.log("Saving...");
          setShowModal(false);
        }}
        message="Are you sure you want to add the data?"
        confirmText="Add"
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