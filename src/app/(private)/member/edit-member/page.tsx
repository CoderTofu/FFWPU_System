"use client"
import { useState } from "react";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    age: "",
    birthdate: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Member Data:", formData);
    // Add API call here to store data in the database
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Given Name</label>
        <input
          type="text"
          name="givenName"
          value={formData.givenName}
          onChange={handleChange}
          className="h-12 w-full border rounded-lg px-3 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Middle Name</label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          className="h-12 w-full border rounded-lg px-3 text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Family Name</label>
        <input
          type="text"
          name="familyName"
          value={formData.familyName}
          onChange={handleChange}
          className="h-12 w-full border rounded-lg px-3 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="h-12 w-full border rounded-lg px-3 text-base"
          min="0"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Birthdate</label>
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="h-12 w-full border rounded-lg px-3 text-base appearance-none"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="h-12 w-full border rounded-lg px-3 text-base bg-white"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <button type="submit" className="h-12 w-full bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700">
        Add Member
      </button>
    </form>
  );
}