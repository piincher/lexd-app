/**
 * Payment Metrics Component
 * Displays payment analytics including collection rate, aging, and methods
 */

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme, ProgressBar } from 'react-native-paper';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaymentMetricsData, PaymentMethodMetric, OutstandingAgingBucket } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

interface PaymentMetricsProps {
  data: PaymentMetricsData;
}

type ViewMode = 'overview' | 'methods' | 'aging';

// ============================================
// COLLECTION RATE GAUGE
// ============================================

interface CollectionGaugeProps {
  rate: number;
  size?: number;
}

const CollectionGauge: React.FC<CollectionGaugeProps> = ({ rate, size = 120 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(rate / 100, 1);
  const strokeDashoffset = circumference * (1 - progress);

  // Color based on rate
  let color = '#EF4444';
  if (rate >= 90) color = '#10B981';
  else if (rate >= 70) color = '#F59E0B';
  else if (rate >= 50) color = '#F97316';

  return (
    <View style={[styles.gaugeContainer, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
        {/* Center text */}
        <SvgText
          x={center}
          y={center - 5}
          fontSize={24}
          fontWeight="bold"
          fill="#1F2937"
          textAnchor="middle"
        >
          {rate.toFixed(0)}%
        </SvgText>
        <SvgText
          x={center}
          y={center + 15}
          fontSize={10}
          fill="#6B7280"
          textAnchor="middle"
        >
          Collecté
        </SvgText>
      </Svg>
    </View>
  );
};

// ============================================
// PAYMENT METHOD PIE CHART
// ============================================

interface PaymentMethodChartProps {
  methods: PaymentMethodMetric[];
  size?: number;
}

const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ methods, size = 140 }) => {
  const colors: Record<string, string> = {
    ORANGE_MONEY: '#FF6600',
    WAVE: '#1E90FF',
    CARD: '#10B981',
    CASH: '#8B5CF6',
  };

  const radius = size / 2 - 20;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;
  const total = methods.reduce((sum, m) => sum + m.total, 0);

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size}>
        {methods.map((method, index) => {
          const percentage = total > 0 ? method.total / total : 0;
          const strokeDasharray = `${circumference * percentage} ${circumference}`;
          const rotation = cumulativePercentage * 360;
          cumulativePercentage += percentage;

          return (
            <Circle
              key={method.method}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={colors[method.method] || '#6B7280'}
              strokeWidth={20}
              strokeDasharray={strokeDasharray}
              transform={`rotate(${rotation - 90} ${center} ${center})`}
            />
          );
        })}
        <SvgText
          x={center}
          y={center - 5}
          fontSize={14}
          fontWeight="bold"
          fill="#1F2937"
          textAnchor="middle"
        >
          {methods.length}
        </SvgText>
        <SvgText
          x={center}
          y={center + 10}
          fontSize={9}
          fill="#6B7280"
          textAnchor="middle"
        >
          Méthodes
        </SvgText>
      </Svg>
    </View>
  );
};

// ============================================
// AGING CHART
// ============================================

interface AgingChartProps {
  data: OutstandingAgingBucket[];
}

