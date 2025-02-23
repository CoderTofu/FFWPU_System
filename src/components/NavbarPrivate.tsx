/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, CircleUserRound } from "lucide-react"; // Added more icons

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
    { name: "Member Information", href: "/member" },
    { name: "Worship Event", href: "/worship" },
    { name: "Blessings Management", href: "/blessing" },
    { name: "Donations", href: "/donation" },
    { name: "Reporting", href: "/reporting" },
    { name: "CMS", href: "/cms" },
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

        <div className="flex flex-col justify-center items-center">
          <CircleUserRound className="w-28 h-28" />
          <h3 className="mt-1 text-xl font-light italic text-center">
            Welcome, <br />
            Admin!
          </h3>
        </div>

        {navItems.map((item, index) => (
          <a
            key={item.name}
            className="flex items-center hover:bg-blue-700 p-2 rounded-md transition-all duration-200 hover:translate-x-2 text-base"
            href={item.href}
            onClick={() => setIsSidebarOpen(false)}
          >
            {item.name}
          </a>
        ))}

        <a
          href={"/"}
          className="mt-auto transition-all duration-200 hover:scale-110 justify-center items-center flex "
        >
          <ArrowRight className="w-12 h-12" />
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
