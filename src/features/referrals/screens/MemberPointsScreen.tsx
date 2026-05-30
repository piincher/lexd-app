import React, { useCallback } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PointsBalanceHeader } from '../components/PointsBalanceHeader';
import { RewardItemGrid } from '../components/RewardItemGrid';
import { RedemptionEmptyState } from '../components/RedemptionEmptyState';
import { useActiveRewardItems } from '../hooks/useRewardItems';
import { useMyRewardSummaryV2 } from '../hooks/useRewards';
import { createStyles } from './MemberPointsScreen.styles';

export const MemberPointsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const itemsQuery = useActiveRewardItems();
  const summaryQuery = useMyRewardSummaryV2();

  const goToHistory = useCallback(() => (navigation as any).navigate('PointsHistory'), [navigation]);
  const goToRedemptions = useCallback(() => (navigation as any).navigate('MyProductRedemptions'), [navigation]);
  const goToDetail = useCallback((item: any) => (navigation as any).navigate('RewardDetail', { item }), [navigation]);

  const points = summaryQuery.data?.rewardPoints || 0;
  const pointValueFCFA = summaryQuery.data?.pointValueFCFA || 50;
  const items = itemsQuery.data || [];
  const isLoading = itemsQuery.isLoading || summaryQuery.isLoading;
  const isError = itemsQuery.isError || summaryQuery.isError;
  const onRefresh = useCallback(() => { itemsQuery.refetch(); summaryQuery.refetch(); }, [itemsQuery, summaryQuery]);

  return (
    <Screen
      header={{ title: 'Récompenses', rightAction: (
        <TouchableOpacity onPress={goToHistory}>
          <MaterialCommunityIcons name="history" size={24} color={colors.primary.main} />
        </TouchableOpacity>
      ) }}
      contentStyle={styles.content}
    >
      {isLoading && (
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      )}

      {isError && (
        <View style={styles.state}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger les récompenses.</Text>
          <TouchableOpacity onPress={onRefresh}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLoading && !isError && (
        <>
          <View style={styles.header}>
            <PointsBalanceHeader points={points} pointValueFCFA={pointValueFCFA} />
          </View>
          {items.length === 0 ? (
            <View style={styles.state}>
              <RedemptionEmptyState title="Aucune récompense" subtitle="Aucun article disponible pour le moment. Revenez plus tard." icon="gift-off-outline" />
            </View>
          ) : (
            <RewardItemGrid items={items} userPoints={points} onItemPress={goToDetail} refreshing={itemsQuery.isRefetching} onRefresh={onRefresh} />
          )}
        </>
      )}

      <View style={styles.fabRow}>
        <TouchableOpacity style={styles.fab} onPress={goToRedemptions}>
          <MaterialCommunityIcons name="clipboard-list-outline" size={22} color={colors.text.inverse} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab} onPress={goToHistory}>
          <MaterialCommunityIcons name="history" size={22} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default MemberPointsScreen;
