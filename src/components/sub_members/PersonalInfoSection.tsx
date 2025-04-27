import React from "react";

interface Props {
  formData: any;
  setFormData: (callback: (prev: any) => any) => void;
}

export default function PersonalInfoSection({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#01438f] mb-2">
          Personal Information
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Fill out your personal details accurately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Given Name */}
        <div className="flex flex-col">
          <label htmlFor="givenName" className="text-sm font-semibold text-gray-700 mb-1">
            Given Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="givenName"
            name="givenName"
            value={formData.givenName}
            onChange={handleChange}
            placeholder="Enter your given name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Middle Name */}
        <div className="flex flex-col">
          <label htmlFor="middleName" className="text-sm font-semibold text-gray-700 mb-1">
            Middle Name
          </label>
          <input
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your middle name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Family Name */}
        <div className="flex flex-col">
          <label htmlFor="familyName" className="text-sm font-semibold text-gray-700 mb-1">
            Family Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="familyName"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            placeholder="Enter your family name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm font-semibold text-gray-700 mb-1">
            Gender<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Birthdate */}
        <div className="flex flex-col">
          <label htmlFor="birthdate" className="text-sm font-semibold text-gray-700 mb-1">
            Birthdate<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Marital Status (NEW) */}
        <div className="flex flex-col">
          <label htmlFor="maritalStatus" className="text-sm font-semibold text-gray-700 mb-1">
            Marital Status<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select marital status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
      </div>
    </section>
  );
}
