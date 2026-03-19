/**
 * Goods Volume Chart
 * Stacked bar chart for goods volume by category and status
 */

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme, Chip } from 'react-native-paper';
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VolumeByStatus, VolumeByShippingMode, DailyVolumePoint } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// TYPES
// ============================================

interface GoodsVolumeChartProps {
  byStatus: VolumeByStatus[];
  byShippingMode: VolumeByShippingMode[];
  dailyTrend: DailyVolumePoint[];
  summary: {
    totalGoods: number;
    totalCBM: number;
    totalValue: number;
    totalValueFCFA: number;
  };
}

type ViewMode = 'status' | 'shipping' | 'trend';

// ============================================
// STATUS CONFIG
// ============================================

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  RECEIVED_AT_WAREHOUSE: { label: 'Reçu', color: '#3B82F6', icon: 'warehouse' },
  ASSIGNED_TO_CONTAINER: { label: 'Assigné', color: '#8B5CF6', icon: 'package-variant-closed' },
  LOADED_IN_CONTAINER: { label: 'Chargé', color: '#F59E0B', icon: 'truck-delivery' },
  IN_TRANSIT: { label: 'En Transit', color: '#06B6D4', icon: 'ferry' },
  ARRIVED_DESTINATION: { label: 'Arrivé', color: '#10B981', icon: 'map-marker-check' },
  READY_FOR_PICKUP: { label: 'À Retirer', color: '#EC4899', icon: 'clock-outline' },
  DELIVERED: { label: 'Livré', color: '#22C55E', icon: 'check-circle' },
};

// ============================================
// STACKED BAR CHART COMPONENT
// ============================================

interface StackedBarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  total: number;
  width?: number;
  height?: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  total,
  width = SCREEN_WIDTH - 80,
  height = 30,
}) => {
  let currentX = 0;

  return (
    <Svg width={width} height={height}>
      {data.map((item, index) => {
        const barWidth = (item.value / total) * width;
        const x = currentX;
        currentX += barWidth;

        return (
          <G key={index}>
            <Rect
              x={x}
              y={0}
              width={barWidth}
              height={height}
              fill={item.color}
              rx={index === 0 ? 4 : 0}
              ry={index === 0 ? 4 : 0}
            />
            {barWidth > 40 && (
              <SvgText
                x={x + barWidth / 2}
                y={height / 2 + 4}
                fontSize={10}
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="600"
              >
                {item.value}
              </SvgText>
            )}
          </G>
        );
      })}
    </Svg>
  );
};

// ============================================
// TREND CHART COMPONENT
// ============================================

