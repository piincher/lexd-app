import { useMemo } from 'react';
import { AirwayBill } from '../../types';

export const useAirwayBillListData = (allBills: AirwayBill[], searchQuery: string) => {
  const airwayBills = useMemo(() => {
    if (!searchQuery.trim()) return allBills;
    const query = searchQuery.toLowerCase().trim();
    return allBills.filter(
      (bill) =>
        bill.awbNumber.toLowerCase().includes(query) ||
        (bill.airline || '').toLowerCase().includes(query) ||
        (bill.flightNumber || '').toLowerCase().includes(query) ||
        (bill.departureAirport || '').toLowerCase().includes(query) ||
        (bill.arrivalAirport || '').toLowerCase().includes(query)
    );
  }, [allBills, searchQuery]);

  const stats = useMemo(() => {
    return airwayBills.reduce(
      (acc, bill) => ({
        totalAWBs: acc.totalAWBs + 1,
        totalPackages: acc.totalPackages + (bill.totalPackages || 0),
        totalWeight: acc.totalWeight + (bill.totalWeight || 0),
      }),
      { totalAWBs: 0, totalPackages: 0, totalWeight: 0 }
    );
  }, [airwayBills]);

  return { airwayBills, stats };
};
