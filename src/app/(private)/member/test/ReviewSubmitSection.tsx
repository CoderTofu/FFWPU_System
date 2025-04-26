import React from "react";

interface Props {
  formData: any;
}

export default function ReviewSubmitSection({ formData }: Props) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#01438f] mb-2">
          Review Your Information
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please review all the information carefully before submitting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="flex flex-col items-center col-span-1 md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-[#01438f] mb-4">Profile Image</h3>
          {formData.image ? (
            <img
              src={formData.image}
              alt="Profile Preview"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-sm"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border-4 border-gray-300 shadow-sm">
              No Image Uploaded
            </div>
          )}
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-[#01438f] mb-4">Personal Information</h3>
          <div><strong>Given Name:</strong> {formData.givenName || "-"}</div>
          <div><strong>Middle Name:</strong> {formData.middleName || "-"}</div>
          <div><strong>Family Name:</strong> {formData.familyName || "-"}</div>
          <div><strong>Gender:</strong> {formData.gender || "-"}</div>
          <div><strong>Birthdate:</strong> {formData.birthdate || "-"}</div>
          <div><strong>Region:</strong> {formData.region || "-"}</div>
          <div><strong>Subregion:</strong> {formData.subRegion || "-"}</div>
          <div><strong>Phone:</strong> {formData.phone || "-"}</div>
          <div><strong>Email:</strong> {formData.email || "-"}</div>
          <div><strong>Address:</strong> {formData.address || "-"}</div>
        </div>

        {/* SPIRITUAL INFO */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-[#01438f] mb-4">Spiritual Information</h3>
          <div><strong>Generation:</strong> {formData.generation || "-"}</div>
          <div><strong>Blessing Status:</strong> {formData.blessingStatus || "-"}</div>
          <div><strong>Spiritual Birthday:</strong> {formData.spiritualBirthday || "-"}</div>
          <div><strong>Spiritual Parent:</strong> {formData.spiritualParent || "-"}</div>
          <div><strong>Membership Category:</strong> {formData.membershipCategory || "-"}</div>
        </div>

        {/* MISSION HISTORY */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm col-span-1 md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-[#01438f] mb-4">Mission History</h3>
          {formData.missionHistory?.length > 0 ? (
            formData.missionHistory.map((mission: any, idx: number) => (
              <div key={idx} className="border border-gray-300 rounded-md p-4 space-y-1">
                <div><strong>Role:</strong> {mission.role || "-"}</div>
                <div><strong>Organization:</strong> {mission.organization || "-"}</div>
                <div><strong>Country:</strong> {mission.country || "-"}</div>
                <div><strong>Start Date:</strong> {mission.startDate || "-"}</div>
                <div><strong>End Date:</strong> {mission.endDate || "-"}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No mission history provided.</div>
          )}
        </div>
      </div>

      <p className="text-center text-gray-500 mt-6">
        If everything looks good, click <span className="font-bold text-[#01438f]">Submit</span> on the next step!
      </p>
    </section>
  );
}
