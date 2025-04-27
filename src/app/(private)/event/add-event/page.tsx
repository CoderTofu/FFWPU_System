"use client";

import { useEffect, useRef, useState } from "react";
import {
  PlusCircle,
  Calendar,
  XCircle,
  ChevronDown,
  ChevronUp,
  Fullscreen,
} from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";
import { axiosInstance } from "@/app/axiosInstance";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import MemberListModal from "@/components/MemberListModal";
import { useAlert } from "@/components/context/AlertContext.jsx";

export default function AddWorshipEvent() {
  const { showAlert } = useAlert();

  const [memberIds, setMemberIds] = useState([]);
  const [members, setMembers] = useState([]);
  const worshipTypes = { Onsite: 1, Online: 2 };
  const router = useRouter();
  const [guests, setGuests] = useState([]);

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "member" | "guest" | null
  >(null);
  const [worshipType, setWorshipType] = useState("");

  const [isMemberListOpen, setIsMemberListOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const churchQuery = useQuery({
    queryKey: ["churches"],
    queryFn: async () => {
      const res = await fetch("/api/church", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const [openDropdown, setOpenDropdown] = useState("");
  const [churches, setChurches] = useState([]);
  const [church, setChurch] = useState(null);

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOpenRegistration = (type: "member" | "guest") => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };

  const handleGuestDelete = () => {
    setGuests(guests.filter((guest) => guest !== selectedGuest));
  };

  const handleMemberDelete = () => {
    setMemberIds(memberIds.filter((member) => member !== selectedMember.ID));
    setMembers(members.filter((member) => member !== selectedMember));
    setMemberIds(memberIds.filter((id) => id != selectedMember["ID"]));
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    if (churchQuery.status === "success") {
      setChurches(churchQuery.data);
    } else if (churchQuery.status === "error") {
      showAlert({
        type: "error",
        message: "An error occurred while fetching data.",
      });
    }
  }, [churchQuery.data, churchQuery.status]);

  useEffect(() => {
    const getMember = async () => {
      const m = await Promise.all(
        memberIds.map(async (id) => {
          const res = await fetch(`/api/members/${id}`, { method: "GET" });
          if (!res.ok) {
            showAlert({
              type: "error",
              message: `Member with ID ${id} does not exist`,
            });
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
                onClick={() => setIsMemberListOpen(true)}
              />
            </div>
          </h2>
          <div className="max-h-[250px] overflow-y-auto">
            <Table
              data={members}
              columns={{
                lg: ["ID", "Full Name"],
                md: ["ID", "Full Name"],
                sm: ["Full Name"],
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
              columns={{
                lg: ["Name", "Email"],
                md: ["Name", "Email"],
                sm: ["Name"],
              }}
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
          <h2 className="text-lg font-semibold">Worship Event Details</h2>

          <label className="block font-medium mt-5">Event Name</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2"
            placeholder="Enter Event Name"
            onChange={(e) => setEventName(e.target.value)}
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
            onClick={() => toggleDropdown("type")}
            className="relative flex flex-col justify-start items-start border border-[#01438F] rounded p-2 hover:cursor-pointer "
          >
            <div className="flex w-full justify-between">
              {worshipType === "" ? (
                <button className="opacity-50">Worship Type</button>
              ) : (
                <button>{worshipType}</button>
              )}
              {openDropdown === "type" ? (
                <ChevronUp style={{ color: "#01438F" }} />
              ) : (
                <ChevronDown style={{ color: "#01438F" }} />
              )}
            </div>
            {openDropdown === "type" && (
              <div className="absolute z-50 mt-10 flex flex-col w-full bg-white border border-[#01438F] rounded">
                {["Onsite", "Online"].map((val) => {
                  return (
                    <button
                      key={val}
                      className="hover:bg-gray-200 w-full text-left rounded p-2"
                      onClick={() => {
                        setWorshipType(val);
                        toggleDropdown("type");
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
            onClick={() => toggleDropdown("church")}
            className="relative flex flex-col justify-start items-start border border-[#01438F] rounded p-2 hover:cursor-pointer "
          >
            <div className="flex w-full justify-between">
              {!church ? (
                <button className="opacity-50">Church</button>
              ) : (
                <button> {`${church.Name} (${church.Country})`}</button>
              )}
              {openDropdown === "church" ? (
                <ChevronUp style={{ color: "#01438F" }} />
              ) : (
                <ChevronDown style={{ color: "#01438F" }} />
              )}
            </div>
            {openDropdown === "church" && (
              <div className="absolute mt-10 flex flex-col w-full bg-white border border-[#01438F] rounded">
                {churches.map((val) => {
                  return (
                    <button
                      key={val.ID}
                      className="hover:bg-gray-200 w-full text-left rounded p-2"
                      onClick={() => {
                        setChurch(val);
                        toggleDropdown("church");
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

      {/* Add Button Message */}
      <div className="w-full flex justify-center my-4">
        <button
          className="px-4 py-2 font-bold bg-[#01438F] text-[#FCC346] rounded"
          onClick={() => {
            setShowModal(true);
          }}
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
          onConfirm={async () => {
            console.log("Saving...");
            try {
              const resp = await fetch("/api/worship/", {
                method: "POST",
                body: JSON.stringify({
                  event_name: eventName,
                  date: date,
                  worship_type: worshipType,
                  church: church.ID,
                }),
              });

              const addedID = (await resp.json())["ID"];
              await Promise.all([
                ...memberIds.map(async (id) => {
                  const resp = await fetch(`/api/worship/attendee`, {
                    method: "POST",
                    body: JSON.stringify({
                      worship: addedID,
                      type: "Member",
                      member: id,
                    }),
                  });
                  if (!resp.ok) {
                    showAlert({
                      type: "error",
                      message: "Error adding member " + id,
                    });
                  }
                }),
                ...guests.map(async (guest) => {
                  const resp = await fetch(`/api/worship/attendee`, {
                    method: "POST",
                    body: JSON.stringify({
                      worship: addedID,
                      type: "Guest",
                      full_name: guest.Name,
                      email: guest.Email,
                      invited_by: guest.invitedBy || null,
                    }),
                  });
                  if (!resp.ok) {
                    showAlert({
                      type: "error",
                      message: "Error adding guest" + guest.Name,
                    });
                  }
                }),

                // images
              ]);
            } catch (err) {
              showAlert({
                type: "error",
                message: "Error while adding event: " + err,
              });
            }
            setShowModal(false);
            router.push("/event");
          }}
          message="Are you sure you want to add this worship event?"
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

      {isRegistrationModalOpen && (
        <RegistrationModal
          isOpen={isRegistrationModalOpen}
          onClose={() => setIsRegistrationModalOpen(false)}
          onSubmit={(formData) => {
            console.log(formData);
            setGuests((prev) => [...prev, formData]);
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
                    name: "Name",
                    label: "Full Name:",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "Email",
                    label: "Email:",
                    type: "email",
                    required: true,
                  },
                  {
                    name: "invitedBy",
                    label: "Invited By (Member ID):",
                    type: "text",
                  },
                ]
          }
        />
      )}
    </div>
  );
}
