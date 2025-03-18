"use client"; // Sabi ni chatgpt need ito hahaha

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface TableProps {
  data: { [key: string]: any }[];
  columns: { [key in "lg" | "md" | "sm"]: string[] };
  rowDoubleClickPath?: string; // Path where the row should redirect
  onRowSelect?: (row: any | null) => void;
  idName?: string;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  rowDoubleClickPath,
  idName,
  onRowSelect,
}) => {
  const [tableSize, setTableSize] = useState<"lg" | "md" | "sm">("lg");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);

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

  {
    /*Handles Single Click Selection*/
  }
  const handleRowClick = (index: number, row: any) => {
    setSelectedRow(index);
    if (onRowSelect) {
      onRowSelect(row); // Send selected row to parent component
    }
  };

  {
    /*Handles Clicks Outside Rows to Deselect*/
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setSelectedRow(null);
        if (onRowSelect) {
          onRowSelect(null); // Notify parent
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  {
    /*Handles Double Click Redirection*/
  }
  const handleRowDoubleClick = (row: any, idName: string) => {
    if (rowDoubleClickPath) {
      router.push(`${rowDoubleClickPath}/${row[idName]}`); // Redirect with ID in URL
    }
  };

  return (
    <div
      ref={tableRef}
      className="overflow-x-auto min-h-[500px] max-h-[500px] overflow-y-auto rounded-lg"
    >
      <table className="min-w-full border-gray-300 bg-white rounded-lg">
        {/* Table Head */}
        <thead className="bg-gray-200 sticky top-0">
          <tr className="bg-[#01438F] text-[#FCC346] cursor-pointer">
            {visibleHeaders.map((header) => (
              <th key={header} className="px-4 py-2 text-center top-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`cursor-pointer transition
              ${selectedRow === index ? "bg-[#E7E6E6]" : "hover:bg-[#E7E6E6]"}`}
              onClick={() => handleRowClick(index, row)}
              onDoubleClick={() => handleRowDoubleClick(row, idName)}
            >
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
