/**
 * Ticket List Screen
 * Pure composition - all logic in hooks, all UI in components
 */

import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetTickets } from '../hooks/useTickets';
import { useTicketFilters } from '../hooks/useTicketFilters';
import { TicketCard } from '../components/TicketCard';
import { TicketListSkeleton } from '../components/TicketListSkeleton';
import { TicketListHeader } from './components/TicketListHeader';
import { TicketSearchBar } from './components/TicketSearchBar';
import { TicketFilterDrawer } from './components/TicketFilterDrawer';
import { TicketEmptyState } from './components/TicketEmptyState';
import { ErrorState } from './components/ErrorState';

const TicketListScreen: React.FC<RootStackScreenProps<'TicketList'>> = ({ navigation }) => {
  const { colors } = useAppTheme();
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

  const toggleArray = <T extends string>(current: T[] | undefined, value: T, setter: (v: T[]) => void) => {
    const arr = current || [];
    setter(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]} edges={['bottom']}>
      <TicketListHeader
        onBack={() => navigation.goBack()}
        onToggleSearch={() => setShowSearch((s) => !s)}
        onOpenFilters={() => setShowFilters(true)}
        activeFilterCount={activeFilterCount}
        showSearch={showSearch}
      />

      {isLoading && <TicketListSkeleton />}
      {isError && <ErrorState error={error?.message} onRetry={handleRefresh} />}

      {!isLoading && !isError && (
        <>
          {showSearch && <TicketSearchBar value={filters.search || ''} onChangeText={setSearchQuery} />}
          {!tickets?.length ? (
            <TicketEmptyState onCreateTicket={handleCreateTicket} />
          ) : (
            <FlashList
              data={tickets}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <TicketCard ticket={item} onPress={() => handleTicketPress(item._id)} />}
              contentContainerStyle={styles.listContent}
              refreshing={isFetching}
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={140}
            />
          )}
          <FAB icon="plus" style={[styles.fab, { backgroundColor: colors.primary.main }]} onPress={handleCreateTicket} color={colors.text.inverse} label="Nouveau" />
        </>
      )}

      <TicketFilterDrawer
        visible={showFilters}
        onDismiss={() => setShowFilters(false)}
        status={filters.status || []}
        type={filters.type || []}
        priority={filters.priority || []}
        onToggleStatus={(s) => toggleArray(filters.status, s, setStatusFilter)}
        onToggleType={(t) => toggleArray(filters.type, t, setTypeFilter)}
        onTogglePriority={(p) => toggleArray(filters.priority, p, setPriorityFilter)}
        onReset={clearFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingVertical: 8, paddingBottom: 88 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, borderRadius: 16 },
});

export default TicketListScreen;
