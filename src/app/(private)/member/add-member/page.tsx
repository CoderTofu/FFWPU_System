"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { middleware } from "@/middleware";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    gender: "",
    birthdate: "",
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
  });

  const [image, setImage] = useState<string | null>(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [subregions, setSubregions] = useState([]);
  const [selectedSubregion, setSelectedSubregion] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const regionQuery = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/region", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
  
  const subregionQuery = useQuery({
    queryKey: ["subregions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/subregion", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const missionMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/members/member-mission", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    },
  });

  const memberMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/members/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    },
    onSuccess: (data) => {
      formData.missionHistory.forEach((mission) => {
        const missionData = {
          member: data["ID"],
          role: mission.role,
          organization: mission.organization,
          country: mission.country,
          start_date: mission.startDate,
          end_date: mission.endDate,
        };
        missionMutation.mutate(missionData);
      });
      queryClient.refetchQueries(["members"]);
      alert("Successfully created user");
    },
    onError: (error) => {
      alert("An error occurred");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHistoryChange = (index: number, field: string, value: string) => {
    const updatedHistory = [...formData.missionHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      missionHistory: updatedHistory,
    }));
  };

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
    }));
  };

  const removeHistory = (index: number) => {
    const updatedHistory = [...formData.missionHistory];
    updatedHistory.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      missionHistory: updatedHistory,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setImage(event.target.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission logic
    console.log("Form submitted:", formData);
    const data = {
      given_name: formData.givenName,
      middle_name: formData.middleName,
      family_name: formData.familyName,
      gender: formData.gender,
      birthday: formData.birthdate,
      region: formData.region,
      nation: formData.nation,
      marital_status: formData.maritalStatus,
      name_of_spouse: formData.spouseName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      image,
      generation: formData.generation,
      blessing_status: formData.blessingStatus,
      spiritual_birthday: formData.spiritualBirthday,
      spiritual_parent: formData.spiritualParent,
      membership_category: formData.membershipCategory,
    };
    memberMutation.mutate(data);
  };

  useEffect(() => {
    if (regionQuery.status === "success") {
      console.log(regionQuery.data);
      setRegions(regionQuery.data);
    } else if (regionQuery.status === "error") {
      alert("An error occurred while fetching data.");
    }
  }, [regionQuery.data, regionQuery.status]);

  useEffect(() => {
    if (subregionQuery.status === "success") {
      console.log(subregionQuery.data);
      setSubregions(subregionQuery.data);
    } else if (subregionQuery.status === "error") {
      alert("An error occurred while fetching data.");
    }
  }, [subregionQuery.data, subregionQuery.status]);

  return (
    <div className="px-0 md:px-[60px] lg:px-[150px] mt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto mt-3 bg-white rounded-md drop-shadow-lg flex items-center mb-4 justify-center">
        <p className="text-3xl font-bold uppercase">ADD MEMBER</p>
      </div>
      <div className="mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <section className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg text-[#BE9231] font-bold mb-6">
              PERSONAL INFORMATION
            </h2>

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
                    {errors.givenName && (
                      <p className="text-[#E00000] text-xs mt-1">
                        Given Name is Required
                      </p>
                    )}
                  </div>

                  {/* Middle Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Middle Name
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
                    {errors.familyName && (
                      <p className="text-[#E00000] text-xs mt-1">
                        Family Name is Required
                      </p>
                    )}
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
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {/* Region */}
                  {/* SubRegion */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Region<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      required
                    >
                      <option value="">SELECT </option>
                      {regions.map((region) => (
                        <option value={region.id} key={region.id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
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
                      <option value="">SELECT </option>
                      {subregions.map((subregion) => (
                        <option value={subregion.id} key={subregion.id}>
                          {subregion.name}
                        </option>
                      ))}
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
                      Name of Spouse
                    </label>
                    <input
                      type="text"
                      name="spouseName"
                      value={formData.spouseName}
                      onChange={handleChange}
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
                    {errors.email && (
                      <p className="text-[#E00000] text-xs mt-1">
                        Please Enter a Valid Email
                      </p>
                    )}
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
            <h2 className="text-lg text-[#BE9231] font-bold mb-6">
              SPIRITUAL INFORMATION
            </h2>
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

                <select
                  name="membershipCategory"
                  value={formData.membershipCategory}
                  onChange={handleChange}
                  className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">SELECT</option>
                  <option value="Regular">Regular</option>
                  <option value="Associate">Associate</option>
                  <option value="Registered">Registered</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </section>

          {/* Mission History Section */}
          <section className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg text-[#BE9231] font-bold mb-6">
              MISSION HISTORY
            </h2>

            {formData.missionHistory.map((entry, index) => (
              <div key={index} className="flex flex-col lg:flex-row mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 flex-grow">
                  {/* Mission Title/Role */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Mission Title/Role
                    </label>
                    <input
                      type="text"
                      value={entry.role}
                      onChange={(e) =>
                        handleHistoryChange(index, "role", e.target.value)
                      }
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={entry.organization}
                      onChange={(e) =>
                        handleHistoryChange(
                          index,
                          "organization",
                          e.target.value
                        )
                      }
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      value={entry.country}
                      onChange={(e) =>
                        handleHistoryChange(index, "country", e.target.value)
                      }
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">SELECT</option>
                      <option value="Philippines">Philippines</option>
                      <option value="U.S.A.">U.S.A.</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={entry.startDate}
                      onChange={(e) =>
                        handleHistoryChange(index, "startDate", e.target.value)
                      }
                      className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={entry.endDate}
                      onChange={(e) =>
                        handleHistoryChange(index, "endDate", e.target.value)
                      }
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
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
