import { useMemo } from 'react';
import { useGetActiveRoutes } from '../../../../routes/hooks/useRoutes';
import { useGetConsignees, Consignee } from '../../../../consignees';
import { useCreateContainer } from '../../../hooks';
import { ShippingLine, ShippingMode, Route } from '../../../types';

const SEA_SHIPPING_LINES: ShippingLine[] = ['MSC', 'MAERSK', 'CMA_CGM', 'HAPAG_LLOYD'];

export const useCreateContainerData = (
  shippingMode: ShippingMode | '',
  consigneeSearchQuery: string
) => {
  const consigneeSearchParams = useMemo(() => {
    const search = consigneeSearchQuery.trim();
    const isPhoneLike = /^[\d\s\-+()]+$/.test(search);
    const normalizedSearch = isPhoneLike ? search.replace(/[^\d+]/g, '') : search;

    return {
      isActive: true,
      page: 1,
      limit: 20,
      ...(normalizedSearch.length >= 2 ? { search: normalizedSearch } : {}),
    };
  }, [consigneeSearchQuery]);

  const { data: consigneesData, isLoading: isLoadingConsignees } = useGetConsignees(consigneeSearchParams);
  const { 
    data: routesData, 
    isLoading: isLoadingRoutes,
    isError: isRoutesError,
  } = useGetActiveRoutes(shippingMode || undefined);
  const createMutation = useCreateContainer();

  const consignees: Consignee[] = consigneesData || [];
  const routes: Route[] = ((routesData?.data?.routes || []) as unknown as Route[]).filter(
    (route) => route.shippingMode === 'SEA'
  );

  const filteredConsignees = useMemo(() => {
    if (!consigneeSearchQuery.trim()) return consignees;
    const query = consigneeSearchQuery.trim().toLowerCase();
    const phoneQuery = query.replace(/[^\d+]/g, '');

    return consignees.filter((c) => {
      const phone = c.phone?.toLowerCase() || '';
      const normalizedPhone = phone.replace(/[^\d+]/g, '');

      return (
        c.name.toLowerCase().includes(query) ||
        phone.includes(query) ||
        (phoneQuery.length > 0 && normalizedPhone.includes(phoneQuery)) ||
        c.warehouseAddress?.toLowerCase().includes(query) ||
        c._id?.toLowerCase().includes(query)
      );
    });
  }, [consignees, consigneeSearchQuery]);

  const availableShippingLines = useMemo(() => SEA_SHIPPING_LINES, []);

  return {
    consignees,
    routes,
    filteredConsignees,
    isLoadingConsignees,
    isLoadingRoutes,
    isRoutesError,
    availableShippingLines,
    createMutation,
  };
};
