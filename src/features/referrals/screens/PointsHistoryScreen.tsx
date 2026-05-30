import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { LedgerListItem } from '../components/LedgerListItem';
import { RedemptionEmptyState } from '../components/RedemptionEmptyState';
import { useMyPointLedger } from '../hooks/usePointLedger';
import { createStyles } from './PointsHistoryScreen.styles';

type FilterType = 'ALL' | 'EARN' | 'REDEEM' | 'ADMIN_ADJUSTMENT';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'ALL', label: 'Tout' },
  { key: 'EARN', label: 'Gagnés' },
  { key: 'REDEEM', label: 'Utilisés' },
  { key: 'ADMIN_ADJUSTMENT', label: 'Ajustements' },
];

export const PointsHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const ledger = useMyPointLedger(20);
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const allItems = useMemo(() => {
    if (!ledger.data) return [];
    return ledger.data.pages.flatMap((page) => page.items);
  }, [ledger.data]);

  const filteredItems = useMemo(() => {
    if (filter === 'ALL') return allItems;
    return allItems.filter((i) => i.type === filter);
  }, [allItems, filter]);

  return (
    <Screen header={{ title: 'Historique des points', showBack: true, onBackPress: handleBack }} contentStyle={styles.content}>
      <View style={styles.tabs}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.key} style={[styles.tab, filter === f.key && styles.tabActive]} onPress={() => setFilter(f.key)}>
            <Text style={[styles.tabText, filter === f.key && styles.tabTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {ledger.isLoading && (
        <View style={styles.state}><ActivityIndicator color={colors.primary.main} /></View>
      )}

      {ledger.isError && (
        <View style={styles.state}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger l'historique.</Text>
          <TouchableOpacity onPress={() => ledger.refetch()}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      )}

      {!ledger.isLoading && !ledger.isError && filteredItems.length === 0 && (
        <View style={styles.state}>
          <RedemptionEmptyState title="Aucune transaction" subtitle="Vos transactions apparaîtront ici." icon="book-open-variant" />
        </View>
      )}

      {!ledger.isLoading && !ledger.isError && filteredItems.length > 0 && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LedgerListItem item={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onEndReached={() => { if (ledger.hasNextPage && !ledger.isFetchingNextPage) ledger.fetchNextPage(); }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ledger.isFetchingNextPage ? <ActivityIndicator color={colors.primary.main} style={{ marginVertical: 16 }} /> : null}
        />
      )}
    </Screen>
  );
};

export default PointsHistoryScreen;
