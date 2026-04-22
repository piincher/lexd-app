/**
 * AirwayBillListScreen - Modern, production-ready airway bill list
 */

import React from 'react';
import { View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { AirwayBill } from '../types';
import { useAirwayBillListScreen } from './hooks';
import { styles } from './AirwayBillListScreen.styles';
import { SearchHeader, AirwayBillStats, StatusFilterChips, AirwayBillCard, AirwayBillSkeleton } from './components';

export const AirwayBillListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useAppTheme();
  const { statusFilter, searchQuery, airwayBills, stats, isLoading, isError, error, isFetching, statusOptions, handlers } =
    useAirwayBillListScreen(navigation);

  const containerStyle = [styles.container, { backgroundColor: colors.background.default }];
  const renderItem = ({ item }: { item: AirwayBill }) => <AirwayBillCard item={item} onPress={handlers.handleCardPress} />;

  if (isLoading) {
    return (
      <SafeAreaView style={containerStyle} edges={['top']}>
        <AirwayBillSkeleton />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={containerStyle} edges={['top']}>
        <SearchHeader searchQuery={searchQuery} onSearchChange={handlers.handleSearchChange} resultCount={0} />
        <EmptyState icon="alert-circle-outline" title="Erreur de chargement" message={error?.message || 'Impossible de charger les lettres de transport.'} actionLabel="Réessayer" onAction={handlers.handleRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} edges={['top']}>
      <FlashList
        data={airwayBills}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={handlers.handleRefresh} tintColor={colors.primary.main} />}
        ListHeaderComponent={
          <View>
            <SearchHeader searchQuery={searchQuery} onSearchChange={handlers.handleSearchChange} resultCount={airwayBills.length} />
            <AirwayBillStats totalAWBs={stats.totalAWBs} totalPackages={stats.totalPackages} totalWeight={stats.totalWeight} />
            <StatusFilterChips options={statusOptions} activeFilter={statusFilter} onFilterChange={handlers.handleStatusFilterChange} />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="airplane-outline"
            title={searchQuery ? 'Aucun résultat' : 'Aucune lettre de transport'}
            message={searchQuery ? 'Aucune lettre de transport ne correspond à votre recherche.' : 'Créez votre première lettre de transport pour commencer.'}
            actionLabel={!searchQuery ? 'Créer un AWB' : undefined}
            onAction={!searchQuery ? handlers.handleCreatePress : undefined}
          />
        }
        renderItem={renderItem}
      />
      <View style={[styles.fab, { backgroundColor: colors.primary.main }]}>
        <Ionicons name="add" size={28} color="#FFF" onPress={handlers.handleCreatePress} />
      </View>
    </SafeAreaView>
  );
};

export default AirwayBillListScreen;
