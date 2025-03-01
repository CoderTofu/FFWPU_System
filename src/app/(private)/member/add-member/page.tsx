"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function AddMember() {
  const [input, setInput] = useState("");
  return (<div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
    
    {/*Banner */}
    <div className=" bg-white p-4">
      <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
        ADD MEMBER
      </p>
    </div>

    {/*Personal Information Section*/}
    <section className="flex flex-col">
      
      <p className="text-lg text-[#BE9231] font-[700]">PERSONAL INFORMATION</p>
      <div className="flex flex-col">
      <div className="flex flex-row">
        {/*Given Name*/}
        <div>
          <p>Given Name</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} className="border-[#01438F] border rounded-md"/>
          </div>
          <p className="text-[#E00000] text-xs">Given Name is Required</p>
        </div>

        {/*Middle Name*/}
        <div>
          <p>Middle Name</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} className="border-[#01438F] border rounded-md"/>
          </div>
        </div>

        {/*Family Name*/}
        <div>
          <p>Family Name</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} className="border-[#01438F] border rounded-md"/>
          </div>
          <p className="text-[#E00000] text-xs">Family Name is Required</p>
        </div>

        {/*Gender*/}
        <div>
          <p>Gender</p>
          <div>
            <select className="border-[#01438F] border rounded-md">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        

        {/*Date of Birth*/}
        <div>
          <p>Date of Birth</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)} className="border-[#01438F] border rounded-md"/>
          </div>
        </div>

        {/*Age */}
        <div>
          <p>Age</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)} className="border-[#01438F] border rounded-md"/>
          </div>
        </div>

      </div>


      <div className="flex flex-row">
        {/*Region*/}
        <div>
          <p>Region</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*SubRegion*/}
        <div>
          <p>Sub Region</p>
          <div>
            <select>
              <option>Subregion 1</option>
              <option>Subregion 2</option>
            </select>
          </div>
        </div>

        {/*Marital Status*/}
        <div>
          <p>Marital Status</p>
          <div>
            <select>
              <option>Single</option>
              <option>Married</option>
            </select>
          </div>
        </div>

        {/*Nation*/}
        <div>
          <p>Nation</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*Name of Spouse*/}
        <div>
          <p>Name of Spouse</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

      </div>

      <div className="flex flex-row">
        {/*Phone*/}
        <div>
          <p>Phone</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}
            placeholder="0912-345-6789"/>
          </div>
        </div>

        {/*Email*/}
        <div>
          <p>Email</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}
            placeholder="example@mail.com"/>
          </div>
          <p className="text-[#E00000] text-xs">Please Enter a Valid Email</p>
        </div>

        {/*Address*/}
        <div>
          <p>Address</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>
      </div>

      
      </div>
      <div className="flex flex-col">
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

    </section>

    {/*Spiritual Information Section */}
    <section className="flex flex-col">
      <p className="text-lg text-[#BE9231] font-[700]">SPIRITUAL INFORMATION</p>
      <div className="flex flex-row">
        {/*Generation*/}
        <div>
          <p>Generation</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*Blessing Status*/}
        <div>
          <p>Blessing Status</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*Spiritual Birthday*/}
        <div>
          <p>Spiritual Birthday</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*Membership Category*/}
        <div>
          <p>Membership Category</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>
        </div>
    </section>

    {/*Mission History Section */}
    <section className="flex flex-col">
      <p className="text-lg text-[#BE9231] font-[700]">MISSION HISTORY</p>
      <div className="flex flex-row">
        {/*Mission Title/Role*/}
        <div>
          <p>Mission Title/Role</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*Organization*/}
        <div>
          <p>Organization</p>
          <div>
            <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*Country*/}
        <div>
        <p>Country</p>
        <div>
          <select>
            <option>Philippines</option>
            <option>U.S.A.</option>
          </select>
        </div>
      </div>

        {/*Start Date*/}
        <div>
          <p>Start Date</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>

        {/*End Date*/}
        <div>
          <p>End Date</p>
          <div>
            <input type="date" value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>
        </div>

        <div className="flex flex-row">
        {/*Responsibilities*/}
        <div>
          <p>Responsibilities</p>
          <div>
            <textarea value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div>        

        {/*Mission Outcomes & Achievements*/} 
        <div>
          <p>Mission Outcomes & Achievements</p>
          <div>
            <textarea value={input}onChange={(e)=>setInput(e.target.value)}/>
          </div>
        </div> 
        </div>

    </section>



    <Button className="bg-[#01438f] text-[#FCC346] font-[700] pl-6 pr-6">ADD</Button>

    
  </div>);
}
