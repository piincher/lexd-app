import React from 'react';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useTicketListScreen } from './hooks/useTicketListScreen';
import { styles } from './TicketListScreen.styles';
import { TicketList } from './components/TicketList';
import { TicketListSkeleton } from '../components/TicketListSkeleton';
import { TicketListHeader } from './components/TicketListHeader';
import { TicketSearchBar } from './components/TicketSearchBar';
import { TicketFilterDrawer } from './components/TicketFilterDrawer';
import { TicketEmptyState } from './components/TicketEmptyState';
import { ErrorState } from './components/ErrorState';

const TicketListScreen: React.FC<RootStackScreenProps<'TicketList'>> = () => {
  const { colors } = useAppTheme();
  const {
    showSearch,
    showFilters,
    filters,
    activeFilterCount,
    tickets,
    isLoading,
    isError,
    error,
    isFetching,
    handlers,
  } = useTicketListScreen();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]} edges={['bottom']}>
      <TicketListHeader
        onBack={handlers.handleBackPress}
        onToggleSearch={handlers.handleToggleSearch}
        onOpenFilters={handlers.handleOpenFilters}
        activeFilterCount={activeFilterCount}
        showSearch={showSearch}
      />

      {isLoading && <TicketListSkeleton />}
      {isError && <ErrorState error={error?.message} onRetry={handlers.handleRefresh} />}

      {!isLoading && !isError && (
        <>
          {showSearch && <TicketSearchBar value={filters.search || ''} onChangeText={handlers.setSearchQuery} />}
          {!tickets?.length ? (
            <TicketEmptyState onCreateTicket={handlers.handleCreateTicket} />
          ) : (
            <TicketList
              tickets={tickets}
              onTicketPress={handlers.handleTicketPress}
              onRefresh={handlers.handleRefresh}
              isFetching={isFetching}
              contentContainerStyle={styles.listContent}
            />
          )}
          <FAB icon="plus" style={[styles.fab, { backgroundColor: colors.primary.main }]} onPress={handlers.handleCreateTicket} color={colors.text.inverse} label="Nouveau" />
        </>
      )}

      <TicketFilterDrawer
        visible={showFilters}
        onDismiss={handlers.handleDismissFilters}
        status={filters.status || []}
        type={filters.type || []}
        priority={filters.priority || []}
        onToggleStatus={handlers.handleToggleStatus}
        onToggleType={handlers.handleToggleType}
        onTogglePriority={handlers.handleTogglePriority}
        onReset={handlers.handleResetFilters}
      />
    </SafeAreaView>
  );
};

export default TicketListScreen;
