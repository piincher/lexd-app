/**
 * TopCustomersList Component
 * Ranked list of top customers by revenue
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TopCustomerReport } from '../types';

interface TopCustomersListProps {
  customers: TopCustomerReport[];
  maxItems?: number;
  showRank?: boolean;
  onPressCustomer?: (customerId: string) => void;
}

const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32', '#8B5CF6', '#6B7280'];
const rankIcons: (keyof typeof MaterialCommunityIcons.glyphMap)[] = [
  'trophy',
  'medal',
  'medal-outline',
  'account-circle',
  'account-circle',
];

export const TopCustomersList: React.FC<TopCustomersListProps> = ({
  customers,
  maxItems = 5,
  showRank = true,
  onPressCustomer,
}) => {
  const theme = useTheme();

  const displayCustomers = customers.slice(0, maxItems);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderItem = ({ item, index }: { item: TopCustomerReport; index: number }) => {
    const rank = index + 1;
    const rankColor = rankColors[index] || theme.colors.primary;
    const rankIcon = rankIcons[index] || 'account-circle';

    return (
      <View style={styles.item}>
        {showRank && (
          <View style={[styles.rankBadge, { backgroundColor: `${rankColor}20` }]}>
            {rank <= 3 ? (
              <MaterialCommunityIcons name={rankIcon} size={18} color={rankColor} />
            ) : (
              <Text style={[styles.rankText, { color: rankColor }]}>#{rank}</Text>
            )}
          </View>
        )}

        <Avatar.Text
          size={40}
          label={getInitials(item.name)}
          style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
          color="#FFFFFF"
        />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.id}>ID: {item.userId.slice(-6)}</Text>
        </View>

        <View style={styles.amount}>
          <Text style={styles.amountValue}>{formatCurrency(item.totalRevenue)}</Text>
          <Text style={styles.amountLabel}>Total revenus</Text>
        </View>
      </View>
    );
  };

  if (!customers || customers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="account-group" size={48} color="#D1D5DB" />
        <Text style={styles.emptyText}>Aucun client trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayCustomers}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
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
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  avatar: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  id: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  amount: {
    alignItems: 'flex-end',
  },
  amountValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669',
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

export default TopCustomersList;
