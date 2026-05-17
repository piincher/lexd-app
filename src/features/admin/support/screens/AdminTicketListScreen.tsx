import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAdminTicketListScreen } from './hooks';
import { styles } from './AdminTicketListScreen.styles';
import {
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
  const {
    search,
    status,
    data,
    isLoading,
    isError,
    isFetching,
    handlers,
  } = useAdminTicketListScreen(navigation);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['top']}>
      <AdminTicketHeader
        title="Tickets support"
        subtitle="Demandes clients"
        onBack={navigation.goBack}
        onRefresh={handlers.refresh}
      />
      <AdminTicketSearchFilters
        search={search}
        status={status}
        onSearchChange={handlers.setSearch}
        onStatusChange={handlers.setStatus}
      />
      <AdminTicketSummary statistics={data?.statistics} />
      {isLoading ? (
        <AdminTicketLoadingState />
      ) : isError ? (
        <AdminTicketEmptyState
          title="Impossible de charger"
          message="Tirez pour réessayer ou vérifiez la connexion."
        />
      ) : (
        <FlashList
          data={data?.tickets ?? []}
          keyExtractor={(item) => item._id}
          renderItem={handlers.renderTicket}
          ListEmptyComponent={<AdminTicketEmptyState />}
          contentContainerStyle={styles.listContent}
          refreshing={isFetching}
          onRefresh={handlers.refresh}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default AdminTicketListScreen;
