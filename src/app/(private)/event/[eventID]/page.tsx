"use client";

import Table from "@/components/Table";

export default function ViewWorship({
  params,
}: {
  params: {
    eventID: string;
  };
}) {
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
          WORSHIP EVENTS
        </p>
      </div>

      {/* Text Under Bordered Box */}
      <div className="w-full mt-[50px]">
        <p className="text-xl font-roboto font-normal whitespace-nowrap">
          First Sunday Event
        </p>
        <div className="border-2 border-[#01438F] border-solid rounded-lg flex items-center justify-center bg-white mt-6 min-h-[300px]">
          <label className="flex flex-col items-center cursor-pointer">
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="hidden"
            />
            <div className="flex flex-col items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-12 h-12 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16v-4m0 0V8m0 4h4m-4 0H8m8-4a4 4 0 01-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-sm">Click or drag an image here</p>
              <p className="text-xs text-gray-400">SVG, PNG, JPG, JPEG</p>
            </div>
          </label>
        </div>
      </div>

      <section>
        <div className="md:p-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-1 justify-center items-start gap-2">
              <div className="rounded-lg mt-[20px] sm:mt-0 w-full">
                <div className="flex flex-wrap gap-4 justify-center">
                  {/* First table */}
                  <div className="w-full rounded-lg p-4 pb-0">
                    <h2 className="text-lg font-semibold mb-2">
                      Members Attended
                    </h2>
                    <Table data={data} columns={columnConfig} />
                  </div>

                  {/* Second table */}
                  <div className="w-full rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Guests Attended
                    </h2>
                    <Table
                      data={data}
                      columns={{ lg: ["Name"], md: ["Name"], sm: ["Name"] }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-start items-start flex-col">
              <div className="flex justify-center items-center w-full text-xl font-semibold">
                <p className="text-2xl m-8">DETAILS</p>
              </div>
              <form className="flex flex-col gap-4 text-left pl-8 w-full">
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Worship ID:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Event Name:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Date:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Sub Region:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Region:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Church:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
                <div className="flex flex-col mb-1 w-full">
                  <label className="text-base font-bold">Worship Type:</label>
                  <div className="flex items-center p-2 rounded-md border border-[#01438F] bg-white w-full">
                    <p className="text-base">Placeholder</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
