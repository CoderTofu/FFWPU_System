'use client';
import React from 'react';

interface Donor {
  name: string;
  amount: number; // in USD
}

interface TopMemberDonorProps {
  currency: 'USD' | 'PHP' | 'EUR' | 'JPY' | 'KRW' | 'CNY';
  period: string;
  topDonors: Donor[];
}

const TopMemberDonor: React.FC<TopMemberDonorProps> = ({ currency, topDonors, period }) => {
  // conversion rates per 1 USD
  console.log('TopMemberDonor', topDonors);
  const conversionRates: Record<string, number> = {
    USD: 1,
    PHP: 55.6,
    EUR: 0.93,
    JPY: 145.3,
    KRW: 1310.4,
    CNY: 7.15,
  };
  const rate = conversionRates[currency] ?? 1;

  // JPY/KRW: no decimals, others: 2 decimals
  const zeroDecimals = currency === 'JPY' || currency === 'KRW';

  const formatCurrency = (donationInUSD: number): string => {
    const converted = donationInUSD * rate;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: zeroDecimals ? 0 : 2,
      maximumFractionDigits: zeroDecimals ? 0 : 2,
    }).format(converted);
  };

  console.log('TopMemberDonor', topDonors);

  return (
    <div className="w-full px-6 mb-4">
      <div className="flex flex-col">
        {period === 'year' &&
          topDonors.yearly.map((donor, idx) => (
            <div key={idx} className="flex justify-between py-2">
              <p className="font-medium truncate">{donor.name}</p>
              <span className="text-blue-800 font-bold" style={{ color: '#01438F' }}>
                {formatCurrency(donor.amount)}
              </span>
            </div>
          ))}
        {period === 'month' &&
          topDonors.monthly.map((donor, idx) => (
            <div key={idx} className="flex justify-between py-2">
              <p className="font-medium truncate">{donor.name}</p>
              <span className="text-blue-800 font-bold" style={{ color: '#01438F' }}>
                {formatCurrency(donor.amount)}
              </span>
            </div>
          ))}
        {period === 'week' &&
          topDonors.weekly.map((donor, idx) => (
            <div key={idx} className="flex justify-between py-2">
              <p className="font-medium truncate">{donor.name}</p>
              <span className="text-blue-800 font-bold" style={{ color: '#01438F' }}>
                {formatCurrency(donor.amount)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopMemberDonor;