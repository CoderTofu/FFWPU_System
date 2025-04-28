'use client';
import React from 'react';

interface TopMemberDonorProps {
  currency: string;
  period: string;
}

interface Donor {
  name: string;
  amount: number;
}

const TopMemberDonor: React.FC<TopMemberDonorProps> = ({ currency, topDonors }) => {
  const usdToPhpRate = 55.6; // 1 USD = 55.6 PHP

  // Format currency with proper type annotation for parameter
  const formatCurrency = (donation: number): string => {
    const amount = currency === 'PHP' ? donation * usdToPhpRate : donation;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full px-6 mb-4">
      <div className="flex flex-col">
        {topDonors.map((donor, index) => (
          <div key={index} className="flex justify-between py-2">
            <span className="font-medium">{donor.name}</span>
            <span className="text-blue-800 font-bold ml-64" style={{ color: '#01438F' }}>
              {formatCurrency(donor.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMemberDonor;
