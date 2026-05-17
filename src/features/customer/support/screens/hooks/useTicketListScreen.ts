import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useGetTickets } from '../../hooks/useTickets';
import { useTicketFilters } from '../../hooks/useTicketFilters';
import { TicketStatus, TicketType, TicketPriority } from '../../types';

const toggleArray = <T extends string>(current: T[] | undefined, value: T, setter: (v: T[]) => void) => {
  const arr = current || [];
  setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
};

export const useTicketListScreen = () => {
  const navigation = useNavigation<RootStackScreenProps<'TicketList'>['navigation']>();
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
    filters, activeFilterCount, setStatusFilter, setTypeFilter, setPriorityFilter,
    setSearchQuery, clearFilters,
  } = useTicketFilters();

  const { data: tickets, isLoading, isError, error, refetch, isFetching } = useGetTickets(filters);

  const handleRefresh = useCallback(() => refetch(), [refetch]);
  const handleTicketPress = useCallback((id: string) => navigation.navigate('TicketDetail', { ticketId: id }), [navigation]);
  const handleCreateTicket = useCallback(() => navigation.navigate('CreateTicket'), [navigation]);
  const handleBackPress = useCallback(() => navigation.goBack(), [navigation]);
  const handleToggleSearch = useCallback(() => setShowSearch((s) => !s), []);
  const handleOpenFilters = useCallback(() => setShowFilters(true), []);
  const handleDismissFilters = useCallback(() => setShowFilters(false), []);
  const handleToggleStatus = useCallback((s: TicketStatus) => toggleArray(filters.status, s, setStatusFilter), [filters.status, setStatusFilter]);
  const handleToggleType = useCallback((t: TicketType) => toggleArray(filters.type, t, setTypeFilter), [filters.type, setTypeFilter]);
  const handleTogglePriority = useCallback((p: TicketPriority) => toggleArray(filters.priority, p, setPriorityFilter), [filters.priority, setPriorityFilter]);
  const handleResetFilters = useCallback(() => clearFilters(), [clearFilters]);

  return {
    showSearch,
    showFilters,
    filters,
    activeFilterCount,
    tickets,
    isLoading,
    isError,
    error,
    isFetching,
    handlers: {
      setShowSearch,
      setShowFilters,
      setSearchQuery,
      handleRefresh,
      handleTicketPress,
      handleCreateTicket,
      handleBackPress,
      handleToggleSearch,
      handleOpenFilters,
      handleDismissFilters,
      handleToggleStatus,
      handleToggleType,
      handleTogglePriority,
      handleResetFilters,
    },
  };
};
