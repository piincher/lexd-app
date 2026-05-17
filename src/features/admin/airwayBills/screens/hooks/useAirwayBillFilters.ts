import { useState, useCallback } from 'react';
import { AirwayBillStatus } from '../../types';

export type StatusFilter = AirwayBillStatus | 'ALL';

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: 'Tous', value: 'ALL' },
  { label: 'Créé', value: 'CREATED' },
  { label: 'Préparation', value: 'PACKING' },
  { label: 'Prêt', value: 'READY_FOR_DEPARTURE' },
  { label: 'En transit', value: 'IN_TRANSIT' },
  { label: 'Arrivé', value: 'ARRIVED' },
];

export const useAirwayBillFilters = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusFilterChange = useCallback((filter: StatusFilter) => {
    setStatusFilter(filter);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    statusFilter,
    searchQuery,
    statusOptions: STATUS_OPTIONS,
    handleStatusFilterChange,
    handleSearchChange,
  };
};
