"use client";
import React, { useState, useEffect } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/axiosInstance";
import Cookies from "js-cookie";

export default function TryUlit() {
  const [selectedRow, setSelectedRow] = useState<{
    "Member ID": number;
  } | null>(null);
  const router = useRouter();

  const dummyData = [
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
    { ID: 12345, Name: "James", Age: 21 },
  ];

  const [data, setData] = useState([]);
  const column = {
    lg: ["Member ID", "Full Name", "Age"],
    md: ["Member ID", "Full Name"],
    sm: ["Name"],
  };

  const url = "/user";

  const handleEditClick = () => {
    if (selectedRow) {
      router.push(`/members/${selectedRow["Member ID"]}/edit`);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/members/", {
        headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">
      <div className="overflow-hidden rounded-lg">
        <Table
          data={data}
          columns={column}
          rowDoubleClickPath={url}
          onRowSelect={setSelectedRow}
        />
      </div>

      <div className="flex items-center justify-center h-32">
        <button
          onClick={handleEditClick}
          disabled={!selectedRow}
          className={`px-4 py-2 rounded mb-4 m-4 justify-center ${
            selectedRow
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
