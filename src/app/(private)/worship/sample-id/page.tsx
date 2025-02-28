'use client';  // This makes the file a client component

import { useState } from 'react';
import Table from "@/components/Table";

export default function Brent() {
   
    const [worshipId, setWorshipId] = useState('');
    const [date, setDate] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [nation, setNation] = useState('');
    const [church, setChurch] = useState('');
    const [worshipType, setWorshipType] = useState('');
    const [image, setImage] = useState<string | null>(null); // Added missing image state
    
    const data = [
        {ID: 6001, Name: "Orton, Johan H."},
        {ID: 6002, Name: "Reigns, Jeff T."},
        {ID: 6003, Name: "Cena, John B."},
        {ID: 6004, Name: "Hardy, Randy A."},
        {ID: 6005, Name: "Ambrose, Matt R."},
    ];

    const columnConfig = {
        lg: ["ID", "Name"],
        md: ["ID", "Name"],
        sm: ["ID", "Name"],
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && isValidImage(file)) {
            const imageUrl: string = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const isValidImage = (file: File) => {
        return ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.type);
    };

    return (
        <div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
    
            {/*Banner*/}
            <div className=" bg-white p-4">
            <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
                WORSHIP EVENTS
            </p>
            </div>

            {/* Text Under Bordered Box */}
            <div className="w-max h-[23px] mt-[50px] ml-[10px]">
                <p className="text-[20px] font-roboto font-normal leading-[23.44px] tracking-[0%] whitespace-nowrap">
                    First Sunday Event
                </p>
            </div>

            {/* Image Upload Section */}
            <div className="border-2 border-[#01438F] border-solid rounded-lg flex items-center justify-center bg-white mt-6 p-50 m-20 min-h-[200px] ">
                {image ? (
                    <img src={image} alt="Uploaded" className="max-h-full max-w-full object-contain rounded-md" />
                ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                        <input 
                            type="file" 
                            accept=".png,.jpg,.jpeg,.svg" 
                            className="hidden" 
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 mb-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m8-4a4 4 0 01-8 0 4 4 0 018 0z" />
                            </svg>
                            <p className="text-sm">Click or drag an image here</p>
                            <p className="text-xs text-gray-400">SVG, PNG, JPG, JPEG</p>
                        </div>
                    </label>
                )}
            </div>
            
            
            
            <section>

    <div className=" bg-#D9D9D9  flex justify-center items-center gap-2">
          <div className="bg-#D9D9D9  rounded-lg  w-full max-w-6xl">
            
    
            {/* Flex container for tables */}
            <div className="flex flex-wrap gap-4 justify-center">

              {/* First table */}
              <div className="w-full md:w-[48%] rounded-lg  p-4">
                <h2 className="text-lg font-semibold mb-2">Members Attended</h2>
                <Table data={data} columns={columnConfig} />
              </div>
    
              {/* Second table */}
              <div className="w-full md:w-[48%] bg-gray-50 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">Guests Attended</h2>
                <Table  data={data} columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }} />
              </div>
            </div>
          </div>


          <div className=" p-6 rounded-lg  max-w-6xl">
          
    
            {/* Flex For Forms*/}
            <div className="flex flex-wrap  justify-center">
           
                    <form className="flex flex-col gap-4 text-left w-[408px]">
                        <div>
                            <label className="block mb-1 text-[14px]">Worship ID</label>
                            <input 
                                type="text" 
                                value={worshipId} 
                                onChange={(e) => setWorshipId(e.target.value)} 
                                placeholder=" " 
                                className="w-full h-[28px] p-2 rounded-md border border-[#01438F] border-solid text-[14px]" 
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[14px]">Date</label>
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                                className="w-full h-[28px] p-2 rounded-md border border-[#01438F] border-solid text-[14px]" 
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[14px]">Sub Region</label>
                            <input 
                                type="text" 
                                value={subRegion} 
                                onChange={(e) => setSubRegion(e.target.value)} 
                                placeholder=" " 
                                className="w-full h-[28px] p-2 rounded-md border border-[#01438F] border-solid text-[14px]" 
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[14px]">Nation</label>
                            <input 
                                type="text" 
                                value={nation} 
                                onChange={(e) => setNation(e.target.value)} 
                                placeholder=" " 
                                className="w-full h-[28px] p-2 rounded-md border border-[#01438F] border-solid text-[14px]" 
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[14px]">Church</label>
                            <input 
                                type="text" 
                                value={church} 
                                onChange={(e) => setChurch(e.target.value)} 
                                placeholder=" " 
                                className="w-full h-[28px] p-2 rounded-md border border-[#01438F] border-solid text-[14px]" 
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-[14px]">Worship Type</label>
                            <input 
                                type="text" 
                                value={worshipType} 
                                onChange={(e) => setWorshipType(e.target.value)} 
                                placeholder=" " 
                                className="w-full h-[28px] p-2 rounded-md border border-[#01438F] border-solid text-[14px]" 
                            />
                        </div>
                    </form>
                
            </div>
          </div>
        </div>

        </section>
        </div>
    );
}
