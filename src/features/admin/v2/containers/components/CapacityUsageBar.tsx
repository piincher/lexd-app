/**
 * CapacityUsageBar - Visual capacity indicator component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

interface CapacityUsageBarProps {
  used: number;
  max: number;
  unit?: string;
  showPercentage?: boolean;
  showLabels?: boolean;
  height?: number;
  variant?: 'cbm' | 'weight' | 'items';
}

const MAX_CBM = 67; // Standard 40ft container

export const CapacityUsageBar: React.FC<CapacityUsageBarProps> = ({
  used,
  max = MAX_CBM,
  unit = 'm³',
  showPercentage = true,
  showLabels = true,
  height = 24,
  variant = 'cbm',
}) => {
  const percentage = Math.min((used / max) * 100, 100);
  const remaining = Math.max(max - used, 0);

  const getFillColor = (pct: number): [string, string] => {
    if (pct >= 90) return [Theme.status.error, '#EF4444'];
    if (pct >= 70) return [Theme.status.warning, '#FBBF24'];
    return [Theme.status.success, '#34D399'];
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'weight':
        return '⚖️';
      case 'items':
        return '📦';
      default:
        return '📐';
    }
  };

  const fillColors = getFillColor(percentage);

  return (
    <View style={styles.container}>
      {showLabels && (
        <View style={styles.header}>
          <View style={styles.labelContainer}>
            <Text style={styles.icon}>{getVariantIcon()}</Text>
            <Text style={styles.label}>
              {variant === 'cbm' ? 'Volume' : variant === 'weight' ? 'Poids' : 'Articles'}
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={[styles.usedValue, { color: fillColors[0] }]}>
              {used.toFixed(2)} {unit}
            </Text>
            <Text style={styles.separator}> / </Text>
            <Text style={styles.maxValue}>
              {max.toFixed(0)} {unit}
            </Text>
          </View>
        </View>
      )}

      <View style={[styles.barContainer, { height }]}>
        <View style={styles.backgroundBar}>
          <LinearGradient
            colors={['#F3F4F6', '#E5E7EB']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
        
        <View style={[styles.fillBar, { width: `${percentage}%` }]}>
          <LinearGradient
            colors={fillColors}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>

        {showPercentage && (
          <View style={styles.percentageOverlay}>
            <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
          </View>
        )}
      </View>

      {showLabels && (
        <View style={styles.footer}>
          <Text style={styles.remainingText}>
            {remaining.toFixed(2)} {unit} disponible
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: `${fillColors[0]}20` }]}>
            <View style={[styles.statusDot, { backgroundColor: fillColors[0] }]} />
            <Text style={[styles.statusText, { color: fillColors[0] }]}>
              {percentage >= 90 ? 'Critique' : percentage >= 70 ? 'Attention' : 'Optimal'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usedValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    fontSize: 13,
    color: Theme.neutral[400],
  },
  maxValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  barContainer: {
    width: '100%',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundBar: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Theme.radius.full,
  },
  fillBar: {
    height: '100%',
    borderRadius: Theme.radius.full,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  percentageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.neutral[800],
    textShadowColor: 'rgba(255,255,255,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  remainingText: {
    fontSize: 12,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default CapacityUsageBar;
