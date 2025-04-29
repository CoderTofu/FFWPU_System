'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ListTable from '@/components/ListTable';

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
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  churches: Church[];
  memberParam: Member | null;
}

export default function AddDonationModal({
  isOpen,
  onClose,
  onSubmit,
  churches,
  memberParam,
}: AddDonationModalProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isOpen) {
      setSelectedMember(memberParam);
      setSelectedChurch(null);
      setSelectedCurrency(null);
      setDate('');
      setAmount('');
      setErrors({});
    }
  }, [isOpen]);

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedChurch) newErrors.church = 'Church is required.';
    if (!selectedCurrency) newErrors.currency = 'Currency is required.';
    if (!date) newErrors.date = 'Date is required.';
    if (!amount) newErrors.amount = 'Amount is required.';

    setErrors(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      member: memberParam.ID,
      church: selectedChurch.ID,
      currency: selectedCurrency,
      date,
      amount,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#D9D9D9] bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#01438F] text-white rounded-full p-2"
        >
          <X size={16} strokeWidth={3} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Add Donation</h2>

        <div className="mb-4">
          <label className="font-medium text-sm">Select Church</label>
          <select
            className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
            onChange={(e) => {
              const church = churches.find((c) => c.ID === parseInt(e.target.value));
              setSelectedChurch(church || null);
            }}
            value={selectedChurch?.ID || ''}
          >
            <option value="">Select Church</option>
            {churches.map((church) => (
              <option key={church.ID} value={church.ID}>
                {church.Name} ({church.Country})
              </option>
            ))}
          </select>
          {errors.church && <p className="text-red-500 text-xs">{errors.church}</p>}
        </div>

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

        <div className="mb-4">
          <label className="font-medium text-sm">Amount</label>
          <input
            type="number"
            className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
        </div>

        <div className="mb-4">
          <label className="font-medium text-sm">Currency</label>
          <select
            className="w-full border-2 border-[#01438F] rounded-md p-2 mt-2"
            onChange={(e) => setSelectedCurrency(e.target.value)}
            value={selectedCurrency || ''}
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

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F]"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
