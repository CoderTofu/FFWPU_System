"use client"
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function DisplayMember() {
  const [blessings, setBlessings] = useState([
    { name: "Marriage", date: "01/31/2025" },
    { name: "Baptism", date: "08/19/1999" },
  ]);

    return (<div className="p-8 bg-[#D9D9D9] min-h-screen">
    {/*Banner */}
    <div className="bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
        MEMBER PROFILE
      </p>
    </div>

    <div className="p-8 w-full">
    {/*Section for Member Profile Pic*/}
    <section className="pb-4">
    {/*Div for both name and pic */}
    <div className="flex flex-row gap-10">
      {/*Div for profile pic */}
      <div>
      <label className="w-32 h-32 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
        <FaUserCircle className="text-black text-6xl w-32 h-32" />
      </label>
      </div>
      {/*Div for name */}
      <div className="text-3xl flex items-center justify-center">
        Precious Nicole P. Balba
      </div>
    </div>
    </section>

    {/*Section for Personal Information*/}
    <section className="w-full">
      <p className="text-lg text-[#BE9231] font-[700] mt-5 mb-5">PERSONAL INFORMATION</p>
      {/*Div for Personal Info Form*/}
      <div className="flex flex-col w-full">

        {/* Div for 1st Row */}
        <div className="flex flex-col md:flex-row w-full gap-5 mt-5 mb-5">
          {/* Gender */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Gender</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/* Date of Birth */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Date of Birth</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/* Age */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Age</label>
            <input 
              type="number"
              min={0}
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>
        </div>

        {/* Div for 2nd Row */}
        <div className="flex flex-col md:flex-row w-full gap-5 mt-5 mb-5">
          {/* Nation */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Nation</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/* Marital Status */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Marital Status</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/* Name of Spouse */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Name of Spouse</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>
        </div>

        {/* Div for 3rd Row */}
        <div className="flex flex-col md:flex-row w-full gap-5 mt-5 mb-5">
          {/* Phone */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Phone</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/* Email */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Email</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/* Address */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row gap-2">
            <label className="md:w-1/3">Address</label>
            <textarea 
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-40 text-base px-3 py-3 resize-none" />
          </div>
        </div>

      </div>
    </section>

    {/*Section for Spiritual Information*/}
    <section>
      <p className="text-lg text-[#BE9231] font-[700] mt-10 mb-10">SPIRITUAL INFORMATION</p>
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full gap-5">

          {/*Generation*/}
          <div className="w-full md:w-1/3 flex flex-row gap-2">
            <label className=" md:w-1/3 w-full">Generation</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/*Spiritual Birthday*/}
          <div className="w-full md:w-1/3 flex flex-row gap-2">
            <label className=" md:w-1/3 w-full">Spiritual Birthday</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>

          {/*Membership Category*/}
          <div className="w-full md:w-1/3 flex flex-row gap-2">
            <label className=" md:w-1/3 w-full">Membership Category</label>
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-5 mt-5 mb-5">

        {/*Spiritual Parent*/}
        <div className="w-full md:w-1/3 flex flex-row gap-2">
          <label className=" md:w-1/3 w-full">Spiritual Parent</label>
          <div className="w-full md:max-w-60">
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
            <input 
              type="text"
              className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3 mt-5"/>
          </div>
        </div>

      </div>

    </section>


    {/*Section for Mission History*/}
    <section>
      <p className="text-lg text-[#BE9231] font-[700] mt-10 mb-10">MISSION HISTORY</p>

      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full md:w-11/12 gap-5">
          
          {/* Mission Title/Role */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
              <label className="w-full">Mission Title/Role</label>
              <input 
                type="text"
                className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
            </div>
          </div>

          {/* Organization */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
              <label className="w-full">Organization</label>
              <input 
                type="text"
                className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
            </div>
          </div>

          {/* Country */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
              <label className="w-full">Country</label>
              <input 
                type="text"
                className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
            </div>
          </div>

          {/* Date */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
              <label className="w-full">Date</label>
              <input 
                type="text"
                className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3" />
            </div>
          </div>

        </div>
      </div>
    </section>

    {/*Section for List of Blessings*/}
    <section>
      <p className="text-lg text-[#BE9231] font-[700] mt-10 mb-10">LIST OF BLESSINGS</p>

      <div className="flex flex-col w-full">
        {/* Desktop Labels (Only on first row in large screens) */}
        <div className="hidden md:flex flex-row w-full md:w-11/12 gap-5">
          <div className="w-1/4">
            <label className="">Name of Blessing/s</label>
          </div>
          <div className="w-1/4">
            <label className="">Date</label>
          </div>
        </div>
        
        {blessings.map((blessing, index) => (
          <div key={index} className="flex flex-col md:flex-row w-full md:w-11/12 gap-5 mt-5">
            
            {/* Name of Blessing/s */}
            <div className="w-full md:w-1/4">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
                {/* Show label only in mobile view */}
                <label className="w-full block md:hidden">Name of Blessing/s</label>
                <input
                  type="text"
                  defaultValue={blessing.name}
                  className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3"
                />
              </div>
            </div>

            {/* Date */}
            <div className="w-full md:w-1/4">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-2">
                {/* Show label only in mobile view */}
                <label className="w-full block md:hidden">Date</label>
                <input
                  type="text"
                  defaultValue={blessing.date}
                  className="border-[#01438F] border rounded-[5px] w-full md:max-w-60 h-8 text-base px-3"
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>

    </div>


    </div>);
}