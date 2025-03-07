"use client"
import { useState } from "react";

interface MemberData {
  givenName: string;
  middleName: string;
  familyName: string;
  age: string;
  birthdate: string;
  gender: string;
  history: HistoryEntry[];
}

interface HistoryEntry {
  role: string;
  organization: string;
  country: string;
  startDate: string;
  endDate: string;
}

export default function AddMemberForm() {
  const [formData, setFormData] = useState<MemberData>({
    givenName: "",
    middleName: "",
    familyName: "",
    age: "",
    birthdate: "",
    gender: "",
    history: [{ role: "", organization: "", country: "", startDate: "", endDate: "" }],
  });

  // Handle input changes for member details
  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input changes for history details
  const handleHistoryChange = (index: number, field: keyof HistoryEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      history: prev.history.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)),
    }));
  };

  // Add another history entry
  const addHistory = () => {
    setFormData((prev) => ({
      ...prev,
      history: [...prev.history, { role: "", organization: "", country: "", startDate: "", endDate: "" }],
    }));
  };

  // Remove a history entry
  const removeHistory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      history: prev.history.filter((_, i) => i !== index),
    }));
  };

  return (
    <form className="space-y-6 p-6 max-w-4xl mx-auto border rounded-lg shadow-md">
      {/* Member Details */}
      <h2 className="text-lg font-semibold">Member Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="givenName" placeholder="Given Name" value={formData.givenName} onChange={handleMemberChange} className="h-12 w-full border rounded-lg px-3 text-base" required />
        <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleMemberChange} className="h-12 w-full border rounded-lg px-3 text-base" />
        <input type="text" name="familyName" placeholder="Family Name" value={formData.familyName} onChange={handleMemberChange} className="h-12 w-full border rounded-lg px-3 text-base" required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleMemberChange} className="h-12 w-full border rounded-lg px-3 text-base" min="0" required />
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleMemberChange} className="h-12 w-full border rounded-lg px-3 text-base appearance-none" required />
        <select name="gender" value={formData.gender} onChange={handleMemberChange} className="h-12 w-full border rounded-lg px-3 text-base bg-white" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* History Details */}
      <h2 className="text-lg font-semibold mt-6">History Details</h2>
      {formData.history.map((entry, index) => (
        <div key={index} className="flex flex-row gap-4 items-end border-b pb-4">
          <input type="text" placeholder="Role" value={entry.role} onChange={(e) => handleHistoryChange(index, "role", e.target.value)} className="h-12 flex-1 border rounded-lg px-3 text-base" required />
          <input type="text" placeholder="Organization" value={entry.organization} onChange={(e) => handleHistoryChange(index, "organization", e.target.value)} className="h-12 flex-1 border rounded-lg px-3 text-base" required />
          <select value={entry.country} onChange={(e) => handleHistoryChange(index, "country", e.target.value)} className="h-12 flex-1 border rounded-lg px-3 text-base bg-white" required>
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          <input type="date" value={entry.startDate} onChange={(e) => handleHistoryChange(index, "startDate", e.target.value)} className="h-12 flex-1 border rounded-lg px-3 text-base appearance-none" required />
          <input type="date" value={entry.endDate} onChange={(e) => handleHistoryChange(index, "endDate", e.target.value)} className="h-12 flex-1 border rounded-lg px-3 text-base appearance-none" required />

          {/* First entry always has Add button, others only have Delete */}
          {index === 0 ? (
            <button type="button" onClick={addHistory} className="h-12 px-4 bg-green-600 text-white rounded-lg text-base hover:bg-green-700">
              Add
            </button>
          ) : (
            <button type="button" onClick={() => removeHistory(index)} className="h-12 px-4 bg-red-600 text-white rounded-lg text-base hover:bg-red-700">
              Delete
            </button>
          )}
        </div>
      ))}

      {/* Submit */}
      <button type="submit" className="h-12 w-full bg-blue-600 text-white rounded-lg text-base hover:bg-blue-700">
        Submit Member
      </button>
    </form>
  );
}
