"use client";

import { useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditBlessing() {
  const params = useParams();
  const router = useRouter();

  // This is the blessing ID from the URL
  console.log(params.blessingID);

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
  const [date, setDate] = useState("");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "member" | "guest" | null
  >(null);
  const handleOpenRegistration = (type: "member" | "guest") => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Saving...");
    setShowModal(false);
    router.push("/blessings");
  };

  const handleSubmit = (formData: Record<string, string>) => {
    if (registrationType === "member") {
      setMembers([
        ...members,
        // Kung ano name associated with the ID
        { "Member ID": formData.memberId, Name: "Placeholder" },
      ]);
    } else if (registrationType === "guest") {
      setGuests([...guests, { Name: formData.fullName }]);
    }
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
    <div className="min-h-screen flex flex-col items-center px-0 lg:px-[150px] mt-7 mb-10">
      {/* Page Title */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">EDIT BLESSING</p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen py-4 w-full gap-6">
        {/* Attendance Tables */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">
            Members Blessed
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
            Guests Blessed
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

        {/* Blessing Event Details */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Blessing</h2>
          <label className="block font-medium">Name</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Name"
          />
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              className="w-full border border-[#01438F] p-2 rounded mt-2 pr-10"
              type="text"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Calendar
              className="absolute right-3 top-4 text-[#01438F] cursor-pointer"
              size={16}
            />
          </div>
          {/*Checkbox*/}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Chaenbo/HTM</h2>
            <div className="block mb-1">
              <input type="checkbox" className="mr-2" />
              <label>Vertical</label>
            </div>
            <div className="block">
              <input type="checkbox" className="mr-2" />
              <label>Horizontal</label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button Below Container */}
      <div className="w-full max-w-[1420px] flex justify-center my-3">
        <button
          className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
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
          onConfirm={handleConfirm}
          message="Are you sure you want to edit the blessing?"
          confirmText="Confirm"
          cancelText="Cancel"
        />
      )}
      {/* Registration Modal */}
      {/* Registration Modal */}
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
