import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Props {
  formData: any;
  setFormData: (callback: (prev: any) => any) => void;
}

export default function ContactInfoSection({ formData, setFormData }: Props) {
  const [regions, setRegions] = useState([]);
  const [allSubregions, setAllSubregions] = useState([]);
  const [filteredSubregions, setFilteredSubregions] = useState([]);
  
  const nations = ['Philippines', 'USA', 'Korea', 'Japan', 'China', 'Other'];

  const regionQuery = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/region", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch regions");
      return res.json();
    },
  });

  const subregionQuery = useQuery({
    queryKey: ["subregions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/subregion", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch subregions");
      return res.json();
    },
  });

  useEffect(() => {
    if (regionQuery.status === "success") {
      setRegions(regionQuery.data);
    }
  }, [regionQuery.data, regionQuery.status]);

  useEffect(() => {
    if (subregionQuery.status === "success") {
      setAllSubregions(subregionQuery.data);
    }
  }, [subregionQuery.data, subregionQuery.status]);

  useEffect(() => {
    if (formData.region) {
      const filtered = allSubregions.filter(
        (sub: any) => sub.region === parseInt(formData.region)
      );
      setFilteredSubregions(filtered);
    } else {
      setFilteredSubregions([]);
    }
  }, [formData.region, allSubregions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "region") {
      setFormData((prev: any) => ({
        ...prev,
        region: value,
        subRegion: "", // Reset subregion when region changes
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#01438f] mb-2">
          Contact Information
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Provide your contact and location details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nation Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="nation" className="text-sm font-semibold text-gray-700 mb-1">
            Nation<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="nation"
            name="nation"
            value={formData.nation}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select Nation</option>
            {nations.map((nation) => (
              <option key={nation} value={nation}>
                {nation}
              </option>
            ))}
          </select>
        </div>

        {/* Region Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="region" className="text-sm font-semibold text-gray-700 mb-1">
            Region<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select Region</option>
            {regions.map((region: any) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subregion Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="subRegion" className="text-sm font-semibold text-gray-700 mb-1">
            Subregion<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="subRegion"
            name="subRegion"
            value={formData.subRegion}
            onChange={handleChange}
            disabled={!formData.region}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled hidden>Select Subregion</option>
            {filteredSubregions.map((sub: any) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-1">
            Phone<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">
            Email<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-1">
            Address<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </section>
  );
}
