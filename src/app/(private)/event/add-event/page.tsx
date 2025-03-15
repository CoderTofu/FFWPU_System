"use client";

import { useEffect, useRef, useState } from "react";
import {
  PlusCircle,
  Calendar,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";
import { axiosInstance } from "@/app/axiosInstance";
import Cookies from "js-cookie";

export default function AddWorshipEvent() {
  const [memberIds, setMemberIds] = useState([]);
  const [members, setMembers] = useState([]);
  const worshipTypes = { Onsite: 1, Online: 2 };
  // const [members, setMembers] = useState([
  //   { "Member ID": "M001", Name: "Binose" },
  //   { "Member ID": "M002", Name: "Lans" },
  //   { "Member ID": "M001", Name: "Ye Em" },
  //   { "Member ID": "M002", Name: "Cess" },
  //   { "Member ID": "M001", Name: "Dril" },
  //   { "Member ID": "M002", Name: "Pao" },
  // ]);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const [openDropdown, setOpenDropdown] = useState("");
  const [churches, setChurches] = useState([]);
  const [church, setChurch] = useState(null);

  useEffect(() => {
    axiosInstance.get("/members/church").then((res) => setChurches(res.data));
  }, []);
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
    setMembers(members.filter((member) => member !== selectedMember));
    setMemberIds(memberIds.filter((id) => id != selectedMember["Member ID"]));
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  useEffect(() => {
    const fetched = [];
    memberIds.forEach((id) => {
      axiosInstance
        .get(`/members/${id}`)
        .then((res) => {
          fetched.push(res.data);
        })
        .finally(() => {
          setMembers(fetched);
        });
    });
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
                onClick={() => handleOpenRegistration("member")}
              />
            </div>
          </h2>
          <div className="max-h-[250px] overflow-y-auto">
            <Table
              data={members}
              columns={{
                lg: ["Member ID", "Full Name"],
                md: ["Member ID", "Full Name"],
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
          onConfirm={() => {
            console.log("Saving...");
            axiosInstance
              .post("/worship/", {
                name: eventName,
                date: date,
                worship_type: worshipTypes[worshipType],
                church: church.ID,
              })
              .then((res) => {
                if (res.status === 201) {
                  console.log(res.data);
                  alert("Successfully added worship! " + res.data);
                  console.log(res.data);

                  const addedID = res.data["Worship ID"];
                  memberIds.forEach((id) => {
                    axiosInstance
                      .post(`/worship/${addedID}/add-attendee`, {
                        member_id: id,
                      })
                      .then((res) => {
                        console.log("added " + id);
                      });
                  });
                } else {
                  alert(
                    "An error occurred while adding worship: " + res.statusText
                  );
                }
              })
              .finally(() => {});

            // guests.forEach((guest) => {
            //   axiosInstance.post('/worship/add-guest/', guest,  {
            //     headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
            //   })
            // })
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
            if (registrationType === "member") {
              if (memberIds.includes(formData.memberId)) {
                alert(`${formData.memberId} was already added to the event.`);
              } else {
                setMemberIds((prev) => [...prev, formData.memberId]);
              }
            } else {
              console.log(formData);
              setGuests((prev) => [...prev, formData]);
            }
            console.log("Registered:", formData);
            // handleSubmit(formData);
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
