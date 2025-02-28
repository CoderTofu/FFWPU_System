"use client";
import React, { useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";

export default function TryUlit() {
    const [selectedRow, setSelectedRow] = useState<{ ID: number } | null>(null);
    const router = useRouter();

    const data = [
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
        {ID:12345, Name:"James", Age:21},
    ]

    const column = {
        lg:["ID","Name","Age"],
        md:["ID","Name"],
        sm:["Name"]
    }

    const url = "/user"

    const handleEditClick = () => {
        if (selectedRow) {
          router.push(`/user/${selectedRow.ID}/edit`);
        }
    };

    return (<div className="p-4 bg-[#D9D9D9] min-h-screen justify-center items-center">

        <div className="overflow-hidden rounded-lg">
            <Table data={data} columns={column} rowDoubleClickPath={url} onRowSelect={setSelectedRow}/>
        </div>

        <div className="flex items-center justify-center h-32">
            <button
            onClick={handleEditClick}
            disabled={!selectedRow}
            className={`px-4 py-2 rounded mb-4 m-4 justify-center ${
                selectedRow ? "bg-blue-500 text-white hover:bg-blue-600" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            >
            Edit
            </button>
        </div>

    </div>);
  }