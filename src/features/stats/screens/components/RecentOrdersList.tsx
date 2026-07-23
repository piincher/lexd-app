/**
 * RecentOrdersList
 * SRP: Displays the most recent orders with status badges and details
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { HAIRLINE } from '@src/shared/ui/designLanguage';
import { RecentOrder } from '../../types';
import { RecentOrderRow } from './RecentOrderRow';
import { RecentOrdersEmptyState } from './RecentOrdersEmptyState';
import { styles } from './RecentOrdersList.styles';

interface RecentOrdersListProps {
  orders: RecentOrder[];
}

export const RecentOrdersList: React.FC<RecentOrdersListProps> = ({ orders }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.card,
          borderWidth: HAIRLINE,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Commandes recentes</Text>
          <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>Dernieres activites</Text>
        </View>
        <View style={[styles.countBadge, { backgroundColor: colors.primary[50] }]}>
          <Text style={[styles.countText, { color: colors.primary[600] }]}>{orders.length}</Text>
        </View>
      </View>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <RecentOrderRow
            key={order._id}
            order={order}
            index={index}
            isLast={index === orders.length - 1}
          />
        ))
      ) : (
        <RecentOrdersEmptyState />
      )}
    </View>
  );
};
