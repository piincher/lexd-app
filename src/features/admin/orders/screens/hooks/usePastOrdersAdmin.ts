import { useState, useEffect } from 'react';
import { productType } from '@src/api/order';
import { useGetActiveOrdersAdmin } from '../../hooks/useOrderManagement';

export const usePastOrdersAdmin = () => {
  const [shippingType, setShippingType] = useState<'air' | 'sea'>('air');
  const [statusFilter, setStatusFilter] = useState('Inactive');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, fetchNextPage, isError, hasNextPage, isFetchingNextPage, refetch } =
    useGetActiveOrdersAdmin(statusFilter, undefined, shippingType);

  const handleShippingTypeChange = (type: 'air' | 'sea') => {
    setShippingType(type);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [shippingType]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const filteredData = (() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.filter(
        (item) =>
          item.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code?.includes(searchQuery) ||
          item.clientPhone?.includes(searchQuery)
      )
    );
  })() as productType[];

  return {
    shippingType,
    statusFilter,
    searchQuery,
    setSearchQuery,
    data,
    fetchNextPage,
    isError,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    handleShippingTypeChange,
    loadMore,
    filteredData,
  };
};
