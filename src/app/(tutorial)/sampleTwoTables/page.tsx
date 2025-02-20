import Table from "@/components/Table";

export default function JamesPage() {
    const headers = ["ID", "Name", "Age"];
    const data1 = [
      { ID: 1, Name: "Alice", Age: 25 },
      { ID: 2, Name: "Bob", Age: 30 },
    ];
    const data2 = [
      { ID: 3, Name: "Charlie", Age: 28 },
      { ID: 4, Name: "David", Age: 35 },
    ];
  
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
            <h1 className="text-xl font-bold mb-4 text-center">User Data</h1>
    
            {/* Flex container for tables */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* First table */}
              <div className="w-full md:w-[48%] bg-gray-50 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-center">Table 1</h2>
                <Table headers={headers} data={data1} />
              </div>
    
              {/* Second table */}
              <div className="w-full md:w-[48%] bg-gray-50 rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-center">Table 2</h2>
                <Table headers={headers} data={data2} />
              </div>
            </div>
          </div>
        </div>
      );
}