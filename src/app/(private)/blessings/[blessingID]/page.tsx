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
        setMembers(
          members.map((attendee) => ({
            ...attendee,
            attendee_id: attendee.ID,
            ID: attendee.Member.ID,
            Name: attendee.Member['Full Name'], // Fix members
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

  useEffect(() => {
    const fetchMembers = async () => {
      const fetched = await Promise.all([
        ...members,
        ...memberIds.map(async (id) => {
          try {
            const resp = await fetch(`/api/members/${id}`, { method: 'GET' });
            if (resp.ok) {
              return await resp.json();
            } else {
              alert('Error while fetching member id: ' + id);
              return null;
            }
          } catch (error) {
            console.error('Error fetching member:', error);
            return null;
          }
        }),
      ]);

      const validMembers = fetched.filter((member) => member !== null);
      setMembers(validMembers);
    };

    fetchMembers();
  }, [memberIds]);

  return (
    <div className="min-h-screen flex flex-col items-center px-0 lg:px-[150px] mt-7 mb-10">
      {/* Page Title */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center justify-center">
        <p className="text-3xl font-bold uppercase">VIEW BLESSING</p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen py-4 w-full gap-6">
        {/* Attendance Tables */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">Members Blessed</h2>
          <Table
            data={members}
            columns={{
              lg: ['Member ID', 'Name'],
              md: ['Member ID', 'Name'],
              sm: ['Name'],
            }}
          />
          <h2 className="text-lg font-semibold mt-4 mb-3 flex justify-between">Guests Blessed</h2>
          <Table
            data={guests}
            columns={{
              lg: ['Name'],
              md: ['Name'],
              sm: ['Name'],
            }}
          />
        </div>

        {/* Blessing Event Details */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Blessing</h2>
          <div className="flex flex-col mb-5 w-full">
            <label className="text-base mb-2">Event Name:</label>
            <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
              <p className="text-base">{formData.name_of_blessing}</p>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-base mb-2">Date:</label>
            <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
              <p className="text-base">{formData.blessing_date}</p>{' '}
              {/* Optional: Replace with formData.blessing_date */}
            </div>
          </div>
          {/* Checkbox */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Chaenbo/HTM</h2>
            <div className="block mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.chaenbo === 'Vertical'}
                readOnly
              />
              <label>Vertical</label>
            </div>
            <div className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.chaenbo === 'Horizontal'}
                readOnly
              />
              <label>Horizontal</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
