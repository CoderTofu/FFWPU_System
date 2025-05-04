'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAlert } from '@/components/context/AlertContext';
import Button from './Button';

interface Member {
  ID: number;
  'Full Name': string;
}

interface Church {
  ID: number;
  Name: string;
  Country: string;
}

interface AddDonationModalProps {
  mode: 'add' | 'edit';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  churches: Church[];
  selectedMember?: Member | null;
  selectedDonation?: any; // For edit mode
}

export default function AddDonationModal({
  mode,
  isOpen,
  onClose,
  onSubmit,
  churches,
  selectedMember,
  setSelectedMember,
  selectedDonation,
  setSelectedDonation,
}: AddDonationModalProps) {
  const { showAlert } = useAlert();
  const modalRef = useRef(null);

  const [church, setChurch] = useState<Church | null>(null);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && selectedDonation) {
        const churchId = churches.find((ch) => ch.ID === selectedDonation.Church?.ID);
        setChurch(selectedDonation.Church || null);
        setDate(selectedDonation.Date || '');
        setAmount(selectedDonation.Amount || '');
        setCurrency(selectedDonation.Currency || '');
      } else if (mode === 'add' && selectedMember) {
        setChurch(null);
        setDate('');
        setAmount('');
        setCurrency('');
      }
      setErrors({});
    }
  }, [isOpen, selectedMember, selectedDonation, mode]);

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!church) newErrors.church = 'Church is required.';
    if (!date) newErrors.date = 'Date is required.';
    if (!amount) newErrors.amount = 'Amount is required.';
    if (!currency) newErrors.currency = 'Currency is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showAlert({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    console.log('selected donation', selectedDonation);
    if (mode === 'add') {
      onSubmit({
        member: selectedMember?.ID,
        church: church?.ID,
        date,
        amount,
        currency,
      });
    } else if (mode === 'edit') {
      onSubmit({
        id: selectedDonation.ID,
        member: selectedDonation.Member.ID,
        church: church?.ID,
        date,
        amount,
        currency,
      });
    }
    setSelectedDonation(null);
    setSelectedMember(null);
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
            {mode === 'add' ? 'Add Donation' : 'Edit Donation'}
          </h2>

          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-100 hover:text-gray-900 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 mt-4">
          {mode === 'add' && selectedMember && (
            <div className="mb-4">
              <label className="font-medium text-sm">Member</label>
              <input
                type="text"
                disabled
                value={selectedMember['Full Name']}
                className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          {mode === 'edit' && selectedDonation && (
            <div className="mb-4">
              <label className="font-medium text-sm">Member</label>
              <input
                type="text"
                disabled
                value={selectedDonation.Member?.['Full Name'] || ''}
                className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          )}

          {/* Church */}
          <div className="mb-4">
            <label className="font-medium text-sm">Church</label>
            <select
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={church?.ID || ''}
              onChange={(e) => {
                const selected = churches.find((c) => c.ID === parseInt(e.target.value));
                setChurch(selected || null);
              }}
            >
              <option value="">Select Church</option>
              {churches.map((ch) => (
                <option key={ch.ID} value={ch.ID}>
                  {ch.Name} ({ch.Country})
                </option>
              ))}
            </select>
            {errors.church && <p className="text-red-500 text-xs">{errors.church}</p>}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="font-medium text-sm">Date</label>
            <input
              type="date"
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="font-medium text-sm">Amount</label>
            <input
              type="text"
              inputMode="decimal"
              pattern="^\d*\.?\d*$"
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                  setAmount(value);
                }
              }}
            />
            {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
          </div>

          {/* Currency */}
          <div className="mb-4">
            <label className="font-medium text-sm">Currency</label>
            <select
              className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="">Select Currency</option>
              <option value="USD">$ USD</option>
              <option value="PHP">₱ PHP</option>
              <option value="EUR">€ EUR</option>
              <option value="JPY">¥ JPY</option>
              <option value="KRW">₩ KRW</option>
              <option value="CNY">¥ CNY</option>
            </select>
            {errors.currency && <p className="text-red-500 text-xs">{errors.currency}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Button type="primary" onClick={handleSave}>
              {mode === 'add' ? 'Save' : 'Save Changes'}
            </Button>
            <Button type="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
