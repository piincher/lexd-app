/**
 * Top Customers Chart
 * Horizontal bar chart displaying top customers by revenue
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomerAnalyticsItem } from '../types';
import { CustomerChartRow } from './CustomerChartRow';
import { createStyles } from './TopCustomersChart.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AppTheme } from '@src/shared/constants/Theme';

interface TopCustomersChartProps {
  customers: CustomerAnalyticsItem[];
  maxItems?: number;
}

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K`;
  }
  return amount.toLocaleString('fr-FR');
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

type ThemeColors = AppTheme['colors'];

const getAvatarColor = (index: number, colors: ThemeColors) => {
  const palette = [
    colors.status.success,
    colors.status.info,
    colors.primary.main,
    colors.status.warning,
    colors.status.error,
    colors.accent.rose,
    colors.accent.sky,
  ];
  return palette[index % palette.length];
};

export const TopCustomersChart: React.FC<TopCustomersChartProps> = ({
  customers,
  maxItems = 10,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const displayCustomers = customers.slice(0, maxItems);
  const maxRevenue = Math.max(...displayCustomers.map((c) => c.totalRevenueFCFA), 1);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>Top Clients</Text>
          <View style={styles.summaryBadge}>
            <MaterialCommunityIcons name="account-group" size={14} color={colors.text.secondary} />
            <Text style={styles.summaryText}>{customers.length} clients</Text>
          </View>
        </View>

        <ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {displayCustomers.map((customer, index) => (
            <CustomerChartRow
              key={`${customer.userId}-${index}`}
              customer={customer}
              index={index}
              maxRevenue={maxRevenue}
              formatCurrency={formatCurrency}
              getInitials={getInitials}
              getAvatarColor={(idx) => getAvatarColor(idx, colors)}
            />
          ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

export default TopCustomersChart;
