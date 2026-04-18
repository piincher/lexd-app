/**
 * Ticket List Screen
 * Shows all customer support tickets with filtering
 */

import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Appbar, ActivityIndicator, Text, Button, Chip, FAB, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetTickets } from '../hooks/useTickets';
import { TicketCard } from '../components/TicketCard';
import { Ticket, TicketStatus } from '../types';

type FilterTab = 'ALL' | 'OPEN' | 'RESOLVED';

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'ALL', label: 'Tous' },
  { key: 'OPEN', label: 'Ouverts' },
  { key: 'RESOLVED', label: 'Résolus' },
];

const getStatusFilter = (tab: FilterTab): string | undefined => {
  switch (tab) {
    case 'OPEN':
      return 'OPEN,IN_PROGRESS,WAITING_CUSTOMER';
    case 'RESOLVED':
      return 'RESOLVED,CLOSED';
    default:
      return undefined;
  }
};

const TicketListScreen: React.FC<RootStackScreenProps<'TicketList'>> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');

  const statusFilter = getStatusFilter(activeFilter);
  const { data: tickets, isLoading, isError, error, refetch, isFetching } = useGetTickets(statusFilter);

  const handleRefresh = () => {
    refetch();
  };

  const handleTicketPress = (ticket: Ticket) => {
    navigation.navigate('TicketDetail', { ticketId: ticket._id });
  };

  const handleCreateTicket = () => {
    navigation.navigate('CreateTicket');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="headset"
        size={80}
        color={COLORS.SlateGray}
      />
      <Text style={styles.emptyTitle}>Aucun ticket</Text>
      <Text style={styles.emptyText}>
        Vous n'avez pas encore de demandes de support. Créez un nouveau ticket si vous avez besoin d'aide.
      </Text>
      <Button
        mode="contained"
        onPress={handleCreateTicket}
        style={styles.emptyButton}
        icon="plus"
      >
        Nouveau ticket
      </Button>
    </View>
  );

  const renderFilterTabs = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.filterRow}>
        {FILTER_TABS.map((tab) => (
          <Chip
            key={tab.key}
            selected={activeFilter === tab.key}
            onPress={() => setActiveFilter(tab.key)}
            style={styles.filterChip}
            selectedColor={theme.colors.primary}
            showSelectedOverlay
          >
            {tab.label}
          </Chip>
        ))}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Support" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Chargement de vos tickets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Support" titleStyle={styles.headerTitle} />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Une erreur est survenue lors du chargement de vos tickets.'}
          </Text>
          <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const hasTickets = tickets && tickets.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Support" titleStyle={styles.headerTitle} />
        <Appbar.Action
          icon="refresh"
          onPress={handleRefresh}
          disabled={isFetching}
        />
      </Appbar.Header>

      {renderFilterTabs()}

      {!hasTickets ? (
        renderEmptyState()
      ) : (
        <FlashList
          data={tickets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TicketCard
              ticket={item}
              onPress={() => handleTicketPress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreateTicket}
        color={COLORS.white}
        label="Nouveau"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: Fonts.meduim,
    color: COLORS.DimGray,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Silver,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: COLORS.DarkGrey,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.DimGray,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  emptyButton: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
});

export default TicketListScreen;
