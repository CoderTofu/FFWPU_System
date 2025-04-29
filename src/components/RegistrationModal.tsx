"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import MemberListModal from '@/components/MemberListModal';
import { useAlert } from '@/components/context/AlertContext';

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
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [invitedByName, setInvitedByName] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({});
      setErrors({});
      setInvitedByName(null);
    }
  }, [isOpen]);

  // Fetch full name if invitedBy ID is already filled manually
  useEffect(() => {
    const fetchMemberName = async () => {
      if (formData.invitedBy) {
        try {
          const res = await fetch(`/api/members/${formData.invitedBy}`, { method: 'GET' });
          if (res.ok) {
            const data = await res.json();
            setInvitedByName(data['Full Name'] || 'Unknown Member');
          } else {
            setInvitedByName(null);
          }
        } catch (error) {
          setInvitedByName(null);
        }
      }
    };

    fetchMemberName();
  }, [formData.invitedBy]);

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

  const handleSelectMember = (member: any) => {
    if (member && member.ID) {
      setFormData((prev) => ({ ...prev, invitedBy: String(member.ID) }));
      setInvitedByName(member['Full Name']);
      setIsMemberListOpen(false);
    }
  };

  const handleClearInvitedBy = () => {
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData.invitedBy;
      return newData;
    });
    setInvitedByName(null);
  };

  if (!isOpen) return null;

  return (
    <>
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
          <div className="p-6 space-y-5">
            {fields.map((field) => {
              if (field.name === 'invitedBy') {
                return (
                  <div key={field.name}>
                    <label className="block text-gray-700 mb-1 font-semibold">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="invitedBy"
                        value={invitedByName || ''}
                        placeholder="Select Member"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors[field.name]
                            ? 'border-red-500 focus:ring-red-300'
                            : 'border-[#1C5CA8] focus:ring-[#1C5CA8]'
                        }`}
                        readOnly
                        onClick={() => setIsMemberListOpen(true)}
                      />
                      {invitedByName && (
                        <button
                          onClick={handleClearInvitedBy}
                          className="px-3 py-1 rounded-md bg-red-500 text-white text-xs hover:bg-red-600"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                );
              }

              return (
                <div key={field.name}>
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
              );
            })}
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

      {/* Member Selection Modal */}
      {isMemberListOpen && (
        <MemberListModal
          isOpen={isMemberListOpen}
          onClose={() => setIsMemberListOpen(false)}
          memberIds={[]}
          setMemberIds={handleSelectMember}
          forUnique={false}
        />
      )}
    </>
  );
};

export default RegistrationModal;
