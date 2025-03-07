"use client"
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface HistoryEntry {
  role: string;
  organization: string;
  country: string;
  startDate: string;
  endDate: string;
}

export default function EditMember() {
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    age: "",
    birthdate: "",
    gender: "",
    region: "",
    subRegion: "",
    maritalStatus: "",
    nation: "",
    spouseName: "",
    phone: "",
    email: "",
    address: "",
    generation:"",
    blessingStatus: "",
    spiritualBirthday: "",
    spiritualParent: "",
    membershipCategory: "",
    missionHistory: [{ role: "", organization: "", country: "", startDate: "", endDate: "" }]
  });

  //Change in normal forms
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Change in Mission History
  const handleHistoryChange = (index: number, field: keyof HistoryEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      history: prev.missionHistory.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)),
    }));
  };

  // Add another history entry
  const addHistory = () => {
    setFormData((prev) => ({
      ...prev,
      missionHistory: [...prev.missionHistory, { role: "", organization: "", country: "", startDate: "", endDate: "" }],
    }));
  };

  // Remove a history entry
  const removeHistory = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      missionHistory: prev.missionHistory.filter((_, i) => i !== index),
    }));
  };

  //Handle Submit when Adding new Member
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Member Data:", formData);
    // Add API call here to store data in the database
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (<div className="p-8 bg-[#D9D9D9] min-h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit}>
    {/*Banner */}
    <div className=" bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
        EDIT MEMBER
      </p>
    </div>

    {/*Personal Information Section*/}
    <section className="">
      
      <p className="text-lg text-[#BE9231] font-[700] mt-5 mb-5">PERSONAL INFORMATION</p>
        {/* Div for Form and Picture */}
        <div className="flex flex-row gap-2">
        {/* Div for Form*/}
        <div className="flex flex-col">
        {/* Div for First Row of Form*/}
        <div className="flex flex-row gap-4 mt-2 mb-2">
          {/*Given Name*/}
          <div className="w-1/6">
            <label>Given Name</label>
            <div>
              <input 
              type="text"
              name="givenName"
              value={formData.givenName}
              onChange={handleChange}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
            <p className="text-[#E00000] text-xs italic">Given Name is Required</p>
          </div>

          {/*Middle Name*/}
          <div className="w-1/6">
            <label>Middle Name</label>
            <div>
              <input 
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange} 
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>

          {/*Family Name*/}
          <div className="w-1/6">
            <label>Family Name</label>
            <div>
              <input 
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
            <p className="text-[#E00000] text-xs">Family Name is Required</p>
          </div>

          {/*Gender*/}
          <div className="w-1/6">
            <label>Gender</label>
            <div>
              <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          

          {/*Date of Birth*/}
          <div className="w-1/6">
            <label>Date of Birth</label>
            <div>
              <input 
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>

          {/*Age */}
          <div className="w-1/6">
            <label>Age</label>
            <div>
              <input 
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>

        </div>

          {/* Div for Second Row of Form*/}
        <div className="flex flex-row gap-4 mt-2 mb-2">
          {/*Region*/}
          <div className="w-1/5">
            <label>Region</label>
            <div>
              <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange} 
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>

          {/*SubRegion*/}
          <div className="w-1/5">
            <label>Sub Region</label>
            <div>
              <select 
              name="subRegion"
              value={formData.subRegion}
              onChange={handleChange}
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"
              required>
                <option value="">Select Sub Region</option>
                <option value="SR1">Sub Region 1</option>
                <option value="SR2">Sub Region 2</option>
              </select>
            </div>
          </div>

          {/*Marital Status*/}
          <div className="w-1/5">
            <label>Marital Status</label>
            <div>
              <select 
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"
              required>
                <option value="">Select Marital Status</option>
                <option value="SR1">Single</option>
                <option value="SR2">Married</option>
              </select>
            </div>
          </div>

          {/*Nation*/}
          <div className="w-1/5">
            <label>Nation</label>
            <div>
              <input 
              type="text"
              name="nation"
              value={formData.nation}
              onChange={handleChange}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>

          {/*Name of Spouse*/}
          <div className="w-1/5">
            <label>Name of Spouse</label>
            <div>
              <input 
              type="text"
              name="spouseName"
              value={formData.spouseName}
              onChange={handleChange}
              required 
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>

        </div>

          {/* Div for Third Row of Form*/}
        <div className="flex flex-row gap-4 mt-2 mb-2">
          {/*Phone*/}
          <div className="w-1/5">
            <label>Phone</label>
            <div>
              <input 
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required 
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"
              placeholder="0912-345-6789" />
            </div>
          </div>

          {/*Email*/}
          <div className="w-1/5">
            <label>Email</label>
            <div>
              <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"
              placeholder="example@mail.com"/>
            </div>
            <p className="text-[#E00000] text-xs">Please Enter a Valid Email</p>
          </div>

          {/*Address*/}
          <div className="w-3/5">
            <label>Address</label>
            <div>
              <input 
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required 
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
          </div>
        </div>
        </div>

          {/* Div for Picture*/}
          <div className="flex flex-col items-center center space-y-4 w-1/6">
            <div className="w-32 h-32 border-2 border-dashed flex items-center justify-center overflow-hidden bg-gray-100">
              {image ? (
                <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-10 h-10 text-gray-800" />
              )}
            </div>
            <label className="bg-[#01438f] text-[#FCC346] font-[700] pl-6 pr-6 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
              UPLOAD
              <input type="file" accept="image/jpeg, image/jpg, image/png" className="hidden" onChange={handleImageChange} />
            </label>
            <div className="w-32">
              <p className="text-xs italic ">Upload file (JPEG, JPG, PNG) - 1x1 size required.</p>
            </div>
            
          </div>   
      </div>
    </section>

    {/*Spiritual Information Section */}
    <section className="">
      <p className="text-lg text-[#BE9231] font-[700] mt-5 mb-5">SPIRITUAL INFORMATION</p>
      <div className="flex flex-row w-10/12 gap-4">
        {/*Generation*/}
        <div className="w-1/5">
          <p>Generation</p>
          <div>
            <input 
            type="text"
            name="generation"
            value={formData.generation}
            onChange={handleChange}
            required 
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*Blessing Status*/}
        <div className="w-1/5">
          <p>Blessing Status</p>
          <div>
            <input 
            type="text"
            name="blessingStatus"
            value={formData.blessingStatus}
            onChange={handleChange}
            required 
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*Spiritual Birthday*/}
        <div className="w-1/5">
          <p>Spiritual Birthday</p>
          <div>
            <input 
            type="date"
            name="spiritualBirthday"
            value={formData.spiritualBirthday}
            onChange={handleChange}
            required
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*Spiritual Parent*/}
        <div className="w-1/5">
          <p>Spiritual Parent</p>
          <div>
            <input 
            type="text"
            name="spiritualParent"
            value={formData.spiritualParent}
            onChange={handleChange}
            required 
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*Membership Category*/}
        <div className="w-1/5">
          <p>Membership Category</p>
          <div>
            <input 
            type="text"
            name="membershipCategory"
            value={formData.membershipCategory}
            onChange={handleChange}
            required 
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>
        </div>
    </section>

    {/*Mission History Section */}
    <section className="">
      <p className="text-lg text-[#BE9231] font-[700] mt-5 mb-5">MISSION HISTORY</p>
      {formData.missionHistory.map((entry, index) => (
      <div key={index} className="flex flex-row w-11/12 gap-4 mt-2 mb-5">
        {/*Mission Title/Role*/}
        <div className="w-1/5">
          <p>Mission Title/Role</p>
          <div>
            <input 
            type="text"
            value={entry.role}
            onChange={(e) => handleHistoryChange(index, "role", e.target.value)} 
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"
            required/>
          </div>
        </div>

        {/*Organization*/}
        <div className="w-1/5">
          <p>Organization</p>
          <div>
            <input 
            type="text" 
            value={entry.organization} 
            onChange={(e) => handleHistoryChange(index, "organization", e.target.value)}
            required 
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*Country*/}
        <div className="w-1/5">
        <p>Country</p>
        <div>
          <select 
          value={entry.country} 
          onChange={(e) => handleHistoryChange(index, "country", e.target.value)}
          required
          className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3">
            <option value="">Select Country</option>
            <option value="Philippines">Philippines</option>
            <option value="U.S.A.">U.S.A.</option>
          </select>
        </div>
      </div>

        {/*Start Date*/}
        <div className="w-1/5">
          <p>Start Date</p>
          <div>
            <input 
            type="date" 
            value={entry.startDate} 
            onChange={(e) => handleHistoryChange(index, "startDate", e.target.value)}
            required
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*End Date*/}
        <div className="w-1/5">
          <p>End Date</p>
          <div>
            <input 
            type="date" 
            value={entry.endDate} 
            onChange={(e) => handleHistoryChange(index, "endDate", e.target.value)} 
            required
            className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
          </div>
        </div>

        {/*Div for Add/Delete Buttons */}
        <div className="self-end">
        {/* First entry always has Add button, others only have Delete */}
        {index === 0 ? (
            <button type="button" 
            onClick={addHistory} 
            className="bg-[#01438f] text-[#FCC346] font-[700] pl-8 pr-8 px-4 py-2  rounded-lg text-base hover:bg-blue-700 ">
              Add
            </button>
          ) : (
            <button type="button" 
            onClick={() => removeHistory(index)} 
            className="bg-[#01438f] text-[#FCC346] font-[700] pl-6 pr-6 px-4 py-2 rounded-lg text-base hover:bg-blue-700">
              Delete
            </button>
          )}
          </div>
        </div>
      ))}
    </section>

      <div className="w-full flex justify-center mt-32">
        <button 
          type="submit" 
          className="bg-[#01438f] text-[#FCC346] font-[700] pl-6 pr-6 px-4 py-2 rounded-lg text-base hover:bg-blue-700 h-14">
          EDIT
        </button>
      </div>

    </form>
    
  </div>);
}