interface TrendChartProps {
  data: DailyVolumePoint[];
  width?: number;
  height?: number;
}

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  width = SCREEN_WIDTH - 80,
  height = 150,
}) => {
  const padding = { top: 10, right: 10, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.count), 1);

  const getX = (index: number) =>
    padding.left + (index / (data.length - 1)) * chartWidth;

  const getY = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  // Show every Nth label based on data length
  const labelStep = Math.max(1, Math.floor(data.length / 5));

  return (
    <Svg width={width} height={height}>
      {/* Grid lines */}
      {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((value, index) => {
        const y = getY(value);
        return (
          <G key={`grid-${index}`}>
            <Rect
              x={padding.left}
              y={y}
              width={chartWidth}
              height={1}
              fill="#E5E7EB"
            />
            <SvgText
              x={padding.left - 5}
              y={y + 4}
              fontSize={9}
              fill="#6B7280"
              textAnchor="end"
            >
              {Math.round(value)}
            </SvgText>
          </G>
        );
      })}

      {/* Bars */}
      {data.map((point, index) => {
        const barWidth = chartWidth / data.length * 0.7;
        const x = getX(index) - barWidth / 2;
        const barHeight = chartHeight - getY(point.count) + padding.top;
        const y = getY(point.count);

        return (
          <G key={`bar-${index}`}>
            <Rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#3B82F6"
              rx={2}
            />
            {(index % labelStep === 0 || index === data.length - 1) && (
              <SvgText
                x={getX(index)}
                y={height - 5}
                fontSize={9}
                fill="#6B7280"
                textAnchor="middle"
              >
                {new Date(point.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              </SvgText>
            )}
          </G>
        );
      })}
    </Svg>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const GoodsVolumeChart: React.FC<GoodsVolumeChartProps> = ({
  byStatus,
  byShippingMode,
  dailyTrend,
  summary,
}) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>('status');

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount.toLocaleString('fr-FR');
  };

  // Prepare data for stacked bar chart
  const statusChartData = byStatus
    .filter((s) => s.count > 0)
    .map((s) => ({
      label: statusConfig[s.status]?.label || s.status,
      value: s.count,
      color: statusConfig[s.status]?.color || '#6B7280',
    }))
    .sort((a, b) => b.value - a.value);

  const shippingModeColors: Record<string, string> = {
    SEA: '#1E40AF',
    AIR: '#7C3AED',
    UNASSIGNED: '#9CA3AF',
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Volume de Marchandises</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="package-variant" size={16} color="#3B82F6" />
              <Text style={styles.summaryValue}>{formatNumber(summary.totalGoods)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="cube-outline" size={16} color="#10B981" />
              <Text style={styles.summaryValue}>{summary.totalCBM.toFixed(1)} CBM</Text>
            </View>
          </View>
        </View>

        {/* View Mode Tabs */}
        <View style={styles.tabsContainer}>
          {[
            { key: 'status' as ViewMode, label: 'Statut', icon: 'tag-outline' },
            { key: 'shipping' as ViewMode, label: 'Transport', icon: 'ferry' },
            { key: 'trend' as ViewMode, label: 'Tendance', icon: 'chart-line' },
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

        {/* Content based on view mode */}
        {viewMode === 'status' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Répartition par Statut</Text>
            
            {/* Stacked Bar */}
            <View style={styles.stackedBarContainer}>
              <StackedBarChart
                data={statusChartData}
                total={summary.totalGoods}
              />
            </View>

            {/* Legend */}
            <View style={styles.legendGrid}>
              {byStatus
                .filter((s) => s.count > 0)
                .sort((a, b) => b.count - a.count)
                .map((status) => {
                  const config = statusConfig[status.status];
                  const percentage = (status.count / summary.totalGoods) * 100;

                  return (
                    <View key={status.status} style={styles.legendItem}>
                      <View style={styles.legendHeader}>
                        <View style={[styles.legendDot, { backgroundColor: config?.color || '#6B7280' }]} />
                        <Text style={styles.legendLabel}>{config?.label || status.status}</Text>
                        <Text style={styles.legendValue}>{status.count}</Text>
                      </View>
                      <View style={styles.legendDetails}>
                        <Text style={styles.legendDetail}>
                          {percentage.toFixed(1)}% • {status.totalCBM.toFixed(1)} CBM
                        </Text>
                        <Text style={styles.legendValue}>
                          {formatCurrency(status.totalValueFCFA)} FCFA
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        )}

        {viewMode === 'shipping' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Par Mode de Transport</Text>
            
            {byShippingMode.map((mode) => {
              const color = shippingModeColors[mode.shippingMode] || '#6B7280';
              const icon = mode.shippingMode === 'AIR' ? 'airplane' : mode.shippingMode === 'SEA' ? 'ferry' : 'help-circle';

              return (
                <View key={mode.shippingMode} style={styles.shippingItem}>
                  <View style={styles.shippingHeader}>
                    <View style={[styles.shippingIcon, { backgroundColor: color }]}>
                      <MaterialCommunityIcons name={icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <View style={styles.shippingInfo}>
                      <Text style={styles.shippingLabel}>
                        {mode.shippingMode === 'UNASSIGNED' ? 'Non assigné' : mode.shippingMode}
                      </Text>
                      <Text style={styles.shippingCount}>{mode.count} marchandises</Text>
                    </View>
                    <Text style={styles.shippingValue}>
                      {formatCurrency(mode.totalValueFCFA)} FCFA
                    </Text>
                  </View>
                  <View style={styles.shippingBarContainer}>
                    <View style={styles.shippingBarBackground}>
                      <View
                        style={[
                          styles.shippingBarFill,
                          {
                            width: `${Math.min((mode.count / summary.totalGoods) * 100 * 2, 100)}%`,
                            backgroundColor: color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.shippingCBM}>{mode.totalCBM.toFixed(1)} CBM</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {viewMode === 'trend' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Tendance Journalière</Text>
            
            {dailyTrend.length > 0 ? (
              <View>
                <TrendChart data={dailyTrend} />
                <View style={styles.trendSummary}>
                  <View style={styles.trendItem}>
                    <Text style={styles.trendLabel}>Moyenne/jour</Text>
                    <Text style={styles.trendValue}>
                      {(summary.totalGoods / dailyTrend.length).toFixed(0)} march.
                    </Text>
                  </View>
                  <View style={styles.trendItem}>
                    <Text style={styles.trendLabel}>Peak</Text>
                    <Text style={styles.trendValue}>
                      {Math.max(...dailyTrend.map((d) => d.count))} march.
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.noData}>Pas assez de données</Text>
            )}
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
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
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
  content: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  stackedBarContainer: {
    marginVertical: 12,
  },
  legendGrid: {
    gap: 10,
    marginTop: 8,
  },
  legendItem: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  legendValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  legendDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingLeft: 18,
  },
  legendDetail: {
    fontSize: 11,
    color: '#6B7280',
  },
  shippingItem: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  shippingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shippingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  shippingCount: {
    fontSize: 11,
    color: '#6B7280',
  },
  shippingValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  shippingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    paddingLeft: 42,
  },
  shippingBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  shippingBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  shippingCBM: {
    fontSize: 11,
    color: '#6B7280',
    minWidth: 60,
    textAlign: 'right',
  },
  trendSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  trendItem: {
    alignItems: 'center',
  },
  trendLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  trendValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 2,
  },
  noData: {
    textAlign: 'center',
    color: '#6B7280',
    paddingVertical: 20,
  },
});

export default GoodsVolumeChart;
