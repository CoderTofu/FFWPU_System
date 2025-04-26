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
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Contacts", href: "/contacts", icon: Phone },
    { name: "Admin", href: "/login", icon: Shield },
  ];

  return (
    <div className="bg-[#01438F] text-white p-4 px-[100px] min-h-[100px] flex justify-between items-center">
      {/* Logo */}
      <div className="flex gap-4 items-center">
        <a href={"/"}>
          <img
            src="/icons/ffwpu_icon.svg"
            className="h-full w-auto"
            alt="Site Icon"
          />
        </a>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-12 font-bold">
        {navItems.map((item) => (
          <a
            key={item.name}
            className="hover:opacity-70 transition-all duration-200 hover:text-yellow-400"
            href={item.href}
          >
            {item.name}
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
        } bg-[#01438F] shadow-xl p-6 flex flex-col gap-6 text-lg transition-all duration-300 border-yellow-400 border-l-8`}
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

        {navItems.map((item, index) => (
          <a
            key={item.name}
            className="flex items-center gap-4 hover:bg-blue-700 p-2 rounded-md transition-all duration-200 hover:translate-x-2"
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
          >
            <item.icon className="w-6 h-6" />
            {item.name}
          </a>
        ))}

        <div className="mt-auto">
          <p className="text-sm text-gray-300">
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
