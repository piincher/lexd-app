import React from 'react';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { CustomerAnalyticsItem } from '../types';
import { createStyles } from './TopCustomersChart.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CustomerChartRowProps {
  customer: CustomerAnalyticsItem;
  index: number;
  maxRevenue: number;
  formatCurrency: (amount: number) => string;
  getInitials: (name: string) => string;
  getAvatarColor: (index: number) => string;
}

export const CustomerChartRow: React.FC<CustomerChartRowProps> = ({
  customer,
  index,
  maxRevenue,
  formatCurrency,
  getInitials,
  getAvatarColor,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const barWidth = (customer.totalRevenueFCFA / maxRevenue) * 100;
  const isReturning = customer.retention.isReturning;

  return (
    <View style={styles.customerItem}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>#{index + 1}</Text>
        <Avatar.Text
          size={36}
          label={getInitials(customer.name)}
          style={{ backgroundColor: getAvatarColor(index) }}
          labelStyle={{ fontSize: 12, fontWeight: '600' }}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.customerName} numberOfLines={1}>
            {customer.name}
          </Text>
          {isReturning && (
            <View style={styles.returningBadge}>
              <MaterialCommunityIcons name="refresh" size={10} color={colors.status.success} />
              <Text style={styles.returningText}>Fidèle</Text>
            </View>
          )}
        </View>

        <Text style={styles.customerPhone}>
          {customer.phoneNumber || 'Pas de téléphone'}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="package-variant" size={12} color={Theme.colors.text.secondary} />
            <Text style={styles.statText}>
              {customer.goodsStats.totalGoods} march.
            </Text>
          </View>
          <View style={styles.stat}>
            <MaterialCommunityIcons name="swap-horizontal" size={12} color={Theme.colors.text.secondary} />
            <Text style={styles.statText}>
              {customer.transactionCount} trans.
            </Text>
          </View>
        </View>

        <View style={styles.barContainer}>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${barWidth}%`,
                  backgroundColor: getAvatarColor(index),
                },
              ]}
            />
          </View>
          <Text style={styles.revenueText}>
            {formatCurrency(customer.totalRevenueFCFA)} FCFA
          </Text>
        </View>
      </View>
    </View>
  );
};
