import Table from "@/components/Table";

export default function JamesPage() {
  const data = [
    { ID: 645969, "Full Name": "Gregorio, Venus Aira A.", Gender: "M", Nation: "Philippines", Region: "Asia Pacific", "Marital Status": "Widowed", Age: 69 },
    { ID: 645970, "Full Name": "Sanchez, Princess Nicole" , Gender: "F", Nation: "Philippines", Region: "Asia Pacific", "Marital Status": "Married", Age: 40 },
  ];

  const columnConfig = {
    lg: ["ID", "Full Name", "Gender", "Nation", "Region", "Marital Status", "Age"],
    md: ["ID", "Full Name", "Gender", "Age"],
    sm: ["ID", "Full Name"],
  };

  return (
    <div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
      <div className="bg-white">
        <Table data={data} columns={columnConfig} />
      </div>
    </div>
  );
};