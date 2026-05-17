import { useCallback } from 'react';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigations/type';
import { useAdminTicketFilters, useAdminTickets } from '../../hooks';
import type { AdminTicket } from '../../types';
import { AdminTicketCard } from '../../components';

export type UseAdminTicketListScreenReturn = {
  search: string;
  status: string;
  filters: ReturnType<typeof useAdminTicketFilters>['filters'];
  data: ReturnType<typeof useAdminTickets>['data'];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  handlers: {
    setSearch: (value: string) => void;
    setStatus: (value: string) => void;
    openTicket: (ticket: AdminTicket) => void;
    renderTicket: ({ item }: { item: AdminTicket }) => JSX.Element;
    refresh: () => void;
  };
};

export const useAdminTicketListScreen = (
  navigation: NavigationProp<RootStackParamList>
): UseAdminTicketListScreenReturn => {
  const { search, status, filters, setSearch, setStatus } = useAdminTicketFilters();
  const { data, isLoading, isError, refetch, isFetching } = useAdminTickets(filters);

  const openTicket = useCallback(
    (ticket: AdminTicket) => {
      navigation.navigate('AdminTicketDetail', { ticketId: ticket._id });
    },
    [navigation]
  );

  const renderTicket = useCallback(
    ({ item }: { item: AdminTicket }) => (
      <AdminTicketCard ticket={item} onPress={() => openTicket(item)} />
    ),
    [openTicket]
  );

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    search,
    status,
    filters,
    data,
    isLoading,
    isError,
    isFetching,
    handlers: {
      setSearch,
      setStatus,
      openTicket,
      renderTicket,
      refresh,
    },
  };
};
