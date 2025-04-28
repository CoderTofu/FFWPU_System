'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Table from '@/components/Table';

export default function ViewWorshipEvent() {
  const params = useParams();

  const [attendees, setAttendees] = useState([]);
  const [guests, setGuests] = useState([]);
  const [worshipInfo, setWorshipInfo] = useState({});
  const [church, setChurch] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/worship/${params.eventID}`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setGuests(data.Attendees.filter((a) => a.Type === 'Guest'));
        const members = data.Attendees.filter((a) => a.Type === 'Member');
        setAttendees(
          members.map((a) => ({
            ID: a.Member.ID,
            'Full Name': a.Member['Full Name'],
          }))
        );
        setWorshipInfo(data);
        console.log(data?.Church.Name);
        setChurch(data?.Church.Name); // You might need to adjust this
        setImages(data?.Images || []); // Assume `Images` is array of URLs
      } else {
        alert('Failed to fetch event information');
      }
    })();
  }, []);

  const columnConfig = {
    lg: ['ID', 'Full Name'],
    md: ['ID', 'Full Name'],
    sm: ['Full Name'],
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen p-6 sm:p-12">
      {/* Event Info Header */}
      <div className="w-full bg-white p-6 rounded-lg shadow-md border-2 border-[#01438F] text-center">
        <h1 className="text-3xl font-bold uppercase text-[#01438F]">Event Information</h1>
      </div>

      {/* Main Content */}
      <section className="mt-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Attendees and Guests */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Members */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#1C5CA8] mb-6">Members Attended</h2>
              <Table data={attendees} columns={columnConfig} />
            </div>

            {/* Guests */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#1C5CA8] mb-6">Guests Attended</h2>
              <Table
                data={guests}
                columns={{
                  lg: ['Full Name', 'Email'],
                  md: ['Full Name', 'Email'],
                  sm: ['Full Name'],
                }}
              />
            </div>
          </div>

          {/* Right: Event Details */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#1C5CA8] mb-8 text-center">Event Details</h2>
            <div className="flex flex-col gap-6">
              <DetailField label="Worship ID" value={worshipInfo.ID} />
              <DetailField label="Event Name" value={worshipInfo['Event Name']} />
              <DetailField label="Date" value={worshipInfo.Date} />
              <DetailField label="Worship Type" value={worshipInfo['Worship Type']} />
              <DetailField label="Church" value={church} />
            </div>
          </div>
        </div>
      </section>

      {/* Event Images at Bottom */}
      <section className="w-full mt-20">
        <h2 className="text-2xl font-bold text-center text-[#1C5CA8] mb-8">Event Photos</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {images.length > 0 ? (
            images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-[300px] h-[200px] overflow-hidden rounded-lg shadow-md border-2 border-[#01438F]"
              >
                <img
                  src={imgUrl}
                  alt={`Event Image ${idx}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No images uploaded for this event.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function DetailField({ label, value }) {
  return (
    <div className="flex flex-col">
      <label className="font-bold text-base mb-1">{label}:</label>
      <div className="border-2 border-[#01438F] rounded-md p-2 bg-white">
        <p className="text-base">{value || '-'}</p>
      </div>
    </div>
  );
}
