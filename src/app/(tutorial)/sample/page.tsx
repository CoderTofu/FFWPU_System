import Table from "@/components/Table";

export default function JamesPage() {
    const headers = ["ID", "Name", "Age"];
    const data = [
      { ID: 1, Name: "Alice", Age: 25 },
      { ID: 2, Name: "Bob", Age: 30 },
    ];
  
    return (
        <div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
        <div className="bg-white">
          <Table headers={headers} data={data} />
        </div>
      </div>
    );
}