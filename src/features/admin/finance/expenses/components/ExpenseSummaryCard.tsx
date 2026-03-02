import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatCurrency } from '@src/shared/lib/currency';

interface ExpenseSummaryCardProps {
  title: string;
  amount: number;
  trend?: number;
  trendLabel?: string;
  icon: string;
  iconColor?: string;
  onPress?: () => void;
}

export const ExpenseSummaryCard: React.FC<ExpenseSummaryCardProps> = ({
  title,
  amount,
  trend,
  trendLabel,
  icon,
  iconColor = '#3B82F6',
  onPress,
}) => {
  const theme = useTheme();
  const isPositiveTrend = trend && trend > 0;
  const trendColor = isPositiveTrend ? '#EF4444' : '#10B981';

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
            <MaterialCommunityIcons name={icon as any} size={24} color={iconColor} />
          </View>
          {trend !== undefined && (
            <View style={[styles.trendBadge, { backgroundColor: `${trendColor}20` }]}>
              <MaterialCommunityIcons
                name={isPositiveTrend ? 'trending-up' : 'trending-down'}
                size={14}
                color={trendColor}
              />
              <Text variant="bodySmall" style={[styles.trendText, { color: trendColor }]}>
                {Math.abs(trend)}%
              </Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          <Text variant="titleLarge" style={[styles.amount, { color: theme.colors.error }]}>
            {formatCurrency(amount)}
          </Text>
          <Text variant="bodyMedium" style={styles.title}>
            {title}
          </Text>
          {trendLabel && (
            <Text variant="bodySmall" style={styles.trendLabel}>
              {trendLabel}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

export const ExpenseMiniSummary: React.FC<{
  total: number;
  count: number;
  pendingCount: number;
}> = ({ total, count, pendingCount }) => {
  return (
    <Card style={styles.miniCard}>
      <Card.Content style={styles.miniContent}>
        <View style={styles.miniItem}>
          <MaterialCommunityIcons name="cash-remove" size={24} color="#EF4444" />
          <Text variant="titleMedium" style={styles.miniAmount}>
            {formatCurrency(total)}
          </Text>
          <Text variant="bodySmall" style={styles.miniLabel}>
            Total dépenses
          </Text>
        </View>

        <View style={styles.miniDivider} />

        <View style={styles.miniItem}>
          <MaterialCommunityIcons name="receipt" size={24} color="#3B82F6" />
          <Text variant="titleMedium" style={styles.miniAmount}>
            {count}
          </Text>
          <Text variant="bodySmall" style={styles.miniLabel}>
            Dépenses
          </Text>
        </View>

        <View style={styles.miniDivider} />

        <View style={styles.miniItem}>
          <MaterialCommunityIcons name="clock-outline" size={24} color="#F59E0B" />
          <Text variant="titleMedium" style={styles.miniAmount}>
            {pendingCount}
          </Text>
          <Text variant="bodySmall" style={styles.miniLabel}>
            En attente
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontWeight: '600',
  },
  body: {
    gap: 4,
  },
  amount: {
    fontWeight: '700',
  },
  title: {
    color: '#6B7280',
  },
  trendLabel: {
    color: '#9CA3AF',
  },
  miniCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  miniContent: {
    flexDirection: 'row',
    padding: 16,
  },
  miniItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  miniDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  miniAmount: {
    fontWeight: '700',
    color: '#1F2937',
  },
  miniLabel: {
    color: '#6B7280',
  },
});
