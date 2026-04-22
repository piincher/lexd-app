/**
 * Top Customers Chart
 * Horizontal bar chart displaying top customers by revenue
 */

import React from 'react';
import { Theme } from '@src/constants/Theme';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Text, Card, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CustomerAnalyticsItem } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

interface TopCustomersChartProps {
  customers: CustomerAnalyticsItem[];
  maxItems?: number;
}

// ============================================
// MAIN COMPONENT
// ============================================

export const TopCustomersChart: React.FC<TopCustomersChartProps> = ({
  customers,
  maxItems = 10,
}) => {
  const theme = useTheme();
  const displayCustomers = customers.slice(0, maxItems);
  
  const maxRevenue = Math.max(...displayCustomers.map((c) => c.totalRevenueFCFA), 1);

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

  const getAvatarColor = (index: number) => {
    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];
    return colors[index % colors.length];
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.title}>Top Clients</Text>
          <View style={styles.summaryBadge}>
            <MaterialCommunityIcons name="account-group" size={14} color="#6B7280" />
            <Text style={styles.summaryText}>{customers.length} clients</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.list}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {displayCustomers.map((customer, index) => {
            const barWidth = (customer.totalRevenueFCFA / maxRevenue) * 100;
            const isReturning = customer.retention.isReturning;

            return (
              <View key={customer.userId} style={styles.customerItem}>
                {/* Rank and Avatar */}
                <View style={styles.rankContainer}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                  <Avatar.Text
                    size={36}
                    label={getInitials(customer.name)}
                    style={{ backgroundColor: getAvatarColor(index) }}
                    labelStyle={{ fontSize: 12, fontWeight: '600' }}
                  />
                </View>

                {/* Customer Info */}
                <View style={styles.infoContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.customerName} numberOfLines={1}>
                      {customer.name}
                    </Text>
                    {isReturning && (
                      <View style={styles.returningBadge}>
                        <MaterialCommunityIcons name="refresh" size={10} color="#059669" />
                        <Text style={styles.returningText}>Fidèle</Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.customerPhone}>
                    {customer.phoneNumber || 'Pas de téléphone'}
                  </Text>

                  {/* Stats Row */}
                  <View style={styles.statsRow}>
                    <View style={styles.stat}>
                      <MaterialCommunityIcons name="package-variant" size={12} color="#6B7280" />
                      <Text style={styles.statText}>
                        {customer.goodsStats.totalGoods} march.
                      </Text>
                    </View>
                    <View style={styles.stat}>
                      <MaterialCommunityIcons name="swap-horizontal" size={12} color="#6B7280" />
                      <Text style={styles.statText}>
                        {customer.transactionCount} trans.
                      </Text>
                    </View>
                  </View>

                  {/* Revenue Bar */}
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
          })}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    elevation: 2,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Theme.colors.neutral[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  summaryText: {
    fontSize: 12,
    color: '#6B7280',
  },
  list: {
    maxHeight: 320,
  },
  customerItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[100],
  },
  rankContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 50,
  },
  rankText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  returningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  returningText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#059669',
  },
  customerPhone: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#6B7280',
  },
  barContainer: {
    marginTop: 8,
  },
  barBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  revenueText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 4,
    textAlign: 'right',
  },
});

export default TopCustomersChart;
