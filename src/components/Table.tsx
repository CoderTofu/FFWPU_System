interface TableProps {
    headers: string[];
    data: { [key: string]: string | number }[];
  }

const Table: React.FC<TableProps> = ({ headers, data }) => {
return (
    <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300">
        <thead>
        <tr className="bg-[#01438F] text-[#FCC346]">
            {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 text-center">
                {header}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {data.length > 0 ? (
            data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-[#D9D9D9]">
                {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-4 py-2 text-center">
                    {row[header] ?? "-"}
                </td>
                ))}
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan={headers.length} className="text-center py-4">
                No data available
            </td>
            </tr>
        )}
        </tbody>
    </table>
    </div>
);
};

export default Table;
  