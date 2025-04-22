"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import {
  AddRegionModal,
  DeleteRegionModal,
  AddSubregionModal,
  DeleteSubregionModal,
  ChangePasswordModal,
  AddNewAdminModal,
  AddChurchModal,
  DeleteChurchModal,
} from "@/components/CMSModals";

export default function CMS() {
  const [siteName, setSiteName] = useState("");

  const handleSiteNameChange = () => {
    // Add logic to update site name
    console.log("Updating site name to:", siteName);
  };

  return (
    <main>
      {/* Icon and Site Name Section*/}
      <section className="mx-4 sm:mx-16 pb-10 pt-20 flex flex-col md:flex-row justify-center gap-20 items-center border-b-2 border-[#01438F]">
        {/* Icon Part */}
        <div className="relative">
          <img
            src="/images/temp_icon.png"
            className="w-[250px]"
            alt="Site Icon"
          />
          <div className="absolute bottom-0 right-0 p-2 rounded-full hover:bg-gray-50 hover:bg-opacity-50 transition-all duration-500">
            <label htmlFor="icon_upload" style={{ cursor: "pointer" }}>
              <Camera className="w-[50px] h-[50px]" />
            </label>
            <input
              id="icon_upload"
              type="file"
              accept=".svg,.png,.jpg,.jpeg"
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Site Name Part */}
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-6 items-center justify-center">
          <label
            htmlFor="site_name_change"
            className="md:w-[140px] font-bold text-base"
          >
            Site Name:
          </label>
          <input
            type="text"
            id="site_name_change"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter new site name..."
            className="w-full border-2 border-black rounded-sm px-1 py-1"
          />
          <button
            className="px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg"
            onClick={handleSiteNameChange}
          >
            Edit
          </button>
        </div>
      </section>

      {/* Other changes */}
      <section className="py-10 flex gap-8 justify-center flex-wrap">
        {/* Region Change */}
        <div className="w-[350px] h-[200px] rounded-xl flex flex-col justify-center bg-white py-4 shadow-[0px_0px_6.584px_0px_rgba(0,0,0,0.25)]">
          <div className="flex mb-5 gap-4 justify-center">
            <img
              src="/icons/location_icon.svg"
              className="w-8"
              alt="location icon"
            />
            <div>
              <h2 className="font-bold text-lg">ADD & DELETE REGION</h2>
              <p className="text-[#B7B7B7] font-light text-sm">
                Edit regions here
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center px-8">
            <AddRegionModal />
            <DeleteRegionModal />
          </div>
        </div>

        {/* Subregion Change */}
        <div className="w-[350px] h-[200px] rounded-xl flex flex-col justify-center bg-white py-4 shadow-[0px_0px_6.584px_0px_rgba(0,0,0,0.25)]">
          <div className="flex gap-4 mb-5 justify-center">
            <img
              src="/icons/location_icon.svg"
              className="w-8"
              alt="location icon"
            />
            <div>
              <h2 className="font-bold text-lg">ADD & DELETE SUBREGION</h2>
              <p className="text-[#B7B7B7] font-light text-sm">
                Edit subregions here
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center px-8">
            <AddSubregionModal />
            <DeleteSubregionModal />
          </div>
        </div>
        <div className="w-[350px] h-[200px] rounded-xl flex flex-col justify-center bg-white py-4 shadow-[0px_0px_6.584px_0px_rgba(0,0,0,0.25)]">
          <div className="flex gap-4 mb-5 justify-center">
            <img
              src="/icons/location_icon.svg"
              className="w-8"
              alt="location icon"
            />
            <div>
              <h2 className="font-bold text-lg">ADD & DELETE CHURCH</h2>
              <p className="text-[#B7B7B7] font-light text-sm">
                Edit churches here
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center px-8">
            <AddChurchModal />
            <DeleteChurchModal />
          </div>
        </div>

        {/* Password Change */}
        <div className="w-[350px] h-[200px] rounded-xl flex flex-col justify-center bg-white py-4 shadow-[0px_0px_6.584px_0px_rgba(0,0,0,0.25)]">
          <div className="flex gap-6 mb-5 justify-center">
            <img src="/icons/lock_icon.svg" className="w-6" alt="lock icon" />
            <div>
              <h2 className="font-bold text-lg">CHANGE PASSWORD</h2>
              <p className="text-[#B7B7B7] font-light text-sm">
                Change your password here
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center px-8">
            <ChangePasswordModal />
          </div>
        </div>

        {/* New Admins */}
        <div className="w-[350px] h-[200px] rounded-xl flex flex-col justify-center bg-white py-4 shadow-[0px_0px_6.584px_0px_rgba(0,0,0,0.25)]">
          <div className="flex gap-4 mb-5 justify-center">
            <img
              src="/icons/add_acc_icon.svg"
              className="w-8"
              alt="add account icon"
            />
            <div>
              <h2 className="font-bold text-lg">ADD NEW ADMIN</h2>
              <p className="text-[#B7B7B7] font-light text-sm">
                Add a new admin here
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-center px-8">
            <AddNewAdminModal />
          </div>
        </div>
      </section>
    </main>
  );
}
