/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "@/components/Button";

interface FilterModalDonationProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    startDate: string;
    endDate: string;
    church: string;
    currency: string;
  };
  churches: { ID: number; Name: string }[];
  currencies: string[];
  onApply: (f: {
    startDate: string;
    endDate: string;
    church: string;
    currency: string;
  }) => void;
  onReset: () => void;
}

export default function FilterModalDonation({
  isOpen,
  onClose,
  filters,
  churches,
  currencies,
  onApply,
  onReset,
}: FilterModalDonationProps) {
  const [local, setLocal] = useState(filters);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset local state when opened
  useEffect(() => {
    if (isOpen) setLocal(filters);
  }, [isOpen, filters]);

  // Click-outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (key: keyof typeof local, val: string) => {
    setLocal((prev) => ({ ...prev, [key]: val }));
  };

  const apply = () => {
    onApply(local);
    onClose();
  };
  const reset = () => {
    onReset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-auto animate-in fade-in zoom-in duration-200"
      >
        {/* HEADER */}
        <div className="bg-[#1C5CA8] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h2 className="text-lg font-semibold">Donation Filters</h2>
          <button onClick={onClose} className="text-2xl leading-none">&times;</button>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 space-y-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="mt-1 w-full border-2 border-[#01438F] rounded-md p-2"
              value={local.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </div>
          {/* End Date */}
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              className="mt-1 w-full border-2 border-[#01438F] rounded-md p-2"
              value={local.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>
          {/* Church */}
          <div>
            <label className="block text-sm font-medium">Church</label>
            <select
              className="mt-1 w-full border-2 border-[#01438F] rounded-md p-2"
              value={local.church}
              onChange={(e) => handleChange("church", e.target.value)}
            >
              <option value="">All</option>
              {churches.map((c) => (
                <option key={c.ID} value={c.Name}>
                  {c.Name}
                </option>
              ))}
            </select>
          </div>
          {/* Currency */}
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select
              className="mt-1 w-full border-2 border-[#01438F] rounded-md p-2"
              value={local.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            >
              <option value="">All</option>
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between px-6 py-4 border-t">
          <Button type="outline" onClick={reset}>
            Reset
          </Button>
          <Button type="primary" onClick={apply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
