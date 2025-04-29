"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
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
  onSubmit,
  title,
  fields,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[e.target.name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = () => {
    let newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-[500px]">
        {/* Modal Header */}
        <div className="bg-[#1C5CA8] flex justify-between items-center p-4">
          <h2 className="text-white text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {fields.map((field) => (
            <div key={field.name} className="mb-5">
              <label className="block text-gray-700 mb-1 font-semibold">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors[field.name]
                    ? 'border-red-500 focus:ring-red-300'
                    : 'border-[#1C5CA8] focus:ring-[#1C5CA8]'
                }`}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-4 bg-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white text-[#1C5CA8] border border-[#1C5CA8] font-semibold hover:bg-[#f1f5f9]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#1C5CA8] text-white font-semibold hover:bg-[#174c92]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
