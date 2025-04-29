"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Table from '@/components/Table';

export default function AddBlessing() {
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
        const guests = data.Recipients.filter((attendee) => attendee.Type === 'Guest');
        setGuests(
          guests.map((guest) => ({
            ...guest,
            Name: guest['Full Name'] || guest.Name, // Fix guests
          }))
        );
        const members = data.Recipients.filter((attendee) => attendee.Type === 'Member');
        console.log(data.Recipients);
        setMembers(
          members.map((attendee) => ({
            ...attendee,
            attendee_id: attendee.ID,
            'Member ID': attendee.Member.ID,
            ID: attendee.Member.ID,
            Name: attendee.Member['Full Name'],
            'Full Name': attendee.Member['Full Name'],
          }))
        );

        setFormData({
          name_of_blessing: data['Name'],
          blessing_date: data['Date'],
          chaenbo: data.Chaenbo,
        });
      }
    })();
  }, []);

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] my-8">
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">VIEW BLESSING</p>
      </div>

      <div className="flex flex-col lg:flex-row py-4 w-full gap-6">
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">Member Attendees</h2>
          <div className="max-h-[250px] overflow-y-auto border border-[#CBCBCB] shadow-lg rounded-lg">
            <Table
              data={members}
              columns={{
                lg: ['ID', 'Full Name'],
                md: ['ID', 'Full Name'],
                sm: ['Full Name'],
              }}
            />
          </div>
          <h2 className="text-lg font-semibold mt-4 mb-3 flex justify-between">Guest Attendees</h2>
          <div className="max-h-[250px] overflow-y-auto border border-[#CBCBCB] shadow-lg rounded-lg">
            <Table
              data={[...guests]}
              columns={{
                lg: ['Full Name', 'Email'],
                md: ['Full Name', 'Email'],
                sm: ['Full Name'],
              }}
            />
          </div>
        </div>
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Blessing</h2>
          <label className="block font-medium">Name</label>
          <input
            className="w-full border border-[#01438F] p-2 rounded mt-2 pointer-events-none"
            placeholder="Enter Name"
            value={formData.name_of_blessing}
            onChange={(e) => setFormData({ ...formData, name_of_blessing: e.target.value })}
          />
          <label className="block font-medium mt-5">Date</label>
          <div className="relative w-full">
            <input
              className="w-full border border-[#01438F] p-2 rounded mt-2 pr-10  pointer-events-none"
              type="date"
              placeholder="MM/DD/YYYY"
              value={formData.blessing_date}
              onChange={(e) => setFormData({ ...formData, blessing_date: e.target.value })}
            />
          </div>
          {/*Checkbox*/}
          <div className="mt-8">
            <fieldset className="pointer-events-none">
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
    </div>
  );
}
