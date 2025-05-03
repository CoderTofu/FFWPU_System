'use client';

import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { useAlert } from '@/components/context/AlertContext.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function AddRegionModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [regionName, setRegionName] = useState('');
  const queryClient = useQueryClient();
  const handleAddRegion = async () => {
    // Add logic to handle adding a region
    console.log('Adding region:', regionName);
    const res = await fetch('/api/cms/region', {
      method: 'POST',
      body: JSON.stringify({ name: regionName }),
    });
    if (res.ok) {
      showAlert({
        type: 'success',
        title: 'Region added successfully.',
      });
      queryClient.refetchQueries(['regions']);
      onClose();
    } else {
      alert('An error occurred: ' + res.statusText);
    }
    // Reset the input
    setRegionName('');
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-1000"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 overflow-auto rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b border-[#cbcbcb] text-white">
          <h2 id="modal-title" className="text-xl font-semibold">
            Add Region
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-900 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4">
          <p className="text-[#000000] font-light text-sm mb-4">
            Enter the name of the new region you want to add.
          </p>
          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <label htmlFor="region-name" className="text-right font-bold">
              Region Name
            </label>
            <input
              id="region-name"
              type="text"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
              placeholder="e.g. Metro Manila"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <div>
              <Button type="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                className="mr-2"
                onClick={handleAddRegion}
                disabled={!regionName.trim()}
              >
                Add Region
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteRegionModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [regions, setRegions] = useState([]);
  const [regionToDelete, setRegionToDelete] = useState('');

  // Fetch regions when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const fetchRegions = async () => {
      try {
        const res = await fetch('/api/cms/region', { method: 'GET' });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setRegions(data);
      } catch (err) {
        showAlert({ type: 'error', title: `Failed to load regions: ${err.message}` });
      }
    };
    fetchRegions();
  }, [isOpen, showAlert]);

  const handleDeleteRegion = async () => {
    if (!regionToDelete) {
      showAlert({ type: 'error', title: 'Please select a region to delete.' });
      return;
    }
    try {
      const res = await fetch(`/api/cms/region/${regionToDelete}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error(res.statusText);
      showAlert({ type: 'success', title: 'Region deleted successfully.' });
      queryClient.refetchQueries(['regions']);
      setRegionToDelete('');
      onClose();
    } catch (err) {
      showAlert({ type: 'error', title: `Failed to delete region: ${err.message}` });
    }
  };

  // Handle ESC and focus
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && isOpen && onClose();
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 overflow-auto rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b border-[#cbcbcb] text-white">
          <h2 id="delete-modal-title" className="text-xl font-semibold">
            Delete Region
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-900 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4">
          <p className="text-[#000000] font-light text-sm mb-4">
            Select the region you want to delete.
          </p>
          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <label htmlFor="region-delete" className="font-bold">
              Region
            </label>
            <select
              id="region-delete"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={regionToDelete}
              onChange={(e) => setRegionToDelete(e.target.value)}
            >
              <option value="">-- Select a Region --</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2">
            <div>
              <Button type="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type="primary" onClick={handleDeleteRegion} disabled={!regionToDelete}>
                Delete Region
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddSubregionModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [selectedRegion, setSelectedRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');
  const [regions, setRegions] = useState([]);

  const regionQuery = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const res = await fetch('/api/cms/region', { method: 'GET' });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  const subregionMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/cms/subregion', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to fetch');
    },
    onSuccess: (data) => {
      showAlert({
        type: 'success',
        title: 'Subregion added successfully.',
      });
      queryClient.refetchQueries(['subregions']);
      onClose();
    },
    onError: (data) => {
      alert('Error while adding');
    },
  });
  const handleAddSubregion = () => {
    // Add logic to handle adding a subregion
    console.log('Adding subregion:', subRegion, 'to region:', selectedRegion);
    subregionMutation.mutate({ region: selectedRegion, name: subRegion });
    // Reset the inputs
    setSelectedRegion('');
    setSubRegion('');
  };

  useEffect(() => {
    if (regionQuery.status === 'success') {
      setRegions(regionQuery.data);
    } else if (regionQuery.status === 'error') {
      alert('An error occurred while fetching data');
    }
  }, [regionQuery.data, regionQuery.status]);

  // Handle ESC and scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-subregion-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 overflow-auto rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b border-[#cbcbcb] text-white">
          <h2 id="add-subregion-title" className="text-xl font-semibold">
            Add Subregion
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-900 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4">
          <p className="text-[#000000] font-light text-sm mb-4">
            Select the parent region and enter the name of the new subregion.
          </p>
          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <label htmlFor="parent-region" className="font-bold">
              Region
            </label>
            <select
              id="parent-region"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">-- Select a Region --</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <label htmlFor="subregion-name" className="font-bold">
              Subregion Name
            </label>
            <input
              id="subregion-name"
              type="text"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={subRegion}
              onChange={(e) => setSubRegion(e.target.value)}
              placeholder="e.g. Quezon City"
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2">
            <div>
              <Button type="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type="primary" onClick={handleAddSubregion} disabled={!subRegion.trim()}>
                Add Subregion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteSubregionModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [selectedSubregion, setSelectedSubregion] = useState('');

  const [selectedRegion, setSelectedRegion] = useState<keyof typeof regionsData | ''>('');
  const [subregions, setSubregions] = useState<string[]>([]);

  const regionsData: { [key: string]: { name: string; subregions: string[] } } = {
    '1': {
      name: 'North America',
      subregions: ['California', 'New York', 'Texas'],
    },
    '2': { name: 'Europe', subregions: ['Paris', 'London', 'Berlin'] },
    '3': { name: 'Asia', subregions: ['Tokyo', 'Shanghai', 'Mumbai'] },
  };

  useEffect(() => {
    if (selectedRegion) {
      setSubregions(selectedRegion ? regionsData[selectedRegion].subregions : []);
      setSelectedSubregion('');
    }
  }, [selectedRegion]);

  const handleDeleteSubregion = () => {
    // Add logic to handle deleting a subregion
    console.log(
      'Deleting subregion:',
      selectedSubregion,
      'from region:',
      regionsData[selectedRegion]?.name
    );
    // Reset the selections
    setSelectedRegion('');
    setSelectedSubregion('');
  };

  // Handle ESC and scroll lock
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-subregion-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 overflow-auto rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b border-[#cbcbcb] text-white">
          <h2 id="delete-subregion-title" className="text-xl font-semibold">
            Delete Subregion
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-900 rounded-full p-1 text-3xl cursor-pointer transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4">
          <p className="font-light text-sm mb-4">
            Select the region and subregion you want to delete.
          </p>

          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <label htmlFor="region-select" className="font-bold">
              Region
            </label>
            <select
              id="region-select"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedSubregion('');
              }}
            >
              <option value="">-- Select a Region --</option>
              {regionsData.data?.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4 mb-6">
            <label htmlFor="subregion-select" className="font-bold">
              Subregion
            </label>
            <select
              id="subregion-select"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={selectedSubregion}
              onChange={(e) => setSelectedSubregion(e.target.value)}
              disabled={!selectedRegion}
            >
              <option value="">-- Select a Subregion --</option>
              {subregions.map((subregion) => (
                <option key={subregion} value={subregion}>
                  {subregion}
                </option>
              ))}
            </select>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-2">
            <div>
              <Button type="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type="primary" onClick={handleDeleteSubregion} disabled={!selectedSubregion}>
                Delete Subregion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddChurchModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [churchName, setChurchName] = useState('');
  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [region, setRegion] = useState('');
  const [subregion, setSubregion] = useState('');
  const [country, setCountry] = useState('');

  // Queries retain original logic
  const regionQuery = useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const res = await fetch('/api/cms/region', { method: 'GET' });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
  });
  const subregionQuery = useQuery({
    queryKey: ['subregions'],
    queryFn: async () => {
      const res = await fetch('/api/cms/subregion', { method: 'GET' });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
  });

  // Sync state with queries
  useEffect(() => {
    if (regionQuery.status === 'success') {
      setRegions(regionQuery.data);
    } else if (regionQuery.status === 'error') {
      showAlert({ type: 'error', title: regionQuery.error.message });
    }
  }, [regionQuery.data, regionQuery.status, showAlert]);

  useEffect(() => {
    if (subregionQuery.status === 'success') {
      setSubregions(subregionQuery.data);
    } else if (subregionQuery.status === 'error') {
      showAlert({ type: 'error', title: subregionQuery.error.message });
    }
  }, [subregionQuery.data, subregionQuery.status, showAlert]);

  // Compute filtered subregions based on selected region
  const filteredSubregions = subregions.filter((s) => s.region?.toString() === region);

  const addMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/church', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: churchName, region, subregion, country }),
      });
      if (!res.ok) throw new Error(res.statusText);
    },
    onSuccess: () => {
      showAlert({ type: 'success', title: 'Church added successfully.' });
      queryClient.invalidateQueries(['churches']);
      // Reset
      setChurchName('');
      setRegion('');
      setSubregion('');
      setCountry('');
      onClose();
    },
    onError: (err) => {
      showAlert({ type: 'error', title: `Error: ${err.message}` });
    },
  });

  const handleAddChurch = () => {
    if (!churchName.trim()) {
      showAlert({ type: 'error', title: 'Church name is required.' });
      return;
    }
    if (!region) {
      showAlert({ type: 'error', title: 'Region is required.' });
      return;
    }
    if (!subregion) {
      showAlert({ type: 'error', title: 'Subregion is required.' });
      return;
    }
    if (!country.trim()) {
      showAlert({ type: 'error', title: 'Country is required.' });
      return;
    }
    addMutation.mutate();
  };

  // ESC & scroll lock
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && isOpen && onClose();
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    document.addEventListener('keydown', onEsc);
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-church-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 rounded-lg shadow-lg max-w-md w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-[#1C5CA8] py-4 px-6 border-b text-white">
          <h2 id="add-church-title" className="text-lg font-semibold">
            Add Church
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-white hover:text-gray-200 p-1 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="px-6 mt-4 space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="churchName" className="col-span-1 font-bold">
              Church Name
            </label>
            <input
              id="churchName"
              type="text"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="region" className="font-bold">
              Region
            </label>
            <select
              id="region"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setSubregion('');
              }}
            >
              <option value="">-- Select Region --</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="subregion" className="font-bold">
              Subregion
            </label>
            <select
              id="subregion"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={subregion}
              onChange={(e) => setSubregion(e.target.value)}
              disabled={!region}
            >
              <option value="">-- Select Subregion --</option>
              {filteredSubregions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="country" className="font-bold">
              Country
            </label>
            <input
              id="country"
              type="text"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className="px-6 mt-6 flex justify-end space-x-4">
          <Button type="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleAddChurch}
            disabled={!churchName || !region || !subregion || !country}
          >
            Add Church
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DeleteChurchModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [churchToDelete, setChurchToDelete] = useState('');
  const [churches, setChurches] = useState([]);

  const churchQuery = useQuery({
    queryKey: ['churches'],
    queryFn: async () => {
      const res = await fetch('/api/church', { method: 'GET' });
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    },
    enabled: isOpen,
  });

  useEffect(() => {
    if (churchQuery.status === 'success') {
      setChurches(churchQuery.data);
    } else if (churchQuery.status === 'error') {
      showAlert({ type: 'error', title: churchQuery.error.message });
    }
  }, [churchQuery.status, churchQuery.data, showAlert]);

  useEffect(() => {
    console.log('Churches:', churches);
  }, [churches]);

  const handleDeleteChurch = async () => {
    if (!churchToDelete) {
      showAlert({ type: 'error', title: 'Please select a church to delete.' });
      return;
    }
    try {
      const res = await fetch(`/api/church/${churchToDelete}/`, { method: 'DELETE' });
      if (!res.ok) throw new Error(res.statusText);
      queryClient.invalidateQueries(['churches']);
      showAlert({ type: 'success', title: 'Church deleted successfully.' });
      setChurchToDelete('');
      onClose();
    } catch (err) {
      showAlert({ type: 'error', title: `Error: ${err.message}` });
    }
  };

  // Handle ESC and disable scroll
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && isOpen && onClose();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', onEsc);
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-church-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 rounded-lg shadow-lg max-w-md w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full bg-[#1C5CA8] py-4 px-6 border-b text-white">
          <h2 id="delete-church-title" className="text-lg font-semibold">
            Delete Church
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-white hover:text-gray-200 p-1 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="px-6 mt-4 space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="deleteChurch" className="font-bold">
              Church
            </label>
            <select
              id="deleteChurch"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={churchToDelete}
              onChange={(e) => setChurchToDelete(e.target.value)}
            >
              <option value="">-- Select Church --</option>
              {churches.map((c) => (
                <option key={c.ID} value={c.ID}>
                  {c.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleDeleteChurch} disabled={!churchToDelete}>
              Delete Church
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChangePasswordModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showAlert({ type: 'error', title: 'All fields are required.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert({ type: 'error', title: 'New passwords do not match.' });
      return;
    }
    try {
      const res = await fetch('/api/cms/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) throw new Error(res.statusText);
      showAlert({ type: 'success', title: 'Password changed successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err) {
      showAlert({ type: 'error', title: `Error: ${err.message}` });
    }
  };

  // ESC & scroll lock
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && isOpen && onClose();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', onEsc);
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 rounded-lg shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b text-white">
          <h2 id="change-password-title" className="text-xl font-semibold">
            Change Password
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-200 p-1 text-3xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4 space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="current-password" className="font-bold">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="new-password" className="font-bold">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="confirm-password" className="font-bold">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 mt-6 flex justify-end space-x-4">
          <Button type="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleChangePassword}
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}

// Add New Admin Modal
export function AddNewAdminModal({ isOpen, onClose }) {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAddAdmin = async () => {
    if (!adminName || !adminEmail || !adminPassword) {
      showAlert({ type: 'error', title: 'All fields are required.' });
      return;
    }
    if (adminPassword !== confirmPassword) {
      showAlert({ type: 'error', title: 'Passwords do not match.' });
      return;
    }
    try {
      const res = await fetch('/api/cms/add-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminName, email: adminEmail, password: adminPassword }),
      });
      if (!res.ok) throw new Error(res.statusText);
      showAlert({ type: 'success', title: 'New admin created successfully.' });
      setAdminName('');
      setAdminEmail('');
      setAdminPassword('');
      setConfirmPassword('');
      onClose();
    } catch (err) {
      showAlert({ type: 'error', title: `Error: ${err.message}` });
    }
  };

  // ESC & scroll lock
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && isOpen && onClose();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.addEventListener('keydown', onEsc);
    if (isOpen && closeButtonRef.current) closeButtonRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-admin-title"
    >
      <div
        ref={modalRef}
        className="bg-white pb-6 rounded-lg overflow-hidden shadow-lg max-w-lg w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="w-full bg-[#1C5CA8] py-[20px] px-[30px] border-b text-white">
          <h2 id="add-admin-title" className="text-xl font-semibold">
            Add New Admin
          </h2>
        </div>

        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-100 hover:text-gray-200 p-1 text-3xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* BODY */}
        <div className="px-6 mt-4 space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="admin-name" className="font-bold">
              Username
            </label>
            <input
              id="admin-name"
              type="text"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="admin-email" className="font-bold">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="admin-password" className="font-bold">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="confirm-password" className="font-bold">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="col-span-3 border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 mt-6 flex justify-end space-x-4">
          <Button type="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleAddAdmin}
            disabled={
              !adminName || !adminEmail || !adminPassword || adminPassword !== confirmPassword
            }
          >
            Add Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
