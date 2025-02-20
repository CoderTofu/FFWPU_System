import Table from "@/components/Table";

export default function JamesPage() {
    const headers = ["ID", "Full Name", "Gender", "Nation", "Region", "Marital Status", "Age"];
    const data = [
      { ID: 645969, "Full Name": "Gregorio, Venus Aira A.", Gender: "M", Nation: "Philippines", Region: "Asia Pacific", "Marital Status": "Widowed", Age: 69 },
      { ID: 645970, "Full Name": "Sanchez, Princess Nicole" , Gender: "F", Nation: "Philippines", Region: "Asia Pacific", "Marital Status": "Married", Age: 40 },
    ];

    const data2 = {
      md: [
        { ID: 1, Name: "Alice", Age: 25 },
        { ID: 2, Name: "Bob", Age: 30 },]
    }

    const column = {
      lg: ["id", "name", "age"],
      md: ["id", "name"],
      sm: ["id"]
    }
  
    return (
        <div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
        <div className="bg-white">
          <Table headers={headers} data={data} />
        </div>
      </div>
    );
}