"use client";

import { useEffect, useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";
import { useParams } from "next/navigation";

export default function AddBlessing() {
  const params = useParams();
  const [members, setMembers] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [guests, setGuests] = useState([]);
  const [newGuests, setNewGuests] = useState([]);
  const [formData, setFormData] = useState({
    name_of_blessing: "",
    blessing_date: "",
    chaenbo: 1,
  });
  const chaenboMap = { Vertical: 1, Horizontal: 2 };
  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/blessings/${params.blessingID}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setMembers(data.Members);
        const ids = data.Members.map((member) => member["Member ID"]);
        setMemberIds([...ids]);
        setGuests(data.Guests);
        setFormData({
          name_of_blessing: data["Name Of Blessing"],
          blessing_date: data["Blessing Date"],
          chaenbo: chaenboMap[data.Chaenbo],
        });
      }
    })();
  }, []);
  const [selectedMember, setSelectedMember] = useState<{
    "Member ID": number;
  } | null>(null);
  const [selectedGuest, setSelectedGuest] = useState<{
    "Guest ID": number;
  } | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "member" | "guest" | null
  >(null);
  const handleOpenRegistration = (type: "member" | "guest") => {
    setRegistrationType(type);
    setIsRegistrationModalOpen(true);
  };

  const handleGuestDelete = async () => {
    console.log("Deleting Guest: " + selectedGuest);
    const res = await fetch(
      `/api/blessings/${params.blessingID}/remove-guest`,
      {
        method: "POST",
        body: JSON.stringify({ guest_id: selectedGuest["Guest ID"] }),
      }
    );
    if (res.ok) {
      alert("Successfully deleted guest" + selectedGuest.Name);
      location.reload();
    } else {
      alert("An error occurred while removing guest");
    }
  };
  const handleMemberDelete = async () => {
    console.log("Deleting Member: " + selectedMember);
    const res = await fetch(
      `/api/blessings/${params.blessingID}/remove-member`,
      {
        method: "PATCH",
        body: JSON.stringify({ member_id: selectedMember["Member ID"] }),
      }
    );
    if (res.ok) {
      alert("Successfully deleted member");
      location.reload();
    } else {
      alert("An error occurred while removing member: " + res.statusText);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const fetched = await Promise.all(
        memberIds.map(async (id) => {
          try {
            const resp = await fetch(`/api/members/${id}`, { method: "GET" });
            if (resp.ok) {
              return await resp.json();
            } else {
              alert("Error while fetching member id: " + id);
              return null; // Return null or handle the error case
            }
          } catch (error) {
            console.error("Error fetching member:", error);
            return null; // Return null or handle the error case
          }
        })
      );

      // Filter out any null values (from failed fetches)
      const validMembers = fetched.filter((member) => member !== null);
      setMembers(validMembers);
    };

    fetchMembers();
  }, [memberIds]);

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
          <Table
            data={members}
            columns={{
              lg: ["Member ID", "Full Name"],
              md: ["Member ID", "Full Name"],
              sm: ["Full Name"],
            }}
            onRowSelect={setSelectedMember}
          />

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
          <Table
            data={[...guests, ...newGuests]}
            columns={{
              lg: ["Name", "Email"],
              md: ["Name", "Email"],
              sm: ["Name"],
            }}
            onRowSelect={setSelectedGuest}
          />
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
            value={formData.name_of_blessing}
            onChange={(e) =>
              setFormData({ ...formData, name_of_blessing: e.target.value })
            }
          />
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              className="w-full border border-[#01438F] p-2 rounded mt-2 pr-10"
              type="text"
              placeholder="MM/DD/YYYY"
              value={formData.blessing_date}
              onChange={(e) =>
                setFormData({ ...formData, blessing_date: e.target.value })
              }
            />
            <Calendar
              className="absolute right-3 top-4 text-[#01438F] cursor-pointer"
              size={16}
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
                      chaenbo: e.target.checked ? 1 : 2,
                    })
                  }
                  checked={formData.chaenbo === 1}
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
                      chaenbo: e.target.checked ? 2 : 1,
                    })
                  }
                  checked={formData.chaenbo === 2}
                />
                <label>Horizontal</label>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* Save Button Below Container */}
      <div className="w-full max-w-[1420px] flex justify-center my-3">
        <button
          className="px-4 py-2 font-bold bg-[#01438F] text-[#FCC346] rounded"
          onClick={() => setShowModal(true)}
        >
          EDIT BLESSING
        </button>
      </div>

      {/* Modal for Adding Blessing*/}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={async () => {
            console.log("Saving...");
            console.log(memberIds);
            const res = await fetch(`/api/blessings/${params.blessingID}`, {
              method: "PATCH",
              body: JSON.stringify(formData),
            });
            if (res.ok) {
              const memberRes = await fetch(
                `/api/blessings/${params.blessingID}/add-member`,
                {
                  method: "PATCH",
                  body: JSON.stringify({ members: memberIds }),
                }
              );
              if (memberRes.ok) {
                alert("Successfully added members");
              } else {
                alert("Failed to add members");
              }

              await Promise.all(
                newGuests.map(async (guest) => {
                  const g = await fetch(
                    `/api/blessings/${params.blessingID}/add-guest`,
                    {
                      method: "POST",
                      body: JSON.stringify({
                        name: guest.Name,
                        email: guest.Email,
                        invited_by: guest.invitedBy || null,
                      }),
                    }
                  );
                  if (g.ok) {
                    alert("Successfully added guest " + guest.Name);
                  } else {
                    alert("Error while adding guest " + guest.Name);
                  }
                })
              );

              alert("Successfully added blessing");
            } else {
              alert("Error updating members");
            }
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
            if (registrationType === "member") {
              const id = parseInt(formData.memberId);
              if (memberIds.includes(id)) {
                alert(
                  `Member ID ${formData.memberId} is already in the blessing.`
                );
              } else {
                setMemberIds((prev) => [...prev, id]);
              }
            } else {
              setNewGuests([...newGuests, formData]);
            }
            setIsRegistrationModalOpen(false);
          }}
          title={
            registrationType === "member"
              ? "Member Registration"
              : "Guest Registration"
          }
          fields={
            registrationType === "member"
              ? [{ name: "memberId", label: "Member ID", type: "text" }]
              : [
                  {
                    name: "Name",
                    label: "Full Name",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "Email",
                    label: "Email",
                    type: "email",
                    required: true,
                  },
                  { name: "invitedBy", label: "Invited By", type: "text" },
                ]
          }
        />
      )}
    </div>
  );
}
