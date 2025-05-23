/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, ArrowRight, CircleUserRound } from 'lucide-react'; // Added more icons
import { useRouter } from 'next/navigation';
import { useAlert } from './context/AlertContext';
export default function NavbarPrivate() {
  const { showAlert } = useAlert();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('Administrator');
  // Prevent scrolling when sidebar is open
  const router = useRouter();
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Fetch username from the server
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await fetch('/api/username');
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        showAlert({ type: 'error', title: 'Failed to fetch username' });
      }
    };
    fetchUsername();
  }, []);

  const navItems = [
    { name: 'Members', href: '/member' },
    { name: 'Events', href: '/event' },
    { name: 'Blessings', href: '/blessings' },
    { name: 'Donations', href: '/donation' },
    { name: 'Reporting', href: '/reporting' },
    { name: 'CMS', href: '/cms' },
  ];

  const logout = async (e: MouseEvent) => {
    const response = await fetch('/api/logout', { method: 'POST' });
    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <div className="bg-[#fff] border-b-4 shadow p-4 px-[100px] min-h-[100px] flex justify-between items-center">
      {/* Logo */}
      <div className="flex gap-4 items-center">
        <a href={'/'}>
          <img src="/icons/ffwpu_icon.svg" className="h-full w-auto" alt="Site Icon" />
        </a>
        <div className="text-[#1C5CA8] averia-font italic">
          <h1 className="text-[21px] italic font-semibold">FFWPU</h1>
          <h1 className="text-[21px] italic font-semibold">PHILIPPINES</h1>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="transition-transform duration-200 ease-in-out hover:scale-110"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* Sidebar (Mobile Navigation) */}
      <div
        className={`z-50 fixed top-0 right-0 w-64 h-full ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-[#01438F] shadow-xl p-6 flex flex-col gap-6 text-lg transition-all duration-300 border-yellow-400 border-l-8 text-white`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-yellow-400">FFWPU</h2>
          <button
            className="transition-transform duration-200 ease-in-out hover:scale-110 hover:rotate-90"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col justify-center items-center">
          <CircleUserRound className="w-28 h-28" />
          <h3 className="mt-1 text-xl font-light italic text-center">
            Welcome, <br />
            {username}!
          </h3>
        </div>

        {navItems.map((item, index) => (
          <a
            key={item.name + index}
            className="flex items-center hover:bg-blue-700 p-2 rounded-md transition-all duration-200 hover:translate-x-2 text-base"
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
          >
            {item.name}
          </a>
        ))}

        <a
          // href={"/"}
          onClick={logout}
          className="mt-auto transition-all duration-200 hover:scale-110 justify-center items-center flex "
        >
          <ArrowRight className="w-12 h-12 cursor-pointer" />
        </a>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
