"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <section>
      <p className="text-lg text-[#BE9231] font-[700]">PERSONAL INFORMATION</p>

      {/*Given Name*/}
      <div>
        <p>Given Name</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <p className="text-[#E00000] text-xs">Given Name is Required</p>
      </div>

      {/*Middle Name*/}
      <div>
        <p>Middle Name</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>

      {/*Family Name*/}
      <div>
        <p>Family Name</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
        <p className="text-[#E00000] text-xs">Family Name is Required</p>
      </div>

      {/*Gender*/}
      

      {/*Date of Birth*/}

      {/*Age */}
      <div>
        <p>Age</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>

      {/*Region*/}
      <div>
        <p>Region</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>

      {/*SubRegion*/}

      {/*Marital Status*/}

      {/*Nation*/}
      <div>
        <p>Nation</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>

      {/*Phone*/}

      {/*Email*/}
      <div>
        <p>Email</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>

      {/*Address*/}
      <div>
        <p>Address</p>
        <div>
          <input type="text" value={input}onChange={(e)=>setInput(e.target.value)}/>
        </div>
      </div>

    </section>

    {/*Spiritual Information Section */}
    <section>
      <p className="text-lg text-[#BE9231] font-[700]">SPIRITUAL INFORMATION</p>


    </section>

    {/*Mission History Section */}
    <section>
      <p className="text-lg text-[#BE9231] font-[700]">MISSION HISTORY</p>
      

    </section>



    <Button>ADD MEMBER</Button>

    
  </div>);
}
