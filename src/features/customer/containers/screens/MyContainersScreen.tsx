/**
 * My Containers Screen
 * List view showing all containers where customer has goods
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Appbar, ActivityIndicator, Text, Button, Chip, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useGetMyContainers } from '../hooks/useCustomerContainers';
import { ContainerCard } from '../components/ContainerCard';
import { ShippingMode } from '../types';

type FilterMode = 'ALL' | ShippingMode;

interface FilterOption {
  value: FilterMode;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'ALL', label: 'Tous', icon: 'filter-variant' },
  { value: 'SEA', label: 'Maritime', icon: 'ferry' },
  { value: 'AIR', label: 'Aérien', icon: 'airplane' },
];

const MyContainersScreen: React.FC<RootStackScreenProps<'MyContainers'>> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [modeFilter, setModeFilter] = useState<FilterMode>('ALL');

  // Build API filters - only include shippingMode when not ALL
  const filters = useMemo(() => {
    return modeFilter !== 'ALL' ? { shippingMode: modeFilter } : undefined;
  }, [modeFilter]);

  const { data, isLoading, isError, error, refetch, isFetching } = useGetMyContainers(filters);

  const containers = data?.containers || [];

  const handleRefresh = () => {
    refetch();
  };

  const handleContainerPress = (containerId: string) => {
    navigation.navigate('ContainerTracking', { containerId });
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
        {modeFilter !== 'ALL' 
          ? `Aucun conteneur ${FILTER_OPTIONS.find(f => f.value === modeFilter)?.label.toLowerCase()} trouvé.`
          : "Vous n'avez pas de marchandises dans un container pour le moment."}
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
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((option) => {
          const isSelected = modeFilter === option.value;
          return (
            <Chip
              key={option.value}
              selected={isSelected}
              onPress={() => setModeFilter(option.value)}
              style={[
                styles.filterChip,
                isSelected && { backgroundColor: theme.colors.primary }
              ]}
              textStyle={{
                color: isSelected ? '#fff' : theme.colors.onSurface,
                fontFamily: isSelected ? Fonts.bold : Fonts.meduim,
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name={option.icon}
                  size={16}
                  color={isSelected ? '#fff' : theme.colors.onSurfaceVariant}
                />
              )}
            >
              {option.label}
            </Chip>
          );
        })}
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
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
        <FlashList
          data={containers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ContainerCard
              container={item}
              onPress={() => handleContainerPress(item._id)}
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
    gap: 10,
  },
  filterChip: {
    borderRadius: 20,
    height: 36,
    backgroundColor: COLORS.lightBackground,
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
