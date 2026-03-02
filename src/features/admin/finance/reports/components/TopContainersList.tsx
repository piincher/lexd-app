/**
 * TopContainersList Component
 * Ranked list of top containers by profit
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TopContainerReport } from '../types';

interface TopContainersListProps {
  containers: TopContainerReport[];
  maxItems?: number;
  showRank?: boolean;
  onPressContainer?: (containerId: string) => void;
}

const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32', '#8B5CF6', '#6B7280'];

const getProfitColor = (profit: number, margin: number) => {
  if (margin >= 30) return '#10B981';
  if (margin >= 15) return '#3B82F6';
  if (margin >= 5) return '#F59E0B';
  return '#EF4444';
};

const getMarginBadgeColor = (margin: number) => {
  if (margin >= 30) return ['#10B981', '#059669'];
  if (margin >= 15) return ['#3B82F6', '#2563EB'];
  if (margin >= 5) return ['#F59E0B', '#D97706'];
  return ['#EF4444', '#DC2626'];
};

export const TopContainersList: React.FC<TopContainersListProps> = ({
  containers,
  maxItems = 5,
  showRank = true,
  onPressContainer,
}) => {
  const theme = useTheme();

  const displayContainers = containers.slice(0, maxItems);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderItem = ({ item, index }: { item: TopContainerReport; index: number }) => {
    const rank = index + 1;
    const rankColor = rankColors[index] || theme.colors.primary;
    const profitColor = getProfitColor(item.profit, item.profitMargin);
    const marginBadgeColors = getMarginBadgeColor(item.profitMargin);

    return (
      <View style={styles.item}>
        {showRank && (
          <View style={[styles.rankBadge, { backgroundColor: `${rankColor}20` }]}>
            <Text style={[styles.rankText, { color: rankColor }]}>#{rank}</Text>
          </View>
        )}

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="container" size={28} color={theme.colors.primary} />
        </View>

        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.containerNumber} numberOfLines={1}>
              {item.containerNumber}
            </Text>
            <View
              style={[
                styles.marginBadge,
                { backgroundColor: `${marginBadgeColors[0]}20` },
              ]}
            >
              <Text style={[styles.marginText, { color: marginBadgeColors[0] }]}>
                {(item.profitMargin || 0).toFixed(1)}%
              </Text>
            </View>
          </View>
          <Text style={styles.id}>ID: {item.containerId.slice(-6)}</Text>
        </View>

        <View style={styles.amount}>
          <Text style={[styles.profitValue, { color: profitColor }]}>
            {formatCurrency(item.profit)}
          </Text>
          <Text style={styles.amountLabel}>Bénéfice net</Text>
        </View>
      </View>
    );
  };

  if (!containers || containers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="container-off" size={48} color="#D1D5DB" />
        <Text style={styles.emptyText}>Aucun conteneur trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayContainers}
        renderItem={renderItem}
        keyExtractor={(item) => item.containerId}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  containerNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  marginBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  marginText: {
    fontSize: 10,
    fontWeight: '700',
  },
  id: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  amount: {
    alignItems: 'flex-end',
  },
  profitValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  amountLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 12,
    color: '#9CA3AF',
    fontSize: 14,
  },
});

export default TopContainersList;
