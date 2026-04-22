/**
 * My Containers Screen
 * List view showing all containers where customer has goods
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Appbar, Text, Button, Chip, Searchbar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetMyContainers } from '../hooks/useCustomerContainers';
import { ContainerCard } from '../components/ContainerCard';
import { ContainerListSkeleton } from '../components/ContainerListSkeleton';
import { ShippingMode } from '../types';
import * as Haptics from 'expo-haptics';

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
  const [searchQuery, setSearchQuery] = useState('');
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
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
      color: colors.text.secondary,
    },
    errorTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      marginTop: 16,
    },
    errorText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    retryButton: {
      marginTop: 24,
    },
    filtersContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
    filterRow: {
      flexDirection: 'row',
      gap: 10,
    },
    filterChip: {
      borderRadius: 20,
      height: 36,
      backgroundColor: colors.background.paper,
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 4,
      backgroundColor: colors.background.card,
    },
    searchBar: {
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      height: 44,
    },
    searchInput: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      minHeight: 0,
      paddingVertical: 0,
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
      color: colors.text.secondary,
      marginTop: 16,
    },
    emptyText: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 24,
    },
    emptyButton: {
      marginTop: 8,
    },
  }), [colors, isDark]);

  // Build API filters - only include shippingMode when not ALL
  const filters = useMemo(() => {
    return modeFilter !== 'ALL' ? { shippingMode: modeFilter } : undefined;
  }, [modeFilter]);

  const { data, isLoading, isError, error, refetch, isFetching } = useGetMyContainers(filters);

  const containers = data?.containers || [];

  const filteredContainers = useMemo(() => {
    if (!searchQuery.trim()) return containers;
    const q = searchQuery.toLowerCase();
    return containers.filter(c =>
      c.virtualContainerNumber?.toLowerCase().includes(q) ||
      c.shippingLine?.toLowerCase().includes(q) ||
      c.route?.name?.toLowerCase().includes(q)
    );
  }, [containers, searchQuery]);

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
        color={colors.status.success}
      />
      <Text style={styles.emptyTitle}>Aucun container</Text>
      <Text style={styles.emptyText}>
        {searchQuery.trim()
          ? "Aucun container ne correspond à votre recherche."
          : modeFilter !== 'ALL'
            ? `Aucun conteneur ${FILTER_OPTIONS.find(f => f.value === modeFilter)?.label.toLowerCase()} trouvé.`
            : "Vous n'avez pas de marchandises dans un container pour le moment."}
      </Text>
      {!searchQuery.trim() && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate('MyGoods')}
          style={styles.emptyButton}
        >
          Voir mes marchandises
        </Button>
      )}
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
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setModeFilter(option.value);
              }}
              style={[
                styles.filterChip,
                isSelected && {
                  backgroundColor: theme.colors.primary,
                  borderWidth: 1,
                  borderColor: theme.colors.primary,
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                },
              ]}
              textStyle={{
                color: isSelected ? colors.text.inverse : theme.colors.onSurface,
                fontFamily: isSelected ? Fonts.bold : Fonts.meduim,
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name={option.icon}
                  size={16}
                  color={isSelected ? colors.text.inverse : theme.colors.onSurfaceVariant}
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
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Mes Containers" />
        </Appbar.Header>
        <ContainerListSkeleton />
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

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Rechercher un container..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          icon="magnify"
          clearIcon="close-circle"
        />
      </View>

      {renderFilterChips()}

      {filteredContainers.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlashList
          data={filteredContainers}
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

export default MyContainersScreen;
