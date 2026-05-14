import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { LoadingSummary } from '../types';
import { Theme } from '@src/constants/Theme';

interface ProgressCardProps {
  summary: LoadingSummary;
  progressPercentage: number;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  summary,
  progressPercentage,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <View style={styles.progressTitleContainer}>
          <Ionicons name="timer" size={20} color={Theme.colors.status.warning} />
          <Text style={styles.progressTitle}>Progression</Text>
        </View>
        <Text style={styles.progressValue}>
          {summary.loadedItems} <Text style={styles.progressTotal}>/ {summary.totalItems}</Text>
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <LinearGradient
            colors={[Theme.colors.status.warning, Theme.colors.status.warning]}
            style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
        <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}%</Text>
      </View>

      <View style={styles.progressStats}>
        <View style={styles.progressStat}>
          <Ionicons name="checkmark-circle" size={16} color={Theme.status.success} />
          <Text style={styles.progressStatText}>
            {summary.loadedCBM.toFixed(2)} m³ chargé
          </Text>
        </View>
        <View style={styles.progressStat}>
          <Ionicons name="time" size={16} color={Theme.neutral[400]} />
          <Text style={styles.progressStatText}>
            {summary.remainingCBM.toFixed(2)} m³ restant
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  progressTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  progressValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D97706',
  },
  progressTotal: {
    fontSize: 16,
    fontWeight: '500',
    color: Theme.neutral[400],
  },
  progressBarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  progressBarBackground: {
    height: 28,
    backgroundColor: Theme.colors.status.warning + '15',
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  progressPercentage: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 13,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressStatText: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
});
