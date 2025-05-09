'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Table from '@/components/Table';
import { useAlert } from '@/components/context/AlertContext';

export default function ViewWorshipEvent() {
  const { showAlert } = useAlert();
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

        if (members.length > 0) {
          setAttendees(
            members.map((a) => ({
              ID: a.Member.ID,
              'Full Name': a.Member['Full Name'],
            }))
          );
        }
        setWorshipInfo(data);
        setChurch(data?.Church.Name); // You might need to adjust this
        setImages(data?.Images || []); // Assume `Images` is array of URLs
        console.log(data?.Images);
      } else {
        showAlert({ type: 'error', title: 'Failed to fetch event information' });
      }
    })();
  }, []);

  const columnConfig = {
    lg: ['ID', 'Full Name'],
    md: ['ID', 'Full Name'],
    sm: ['Full Name'],
  };

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] my-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#01438F] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">EVENT INFORMATION</p>
      </div>

      <div className="flex flex-col lg:flex-row py-4 w-full gap-6">
        {/* Attendance Tables */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-3 flex justify-between">Member Attendees</h2>
          <div className="max-h-[250px] overflow-y-auto border border-[#CBCBCB] shadow-lg rounded-lg">
            <Table
              data={attendees}
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

        {/* Worship Event Details */}
        <div className="lg:w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col">
          <h2 className="text-lg font-semibold mb-5">Worship Event Details</h2>

          <DetailField label="Worship ID" value={worshipInfo.ID} />
          <DetailField label="Event Name" value={worshipInfo['Event Name']} />
          <DetailField label="Date" value={worshipInfo.Date} />
          <DetailField label="Worship Type" value={worshipInfo['Worship Type']} />
          <DetailField label="Church" value={church} />

          {/* Show uploaded images */}
          {images.length > 0 && (
            <div className="mt-4 flex flex-col gap-4">
              {images.map((image, idx) => {
                const src = image.url ?? image.photoUrl ?? image.photo;
                return (
                  <div key={idx} className="w-fit h-auto">
                    <img
                      src={src}
                      alt={`Uploaded ${idx}`}
                      className="w-fit h-auto object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value }) {
  return (
    <div className="flex flex-col">
      <label className="font-bold text-base mb-1">{label}:</label>
      <div className="border-2 border-gray-400 rounded-md p-2 bg-white">
        <p className="text-base">{value || '-'}</p>
      </div>
    </div>
  );
}
