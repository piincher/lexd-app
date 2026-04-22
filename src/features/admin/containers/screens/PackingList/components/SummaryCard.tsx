import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { ContainerSummary } from '../../../types/packingList';

interface SummaryCardProps {
  summary: ContainerSummary;
  formatDate: (date: Date | string) => string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary, formatDate }) => {
  return (
    <Animated.View entering={FadeInUp.delay(300)} style={styles.summaryCard}>
      <LinearGradient
        colors={[Theme.primary[50], '#FFFFFF']}
        style={styles.summaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.summaryHeader}>
          <Ionicons name="document-text" size={20} color={Theme.primary[600]} />
          <Text style={styles.summaryTitle}>Récapitulatif</Text>
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemValue}>{summary.totalItems}</Text>
            <Text style={styles.summaryItemLabel}>Total Colis</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemValue}>{summary.totalPackages}</Text>
            <Text style={styles.summaryItemLabel}>Total Articles</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemValue}>{summary.totalCBM.toFixed(2)}</Text>
            <Text style={styles.summaryItemLabel}>Volume (m³)</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryItemValue}>{summary.totalWeight.toFixed(0)}</Text>
            <Text style={styles.summaryItemLabel}>Poids (kg)</Text>
          </View>
        </View>

        <View style={styles.summaryFooter}>
          <Text style={styles.summaryFooterText}>
            Généré le {formatDate(new Date())}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  summaryCard: {
    marginTop: Theme.spacing.lg,
    borderRadius: Theme.radius['2xl'],
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  summaryGradient: {
    padding: Theme.spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.primary[700],
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  summaryItem: {
    flex: 1,
    minWidth: 80,
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.lg,
  },
  summaryItemValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  summaryItemLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.xs,
  },
  summaryFooter: {
    marginTop: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.primary[100],
  },
  summaryFooterText: {
    fontSize: 12,
    color: Theme.neutral[400],
    textAlign: 'center',
  },
});
