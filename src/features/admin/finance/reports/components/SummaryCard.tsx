/**
 * SummaryCard Component
 * Financial summary card with trend indicator
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  trend?: number;
  trendLabel?: string;
  gradientColors?: readonly [string, string, string];
  currency?: boolean;
  compact?: boolean;
  onPress?: () => void;
}

const defaultGradients = {
  revenue: ['#10B981', '#059669', '#047857'] as const,
  expenses: ['#EF4444', '#DC2626', '#B91C1C'] as const,
  profit: ['#3B82F6', '#2563EB', '#1D4ED8'] as const,
  warning: ['#F59E0B', '#D97706', '#B45309'] as const,
  neutral: ['#6B7280', '#4B5563', '#374151'] as const,
  primary: ['#8B5CF6', '#7C3AED', '#6D28D9'] as const,
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  icon,
  trend,
  trendLabel,
  gradientColors = defaultGradients.primary,
  currency = true,
  compact = false,
  onPress,
}) => {
  const theme = useTheme();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: currency ? 'currency' : 'decimal',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTrendIcon = (value: number): keyof typeof MaterialCommunityIcons.glyphMap => {
    if (value > 0) return 'trending-up';
    if (value < 0) return 'trending-down';
    return 'trending-neutral';
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return '#10B981';
    if (value < 0) return '#EF4444';
    return '#6B7280';
  };

  return (
    <View style={[styles.container, compact && styles.compact]}>
      <LinearGradient
        colors={[...gradientColors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={icon} size={24} color="#FFFFFF" />
            </View>
            {trend !== undefined && (
              <View style={styles.trendContainer}>
                <MaterialCommunityIcons
                  name={getTrendIcon(trend)}
                  size={14}
                  color={getTrendColor(trend)}
                />
                <Text style={[styles.trendText, { color: getTrendColor(trend) }]}>
                  {trend > 0 ? '+' : ''}{(trend || 0).toFixed(1)}%
                </Text>
              </View>
            )}
          </View>

          <View style={styles.body}>
            <Text style={styles.amount} numberOfLines={1}>
              {formatCurrency(amount)}
            </Text>
            <Text style={styles.title}>{title}</Text>
          </View>

          {trendLabel && (
            <Text style={styles.trendLabel}>{trendLabel}</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 140,
    flex: 1,
  },
  compact: {
    minHeight: 100,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    marginTop: 12,
  },
  amount: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  trendLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
  },
});

export default SummaryCard;
