import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAdminTicketFilters, useAdminTickets } from '../hooks';
import type { AdminTicket } from '../types';
import {
  AdminTicketCard,
  AdminTicketEmptyState,
  AdminTicketHeader,
  AdminTicketLoadingState,
  AdminTicketSearchFilters,
  AdminTicketSummary,
} from '../components';

export const AdminTicketListScreen: React.FC<RootStackScreenProps<'AdminTicketList'>> = ({
  navigation,
}) => {
  const { colors } = useAppTheme();
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
      <AdminTicketHeader title="Tickets support" subtitle="Demandes clients" onBack={navigation.goBack} onRefresh={refetch} />
      <AdminTicketSearchFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />
      <AdminTicketSummary statistics={data?.statistics} />
      {isLoading ? (
        <AdminTicketLoadingState />
      ) : isError ? (
        <AdminTicketEmptyState title="Impossible de charger" message="Tirez pour réessayer ou vérifiez la connexion." />
      ) : (
        <FlashList
          data={data?.tickets ?? []}
          keyExtractor={(item) => item._id}
          renderItem={renderTicket}
          ListEmptyComponent={<AdminTicketEmptyState />}
          contentContainerStyle={styles.listContent}
          refreshing={isFetching}
          onRefresh={refetch}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
});

export default AdminTicketListScreen;
