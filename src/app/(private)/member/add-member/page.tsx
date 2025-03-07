"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

export default function AddMember() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    age: "",
    birthdate: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  return (<div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
    <form onSubmit={handleSubmit}>
    {/*Banner */}
    <div className=" bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
        ADD MEMBER
      </p>
    </div>

    {/*Personal Information Section*/}
    <section className="">
      
      <p className="text-lg text-[#BE9231] font-[700]">PERSONAL INFORMATION</p>
        {/* Div for Form and Picture */}
        <div className="flex flex-row">
          {/* Div for Form*/}
        <div className="flex flex-col">
          {/* Div for First Row of Form*/}
        <div className="flex flex-row gap-4">
          {/*Given Name*/}
          <div className="w-1/6">
            <p>Given Name</p>
            <div>
              <input 
              type="text"
              name="givenName"
              value={formData.givenName}
              onChange={handleChange} 
              className="border-[#01438F] border rounded-[5px] w-full h-8 text-base px-3"/>
            </div>
            <p className="text-[#E00000] text-xs italic">Given Name is Required</p>
          </div>

          {/*Middle Name*/}
          <div className="w-1/6">
            <p>Middle Name</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

          {/*Family Name*/}
          <div className="w-1/6">
            <p>Family Name</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
            <p className="text-[#E00000] text-xs">Family Name is Required</p>
          </div>

          {/*Gender*/}
          <div className="w-1/6">
            <p>Gender</p>
            <div>
              <select className="border-[#01438F] border rounded-md w-full">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
          

          {/*Date of Birth*/}
          <div className="w-1/6">
            <p>Date of Birth</p>
            <div>
              <input type="date" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

          {/*Age */}
          <div className="w-1/6">
            <p>Age</p>
            <div>
              <input type="number" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

        </div>


        <div className="flex flex-row gap-4">
          {/*Region*/}
          <div className="w-1/5">
            <p>Region</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

          {/*SubRegion*/}
          <div className="w-1/5">
            <p>Sub Region</p>
            <div>
              <select className="border-[#01438F] border rounded-md w-full">
                <option>Subregion 1</option>
                <option>Subregion 2</option>
              </select>
            </div>
          </div>

          {/*Marital Status*/}
          <div className="w-1/5">
            <p>Marital Status</p>
            <div>
              <select className="border-[#01438F] border rounded-md w-full">
                <option>Single</option>
                <option>Married</option>
              </select>
            </div>
          </div>

          {/*Nation*/}
          <div className="w-1/5">
            <p>Nation</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

          {/*Name of Spouse*/}
          <div className="w-1/5">
            <p>Name of Spouse</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

        </div>

        <div className="flex flex-row gap-4">
          {/*Phone*/}
          <div className="w-1/5">
            <p>Phone</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}
              placeholder="0912-345-6789" 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>

          {/*Email*/}
          <div className="w-1/5">
            <p>Email</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}
              placeholder="example@mail.com" 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
            <p className="text-[#E00000] text-xs">Please Enter a Valid Email</p>
          </div>

          {/*Address*/}
          <div className="w-3/5">
            <p>Address</p>
            <div>
              <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
              className="border-[#01438F] border rounded-md w-full"/>
            </div>
          </div>
        </div>

        
        </div>
          {/* Div for Picture*/}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 border-2 border-dashed flex items-center justify-center rounded-lg overflow-hidden bg-gray-100">
              {image ? (
                <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <label className="bg-[#01438f] text-[#FCC346] font-[700] pl-6 pr-6 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
              UPLOAD
              <input type="file" accept="image/jpeg, image/jpg, image/png" className="hidden" onChange={handleImageChange} />
            </label>
            <p className="text-sm text-gray-500">Upload file (JPEG, JPG, PNG) - 1x1 size required.</p>
          </div>   
      </div>
    </section>

    {/*Spiritual Information Section */}
    <section className="flex flex-col">
      <p className="text-lg text-[#BE9231] font-[700]">SPIRITUAL INFORMATION</p>
      <div className="flex flex-row w-3/4 gap-4">
        {/*Generation*/}
        <div className="w-1/5">
          <p>Generation</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*Blessing Status*/}
        <div className="w-1/5">
          <p>Blessing Status</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*Spiritual Birthday*/}
        <div className="w-1/5">
          <p>Spiritual Birthday</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*Spiritual Parent*/}
        <div className="w-1/5">
          <p>Spiritual Parent</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*Membership Category*/}
        <div className="w-1/5">
          <p>Membership Category</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>
        </div>
    </section>

    {/*Mission History Section */}
    <section className="flex flex-col">
      <p className="text-lg text-[#BE9231] font-[700]">MISSION HISTORY</p>
      <div className="flex flex-row gap-4 w-3/4">
        {/*Mission Title/Role*/}
        <div className="w-1/5">
          <p>Mission Title/Role</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*Organization*/}
        <div className="w-1/5">
          <p>Organization</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*Country*/}
        <div className="w-1/5">
        <p>Country</p>
        <div>
          <select className="border-[#01438F] border rounded-md w-full">
            <option>Philippines</option>
            <option>U.S.A.</option>
          </select>
        </div>
      </div>

        {/*Start Date*/}
        <div className="w-1/5">
          <p>Start Date</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>

        {/*End Date*/}
        <div className="w-1/5">
          <p>End Date</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)} 
            className="border-[#01438F] border rounded-md w-full"/>
          </div>
        </div>
        </div>

        <div className="flex flex-row">

        </div>

    </section>



    <Button className="bg-[#01438f] text-[#FCC346] font-[700] pl-6 pr-6">ADD</Button>

    </form>
    
  </div>);
}
