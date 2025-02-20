"use client";  // Sabi ni chatgpt need ito hahaha

import React, { useState, useEffect } from "react";

interface TableProps {
  data: { [key: string]: any }[];
  columns: { [key in "lg" | "md" | "sm"]: string[] };
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [tableSize, setTableSize] = useState<"lg" | "md" | "sm">(
    "lg"
  );

  // Automatically update table size based on screen width
  useEffect(() => {
    const updateTableSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setTableSize("lg");
      else if (width >= 768) setTableSize("md");
      else setTableSize("sm");
    };

    updateTableSize(); // Set initial size
    window.addEventListener("resize", updateTableSize);
    return () => window.removeEventListener("resize", updateTableSize);
  }, []);

  const visibleHeaders = columns[tableSize];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        {/* Table Head */}
        <thead className="bg-gray-200">
          <tr className="bg-[#01438F] text-[#FCC346] cursor-pointer">
            {visibleHeaders.map((header) => (
              <th key={header} className="px-4 py-2 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-[#E7E6E6] cursor-pointer">
              {visibleHeaders.map((header) => (
                <td key={header} className="px-4 py-2 text-center">
                  {row[header] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
  