/**
 * My Containers Screen
 * List view showing all containers where customer has goods
 */

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Appbar, ActivityIndicator, Text, Button, Chip, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetMyContainers } from '../hooks/useCustomerContainers';
import { ContainerCard } from '../components';
import { CustomerContainer, ShippingMode, CustomerContainerStatus } from '../types';

type FilterMode = 'ALL' | ShippingMode;
type FilterStatus = 'ALL' | CustomerContainerStatus;

const MyContainersScreen: React.FC<RootStackScreenProps<'MyContainers'>> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [modeFilter, setModeFilter] = useState<FilterMode>('ALL');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('ALL');

  const filters = {
    ...(modeFilter !== 'ALL' && { shippingMode: modeFilter }),
    ...(statusFilter !== 'ALL' && { status: statusFilter }),
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useGetMyContainers(
    Object.keys(filters).length > 0 ? filters : undefined
  );

  const containers = data?.containers || [];

  const handleRefresh = () => {
    refetch();
  };

  const handleContainerPress = (container: CustomerContainer) => {
    navigation.navigate('ContainerTracking', { containerId: container._id });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="container-off"
        size={80}
        color={COLORS.SlateGray}
      />
      <Text style={styles.emptyTitle}>Aucun container</Text>
      <Text style={styles.emptyText}>
        Vous n'avez pas de marchandises dans un container pour le moment.
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('MyGoods')}
        style={styles.emptyButton}
      >
        Voir mes marchandises
      </Button>
    </View>
  );

  const renderFilterChips = () => (
    <View style={styles.filtersContainer}>
      {/* Mode Filter */}
      <View style={styles.filterRow}>
        <Chip
          selected={modeFilter === 'ALL'}
          onPress={() => setModeFilter('ALL')}
          style={styles.filterChip}
          selectedColor={theme.colors.primary}
        >
          Tous
        </Chip>
        <Chip
          selected={modeFilter === 'SEA'}
          onPress={() => setModeFilter('SEA')}
          style={styles.filterChip}
          selectedColor={theme.colors.primary}
          icon="ferry"
        >
          Maritime
        </Chip>
        <Chip
          selected={modeFilter === 'AIR'}
          onPress={() => setModeFilter('AIR')}
          style={styles.filterChip}
          selectedColor={theme.colors.primary}
          icon="airplane"
        >
          Aérien
        </Chip>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Mes Containers" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Chargement de vos containers...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Mes Containers" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={64}
            color={theme.colors.error}
          />
          <Text style={styles.errorTitle}>Erreur de chargement</Text>
          <Text style={styles.errorText}>
            {error?.message || 'Une erreur est survenue lors du chargement de vos containers.'}
          </Text>
          <Button mode="contained" onPress={() => refetch()} style={styles.retryButton}>
            Réessayer
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Mes Containers"
          titleStyle={styles.headerTitle}
        />
        <Appbar.Action
          icon="refresh"
          onPress={handleRefresh}
          disabled={isFetching}
        />
      </Appbar.Header>

      {renderFilterChips()}

      {containers.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={containers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ContainerCard
              container={item}
              onPress={() => handleContainerPress(item)}
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
});

export default MyContainersScreen;
