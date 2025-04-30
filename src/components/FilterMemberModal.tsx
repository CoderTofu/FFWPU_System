'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    region: string;
    generation: string;
    nation: string;
    age: string;
    maritalStatus: string;
    membershipCategory: string;
    gender: string;
  };
  onApply: (filters: any) => void;
  onReset: () => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters); // reset when opened
    }
  }, [isOpen, filters]);

  const handleInputChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 overflow-scroll"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-4 overflow-auto rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b border-[#cbcbcb] text-white relative">
          <h2 id="modal-title" className="text-xl font-semibold text-center">
            Member Filters
          </h2>

          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-100 hover:scale-110 hover:rotate-6 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 mt-4 space-y-4">
          {/* Region */}
          <div>
            <label className="font-medium text-sm">Region</label>
            <input
              type="text"
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={localFilters.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              placeholder="Enter Region"
            />
          </div>
          {/* Gender */}
          <div>
            <label className="font-medium text-sm">Gender</label>
            <select
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={localFilters.gender}
              onChange={(e) => {
                handleInputChange('gender', e.target.value);
              }}
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Membership Category */}
          <div>
            <label className="font-medium text-sm">Membership Category</label>
            <select
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={localFilters.membershipCategory}
              onChange={(e) => {
                handleInputChange('membershipCategory', e.target.value);
              }}
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              <option value="Regular">Regular</option>
              <option value="Associate">Associate</option>
              <option value="Registered">Registered</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Membership Category */}
          <div>
            <label className="font-medium text-sm">Generation</label>
            <select
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={localFilters.generation}
              onChange={(e) => handleInputChange('generation', e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="1st Generation">1st Generation</option>
              <option value="2nd Generation">2nd Generation</option>
              <option value="3rd Generation">3rd Generation</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="font-medium text-sm">Age {'(<)'}</label>
            <input
              type="number"
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={localFilters.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="Enter Age"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="font-medium text-sm">Marital Status</label>
            <select
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={localFilters.maritalStatus}
              onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6 px-6">
          <Button type="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
