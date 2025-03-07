"use client";
import React from 'react';

interface TopMemberDonorProps {
  currency: string;
  period: string
}

interface Donor {
  id: number;
  name: string;
  donation: number;
}

const TopMemberDonor: React.FC<TopMemberDonorProps> = ({ currency }) => {
  // Sample donor data
  const topDonors: Donor[] = [
    { id: 1, name: "John Smith", donation: 65000 },
    { id: 2, name: "Emily Johnson", donation: 53000 },
    { id: 3, name: "Michael Chen", donation: 42000 },
    { id: 4, name: "Sarah Williams", donation: 38000 },
    { id: 5, name: "David Rodriguez", donation: 32000 },
  ];

  const usdToPhpRate = 55.6; // 1 USD = 55.6 PHP

  // Format currency with proper type annotation for parameter
  const formatCurrency = (donation: number): string => {
    const amount = currency === "PHP" ? donation * usdToPhpRate : donation;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="w-full px-6 mb-4">
      <div className="flex flex-col">
        {topDonors.map((donor) => (
          <div key={donor.id} className="flex justify-between py-2">
            <span className="font-medium">{donor.name}</span>
            <span className="text-blue-800 font-bold ml-64" style={{ color: "#01438F" }}>
              {formatCurrency(donor.donation)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMemberDonor;