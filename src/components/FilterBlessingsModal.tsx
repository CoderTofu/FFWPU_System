'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/Button';

export interface BlessingsFilter {
  year: string;
  orientation: 'vertical' | 'horizontal';
}

interface FilterBlessingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters?: BlessingsFilter; // made optional, will fallback to defaults
  onApply: (filters: BlessingsFilter) => void;
  onReset: () => void;
  /** List of available years for filtering */
  availableYears: string[];
}

export default function FilterBlessingsModal({
  isOpen,
  onClose,
  filters,
  onApply,
  onReset,
  availableYears,
}: FilterBlessingsModalProps) {
  const defaultFilters: BlessingsFilter = { year: '', orientation: 'vertical' };
  const [local, setLocal] = useState<BlessingsFilter>(filters ?? defaultFilters);
  const modalRef = useRef<HTMLDivElement>(null);

  // sync local state when modal opens or filters change
  useEffect(() => {
    if (isOpen) {
      setLocal(filters ?? defaultFilters);
    }
  }, [isOpen, filters]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (key: keyof BlessingsFilter, value: string) => {
    setLocal((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const handleReset = () => {
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
          <h2 className="text-lg font-semibold">Blessings Filters</h2>
          <button onClick={onClose} className="text-2xl leading-none">
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 space-y-4">
          {/* Year Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              value={local.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="mt-1 w-full border-2 border-[#01438F] rounded-md p-2 text-sm"
            >
              <option value="">All Years</option>
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Orientation Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Chaenbo Orientation</label>
            <select
              value={local.orientation}
              onChange={(e) => handleChange('orientation', e.target.value)}
              className="mt-1 w-full border-2 border-[#01438F] rounded-md p-2 text-sm"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-between px-6 py-4 border-t">
          <Button type="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
