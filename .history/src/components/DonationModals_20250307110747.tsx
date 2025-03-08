import { FC } from "react";

interface DonationModalsProps {
  openSortDropdown: string | null;
  toggleSortDropdown: (dropdown: string | null) => void;
  handleSort: (key: string, order: "asc" | "desc") => void;
}

const DonationModals: FC<DonationModalsProps> = ({
  openSortDropdown,
  toggleSortDropdown,
  handleSort,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => toggleSortDropdown(openSortDropdown === "sort" ? null : "sort")}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Sort Donations
      </button>

      {openSortDropdown === "sort" && (
        <div className="absolute top-0 left-0 bg-white p-4 shadow-lg rounded-md mt-2">
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("Amount", "asc")}
              className="p-2 border border-gray-300 rounded-md"
            >
              Sort by Amount (Asc)
            </button>
            <button
              onClick={() => handleSort("Amount", "desc")}
              className="p-2 border border-gray-300 rounded-md"
            >
              Sort by Amount (Desc)
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleSort("Date", "asc")}
              className="p-2 border border-gray-300 rounded-md"
            >
              Sort by Date (Asc)
            </button>
            <button
              onClick={() => handleSort("Date", "desc")}
              className="p-2 border border-gray-300 rounded-md"
            >
              Sort by Date (Desc)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationModals;
