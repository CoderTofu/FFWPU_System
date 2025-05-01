/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home, Info, Phone, Shield } from "lucide-react"; // Added more icons

export default function NavbarPublic() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About Us', href: '#about', icon: Info },
    { name: 'Contacts', href: '#contacts', icon: Phone },
  ];

  return (
    <div className="bg-[#fff] text-black p-4 px-[100px] min-h-[90px] flex justify-between items-center shadow z-50 sticky top-0">
      {/* Logo */}
      <div className="flex gap-4 items-center">
        <a href={"/"}>
          <img
            src="/icons/ffwpu_icon.svg"
            className="h-full w-auto"
            alt="Site Icon"
          />
        </a>
        <div className="text-[#1C5CA8] averia-font italic">
          <h1 className="text-[21px] italic font-semibold">FFWPU</h1>
          <h1 className="text-[21px] italic font-semibold">PHILIPPINES</h1>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-12 instrument-font">
        {navItems.map((item) => (
          <a
            key={item.name}
            className="hover:opacity-70 transition-all duration-200 hover:text-yellow-400 font-instrument text-base font-semibold"
            href={item.href}
          >
            {item.name.toUpperCase()}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden transition-transform duration-200 ease-in-out hover:scale-110"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* Sidebar (Mobile Navigation) */}
      <div
        className={`z-50 fixed top-0 right-0 w-64 h-full ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } bg-[#fff] shadow-xl p-6 flex flex-col gap-6 text-lg transition-all duration-300 border-yellow-400 border-l-8`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-[#1C5CA8] averia-font italic">
            <h1 className="text-[21px] italic font-semibold">FFWPU</h1>
            <h1 className="text-[21px] italic font-semibold">PHILIPPINES</h1>
          </div>
          <button
            className="transition-transform duration-200 ease-in-out hover:scale-110 hover:rotate-90"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {navItems.map((item, index) => (
          <a
            key={item.name}
            className="flex items-center gap-4 hover:opacity-50 p-2 rounded-md transition-all duration-200 hover:translate-x-2"
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
          >
            <item.icon className="w-6 h-6" />
            {item.name}
          </a>
        ))}

        <div className="mt-auto">
          <p className="text-sm text-gray-500">
            © 2025 FFWPU. All rights reserved.
          </p>
        </div>
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
