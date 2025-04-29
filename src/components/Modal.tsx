"use client";

import { X } from "lucide-react";
import { Button } from '@/components/ui/button'; // (optional) or you can replace this too

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  message = 'Are you sure you want to delete the data?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-[400px]">
        {/* Modal Header */}
        <div className="bg-[#1C5CA8] flex justify-between items-center px-6 py-4">
          <h2 className="text-white text-lg font-bold">Confirmation</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-8 text-center">
          <p className="text-gray-700 text-base">{message}</p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between gap-4 px-6 pb-6">
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-[#1C5CA8] text-white font-semibold hover:bg-[#174c92]"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-white text-[#1C5CA8] border border-[#1C5CA8] font-semibold hover:bg-gray-100"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
