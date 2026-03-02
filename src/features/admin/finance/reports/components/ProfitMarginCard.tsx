/**
 * ProfitMarginCard Component
 * Visual indicator for profit margin
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfitMarginCardProps {
  margin: number;
  revenue: number;
  profit: number;
  size?: 'small' | 'medium' | 'large';
}

const getMarginColor = (margin: number): readonly [string, string, string] => {
  if (margin >= 30) return ['#10B981', '#059669', '#047857'] as const;
  if (margin >= 15) return ['#3B82F6', '#2563EB', '#1D4ED8'] as const;
  if (margin >= 5) return ['#F59E0B', '#D97706', '#B45309'] as const;
  return ['#EF4444', '#DC2626', '#B91C1C'] as const;
};

const getMarginLabel = (margin: number): string => {
  if (margin >= 30) return 'Excellente';
  if (margin >= 15) return 'Bonne';
  if (margin >= 5) return 'Moyenne';
  return 'Faible';
};

const getMarginIcon = (margin: number): keyof typeof MaterialCommunityIcons.glyphMap => {
  if (margin >= 30) return 'trending-up';
  if (margin >= 15) return 'chart-line';
  if (margin >= 5) return 'minus';
  return 'trending-down';
};

export const ProfitMarginCard: React.FC<ProfitMarginCardProps> = ({
  margin: marginProp,
  revenue,
  profit,
  size = 'medium',
}) => {
  const margin = marginProp ?? 0;
  const theme = useTheme();
  const colors = getMarginColor(margin);
  const label = getMarginLabel(margin);
  const icon = getMarginIcon(margin);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sizeStyles = {
    small: { height: 100, iconSize: 24, fontSize: 24 },
    medium: { height: 140, iconSize: 32, fontSize: 36 },
    large: { height: 180, iconSize: 40, fontSize: 48 },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={[styles.container, { height: currentSize.height }]}>
      <LinearGradient
        colors={[...colors] as [string, string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <MaterialCommunityIcons
              name={icon}
              size={currentSize.iconSize}
              color="#FFFFFF"
            />
            <View style={styles.labelBadge}>
              <Text style={styles.labelText}>{label}</Text>
            </View>
          </View>

          <View style={styles.marginSection}>
            <Text style={[styles.marginValue, { fontSize: currentSize.fontSize }]}>
              {margin.toFixed(1)}%
            </Text>
            <Text style={styles.marginLabel}>Marge Bénéficiaire</Text>
          </View>

          {size !== 'small' && (
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Revenus</Text>
                <Text style={styles.detailValue}>{formatCurrency(revenue)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Bénéfice</Text>
                <Text style={styles.detailValue}>{formatCurrency(profit)}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Progress ring indicator */}
        <View style={styles.progressRing}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(margin, 100)}%`,
                backgroundColor: 'rgba(255,255,255,0.3)',
              },
            ]}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
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
  labelBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  marginSection: {
    alignItems: 'center',
  },
  marginValue: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  marginLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressRing: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});

export default ProfitMarginCard;
