"use client";

import { useState } from "react";
import { Calendar, PlusCircle } from "lucide-react";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import RegistrationModal from "@/components/RegistrationModal";

export default function AddBlessing() {
  const [members, setMembers] = useState([]);

  const [guests, setGuests] = useState([]);

  return (
    <div className="min-h-screen flex flex-col items-center px-0 lg:px-[150px] mt-7 mb-10">
      {/* Page Title */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">VIEW BLESSING</p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen py-4 w-full gap-6">
        {/* Attendance Tables */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">
            Members Blessed
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
            Guests Blessed
          </h2>
          <Table
            data={guests}
            columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }}
          />
        </div>

        {/* Blessing Event Details */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Blessing</h2>
          <div className="flex flex-col mb-5 w-full">
            <label className="text-base mb-2">Event Name:</label>
            <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
              <p className="text-base">Placeholder</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-base mb-2">Date:</label>
            <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
              <p className="text-base">Placeholder</p>
            </div>
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
    </div>
  );
}
