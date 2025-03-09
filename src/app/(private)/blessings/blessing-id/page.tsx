"use client"; 

import Table from "@/components/Table";

export default function ViewBlessing() {
  const data = [
    { ID: 6001, Name: "Orton, Johan H." },
    { ID: 6002, Name: "Reigns, Jeff T." },
    { ID: 6003, Name: "Cena, John B." },
    { ID: 6004, Name: "Hardy, Randy A." },
    { ID: 6005, Name: "Ambrose, Matt R." },
  ];

  const columnConfig = {
    lg: ["ID", "Name"],
    md: ["ID", "Name"],
    sm: ["ID", "Name"],
  };

  return (
    <div className="p-[20px] sm:p-[50px] bg-[#D9D9D9] min-h-screen justify-center items-center">
      {/* Banner */}
      <div className="bg-white p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <p className="mt-4 mb-4 text-center text-2xl sm:text-3xl font-semibold">
          Blessing Details 
        </p>
      </div>

      {/* Text Under Bordered Box */}
      <div className="w-full mt-[50px]">
        <p className="text-xl font-semibold  whitespace-nowrap">
          First Sunday Blessing
        </p>
        
      </div>

      <section>
        <div className="md:p-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 justify-center items-start gap-2 ">
              <div className="rounded-lg mt-[20px] sm:mt-0 w-full">
                <div className="flex flex-wrap gap-4 justify-center">
                  {/* First table */}
                  <div className="w-full rounded-lg p-4 pb-0 min-w-[300px]">
                    <h2 className="text-lg  font-roboto mb-2">Members Attended</h2>
                    <Table data={data} columns={columnConfig} />
                  </div>

                  {/* Second table */}
                  <div className="w-full rounded-lg p-4 min-w-[300px]">
                    <h2 className="text-lg font-robot mb-2">Guests Attended</h2>
                    <Table
                      data={data}
                      columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }}
                    />
                  </div>
                </div>
              </div>
            </div>
              <form className="flex flex-col gap-6 text-left pl-8 w-full max-w-lg ">
                <div className="flex flex-col mt-6 mb-4 w-full max-w-lg">
                  <label className="text-base font-roboto">Date:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full max-w-lg">
                    <input type="date" className="text-base"></input>
                  </div>
                </div>
                <div className="flex flex-col mb-1 ">
                  <label className="text-base font-bold">Cheonbo/Htm:</label>
                  <div className= "flex flex-col">
                <div className= "flex flex-row gap-2"> 
                  <input type="checkbox"/>
                  <label className="text-base font-roboto">Vertical:</label>
                  </div>
                  
                    
                  <div className= "flex flex-row gap-2"> 
                    <input type="checkbox"/>
                    <label className="text-base font-roboto">Horizontal</label>
                    </div> 
                   
                    </div>
                 
                </div>               
              </form>
           
          </div>
        </div>
      </section>
    </div>
  );
}
