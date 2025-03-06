"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, string>) => void;
  title: string;
  fields: Field[];
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  title,
  fields,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#D9D9D9] bg-opacity-50">
      <div className="bg-[#e0e0e0] border-4 border-[#FCC346] p-6 rounded-lg shadow-lg w-[450px] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-[#01438F] text-white rounded-full p-2"
        >
          <X size={16} strokeWidth={3} />
        </button>
        <h2 className="text-lg font-semibold my-5 text-center">{title}</h2>

        {fields.map((field) => (
          <div key={field.name} className="mx-5">
            <label className="block text-sm mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              className="w-full mb-3 px-3 py-2 border-2 border-[#01438F] rounded-md"
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="flex justify-center font-semibold mt-5 mb-3 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#01438F] text-[#FCC346] rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#01438F] text-[#FCC346] rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
