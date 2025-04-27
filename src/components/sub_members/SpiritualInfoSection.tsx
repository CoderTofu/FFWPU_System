import React from "react";

interface Props {
  formData: any;
  setFormData: (callback: (prev: any) => any) => void;
}

export default function SpiritualInfoSection({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#01438f] mb-2">
          Spiritual Information
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Provide your spiritual background and membership details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generation (Dropdown) */}
        <div className="flex flex-col">
          <label htmlFor="generation" className="text-sm font-semibold text-gray-700 mb-1">
            Generation<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="generation"
            name="generation"
            value={formData.generation}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select Generation</option>
            <option value="1st Generation">1st Generation</option>
            <option value="2nd Generation">2nd Generation</option>
            <option value="3rd Generation">3rd Generation</option>
          </select>
        </div>

        {/* Blessing Status (Dropdown) */}
        <div className="flex flex-col">
          <label htmlFor="blessingStatus" className="text-sm font-semibold text-gray-700 mb-1">
            Blessing Status<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="blessingStatus"
            name="blessingStatus"
            value={formData.blessingStatus}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select Blessing Status</option>
            <option value="Blessed">Blessed</option>
            <option value="Not Blessed">Not Blessed</option>
          </select>
        </div>

        {/* Spiritual Birthday */}
        <div className="flex flex-col">
          <label htmlFor="spiritualBirthday" className="text-sm font-semibold text-gray-700 mb-1">
            Spiritual Birthday<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="spiritualBirthday"
            name="spiritualBirthday"
            type="date"
            value={formData.spiritualBirthday}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Spiritual Parent */}
        <div className="flex flex-col">
          <label htmlFor="spiritualParent" className="text-sm font-semibold text-gray-700 mb-1">
            Spiritual Parent<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="spiritualParent"
            name="spiritualParent"
            value={formData.spiritualParent}
            onChange={handleChange}
            placeholder="Enter spiritual parent's name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Membership Category */}
        <div className="flex flex-col">
          <label htmlFor="membershipCategory" className="text-sm font-semibold text-gray-700 mb-1">
            Membership Category<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="membershipCategory"
            name="membershipCategory"
            value={formData.membershipCategory}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select Membership</option>
            <option value="Regular">Regular</option>
            <option value="Associate">Associate</option>
            <option value="Registered">Registered</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </section>
  );
}
