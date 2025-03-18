"use client"

import type React from "react"

import { useState } from "react"
import { ImageIcon } from "lucide-react"

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    gender: "",
    birthdate: "",
    age: "",
    region: "",
    subRegion: "",
    maritalStatus: "",
    nation: "",
    spouseName: "",
    phone: "",
    email: "",
    address: "",
    generation: "",
    blessingStatus: "",
    spiritualBirthday: "",
    spiritualParent: "",
    membershipCategory: "",
    missionHistory: [
      {
        role: "",
        organization: "",
        country: "",
        startDate: "",
        endDate: "",
      },
    ],
  })

  const [image, setImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleHistoryChange = (index: number, field: string, value: string) => {
    const updatedHistory = [...formData.missionHistory]
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value,
    }
    setFormData((prev) => ({
      ...prev,
      missionHistory: updatedHistory,
    }))
  }

  const addHistory = () => {
    setFormData((prev) => ({
      ...prev,
      missionHistory: [
        ...prev.missionHistory,
        {
          role: "",
          organization: "",
          country: "",
          startDate: "",
          endDate: "",
        },
      ],
    }))
  }

  const removeHistory = (index: number) => {
    const updatedHistory = [...formData.missionHistory]
    updatedHistory.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      missionHistory: updatedHistory,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImage(event.target.result)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form validation and submission logic
    console.log("Form submitted:", formData)
  }

  return (
    <div className="p-4 md:p-8 bg-[#D9D9D9] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner */}
          <div className="bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md">
            <h1 className="my-4 text-center text-xl md:text-2xl lg:text-3xl font-semibold">EDIT MEMBER</h1>
          </div>

          {/* Personal Information Section */}
          <section className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg text-[#BE9231] font-bold mb-6">PERSONAL INFORMATION</h2>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Form Fields */}
              <div className="flex-1 space-y-6">
                {/* First Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* Given Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Given Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="givenName"
                      value={formData.givenName}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.givenName && <p className="text-[#E00000] text-xs mt-1">Given Name is Required</p>}
                  </div>

                  {/* Middle Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Middle Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Family Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Family Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.familyName && <p className="text-[#E00000] text-xs mt-1">Family Name is Required</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Gender<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">SELECT</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date of Birth<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Age<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="0"
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Region<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* SubRegion */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sub Region<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subRegion"
                      value={formData.subRegion}
                      onChange={handleChange}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      required
                    >
                      <option value="">SELECT</option>
                      <option value="SR1">Sub Region 1</option>
                      <option value="SR2">Sub Region 2</option>
                    </select>
                  </div>

                  {/* Nation */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nation<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nation"
                      value={formData.nation}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Marital Status */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Marital Status<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      required
                    >
                      <option value="">SELECT</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>

                  {/* Name of Spouse */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name of Spouse<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="spouseName"
                      value={formData.spouseName}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0912-345-6789"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="example@mail.com"
                    />
                    {errors.email && <p className="text-[#E00000] text-xs mt-1">Please Enter a Valid Email</p>}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Image Upload */}
              <div className="flex flex-col items-center justify-start space-y-4 w-full lg:w-48">
                <div className="w-32 h-32 border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-100">
                  {image ? (
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-800" />
                  )}
                </div>
                <label className="bg-[#01438f] text-[#FCC346] font-bold px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 text-center w-full max-w-[120px]">
                  UPLOAD
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-xs text-center text-gray-600">
                  Upload file (.JPEG, JPG, PNG)
                  <br />
                  1x1 size required
                </p>
              </div>
            </div>
          </section>

          {/* Spiritual Information Section */}
          <section className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg text-[#BE9231] font-bold mb-6">SPIRITUAL INFORMATION</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Generation */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Generation<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="generation"
                  value={formData.generation}
                  onChange={handleChange}
                  required
                  className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Blessing Status */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Blessing Status<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="blessingStatus"
                  value={formData.blessingStatus}
                  onChange={handleChange}
                  required
                  className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Spiritual Birthday */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Spiritual Birthday<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="spiritualBirthday"
                  value={formData.spiritualBirthday}
                  onChange={handleChange}
                  required
                  className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Spiritual Parent */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Spiritual Parent<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="spiritualParent"
                  value={formData.spiritualParent}
                  onChange={handleChange}
                  required
                  className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Membership Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Membership Category<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="membershipCategory"
                  value={formData.membershipCategory}
                  onChange={handleChange}
                  required
                  className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Mission History Section */}
          <section className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg text-[#BE9231] font-bold mb-6">MISSION HISTORY</h2>

            {formData.missionHistory.map((entry, index) => (
              <div key={index} className="flex flex-col lg:flex-row mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-grow">
                  {/* Mission Title/Role */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Mission Title/Role</label>
                    <input
                      type="text"
                      value={entry.role}
                      onChange={(e) => handleHistoryChange(index, "role", e.target.value)}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Organization</label>
                    <input
                      type="text"
                      value={entry.organization}
                      onChange={(e) => handleHistoryChange(index, "organization", e.target.value)}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <select
                      value={entry.country}
                      onChange={(e) => handleHistoryChange(index, "country", e.target.value)}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">SELECT</option>
                      <option value="Philippines">Philippines</option>
                      <option value="U.S.A.">U.S.A.</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={entry.startDate}
                      onChange={(e) => handleHistoryChange(index, "startDate", e.target.value)}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={entry.endDate}
                      onChange={(e) => handleHistoryChange(index, "endDate", e.target.value)}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Add/Delete Buttons */}
                <div className="flex justify-end mt-2 lg:mt-8 lg:ml-4">
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addHistory}
                      className="bg-[#01438f] text-[#FCC346] font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeHistory(index)}
                      className="bg-[#01438f] text-[#FCC346] font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Submit Button */}
          <div className="flex justify-center my-8">
            <button
              type="submit"
              className="bg-[#01438f] text-[#FCC346] font-bold px-12 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
            >
              EDIT
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}