const AgingChart: React.FC<AgingChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.totalValueFCFA), 1);

  const colors = ['#10B981', '#F59E0B', '#F97316', '#EF4444', '#991B1B'];

  return (
    <View style={styles.agingContainer}>
      {data.map((bucket, index) => {
        const percentage = (bucket.totalValueFCFA / maxValue) * 100;
        const color = colors[Math.min(index, colors.length - 1)];

        return (
          <View key={bucket.range} style={styles.agingItem}>
            <View style={styles.agingHeader}>
              <Text style={styles.agingRange}>{bucket.range}</Text>
              <Text style={styles.agingCount}>{bucket.count} factures</Text>
            </View>
            <View style={styles.agingBarContainer}>
              <View style={[styles.agingBarBackground, { flex: 1 }]}>
                <View
                  style={[
                    styles.agingBarFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.agingValue, { color }]}>
                {bucket.totalValueFCFA.toLocaleString('fr-FR')} FCFA
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const PaymentMetrics: React.FC<PaymentMetricsProps> = ({ data }) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toLocaleString('fr-FR');
  };

  const methodIcons: Record<string, string> = {
    ORANGE_MONEY: 'cellphone',
    WAVE: 'wave',
    CARD: 'credit-card',
    CASH: 'cash',
  };

  const methodColors: Record<string, string> = {
    ORANGE_MONEY: '#FF6600',
    WAVE: '#1E90FF',
    CARD: '#10B981',
    CASH: '#8B5CF6',
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Métriques de Paiement</Text>
          <View style={styles.collectionBadge}>
            <MaterialCommunityIcons name="cash-check" size={14} color="#10B981" />
            <Text style={styles.collectionText}>
              {data.summary.collectionRate.toFixed(1)}% collecté
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {[
            { key: 'overview' as ViewMode, label: 'Vue d\'ensemble', icon: 'view-dashboard' },
            { key: 'methods' as ViewMode, label: 'Méthodes', icon: 'credit-card' },
            { key: 'aging' as ViewMode, label: 'Ancienneté', icon: 'clock-alert' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                viewMode === tab.key && { backgroundColor: '#3B82F6' },
              ]}
              onPress={() => setViewMode(tab.key)}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={14}
                color={viewMode === tab.key ? '#FFFFFF' : '#6B7280'}
              />
              <Text
                style={[
                  styles.tabText,
                  viewMode === tab.key && { color: '#FFFFFF' },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview */}
        {viewMode === 'overview' && (
          <View style={styles.overviewContent}>
            <View style={styles.overviewRow}>
              {/* Collection Gauge */}
              <View style={styles.gaugeWrapper}>
                <CollectionGauge rate={data.summary.collectionRate} />
              </View>

              {/* Summary Stats */}
              <View style={styles.statsColumn}>
                <View style={styles.statBox}>
                  <MaterialCommunityIcons name="cash-plus" size={20} color="#10B981" />
                  <Text style={styles.statValue}>
                    {formatCurrency(data.summary.totalCollectedFCFA)}
                  </Text>
                  <Text style={styles.statLabel}>Collecté</Text>
                </View>
                <View style={styles.statBox}>
                  <MaterialCommunityIcons name="cash-minus" size={20} color="#EF4444" />
                  <Text style={styles.statValue}>
                    {formatCurrency(data.summary.totalOutstandingFCFA)}
                  </Text>
                  <Text style={styles.statLabel}>En attente</Text>
                </View>
              </View>
            </View>

            {/* Transaction Status */}
            <View style={styles.statusSection}>
              <Text style={styles.sectionTitle}>Statut des Transactions</Text>
              <View style={styles.statusGrid}>
                {data.transactionStatuses.map((status) => {
                  const colors: Record<string, string> = {
                    COMPLETED: '#10B981',
                    PENDING: '#F59E0B',
                    PROCESSING: '#3B82F6',
                    FAILED: '#EF4444',
                    REFUNDED: '#8B5CF6',
                    CANCELLED: '#6B7280',
                  };

                  return (
                    <View key={status.status} style={styles.statusItem}>
                      <View style={[styles.statusDot, { backgroundColor: colors[status.status] || '#6B7280' }]} />
                      <Text style={styles.statusLabel}>{status.status}</Text>
                      <Text style={styles.statusCount}>{status.count}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* Payment Methods */}
        {viewMode === 'methods' && (
          <View style={styles.methodsContent}>
            <View style={styles.methodsRow}>
              <PaymentMethodChart methods={data.paymentMethods} />
              
              <View style={styles.methodsList}>
                {data.paymentMethods.map((method) => (
                  <View key={method.method} style={styles.methodItem}>
                    <View style={[styles.methodIcon, { backgroundColor: methodColors[method.method] || '#6B7280' }]}>
                      <MaterialCommunityIcons
                        name={(methodIcons[method.method] || 'cash') as any}
                        size={14}
                        color="#FFFFFF"
                      />
                    </View>
                    <View style={styles.methodInfo}>
                      <Text style={styles.methodName}>{method.method.replace('_', ' ')}</Text>
                      <ProgressBar
                        progress={method.percentage / 100}
                        color={methodColors[method.method] || '#6B7280'}
                        style={styles.methodProgress}
                      />
                    </View>
                    <View style={styles.methodValues}>
                      <Text style={styles.methodPercentage}>{method.percentage.toFixed(0)}%</Text>
                      <Text style={styles.methodTotal}>
                        {formatCurrency(method.totalFCFA)} FCFA
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Aging */}
        {viewMode === 'aging' && (
          <View style={styles.agingContent}>
            <Text style={styles.agingTitle}>Ancienneté des Créances</Text>
            <AgingChart data={data.outstandingAging} />
          </View>
        )}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  collectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  collectionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  overviewContent: {
    gap: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    gap: 16,
  },
  gaugeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsColumn: {
    flex: 1,
    justifyContent: 'space-around',
  },
  statBox: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  statusSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  statusCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  methodsContent: {
    marginTop: 8,
  },
  methodsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  methodsList: {
    flex: 1,
    gap: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  methodIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  methodProgress: {
    height: 6,
    borderRadius: 3,
  },
  methodValues: {
    alignItems: 'flex-end',
  },
  methodPercentage: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  methodTotal: {
    fontSize: 10,
    color: '#6B7280',
  },
  agingContent: {
    marginTop: 8,
  },
  agingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  agingContainer: {
    gap: 12,
  },
  agingItem: {
    gap: 6,
  },
  agingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agingRange: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  agingCount: {
    fontSize: 11,
    color: '#6B7280',
  },
  agingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  agingBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  agingBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  agingValue: {
    fontSize: 11,
    fontWeight: '600',
    minWidth: 90,
    textAlign: 'right',
  },
});

export default PaymentMetrics;
