/* Hallmark · genre: modern-minimal · macrostructure: Operations command surface · designed-as-app */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';
import { AdminLoadingListData } from '../../types/packingList';

type AppColors = ThemeContextType['colors'];

interface LoadingListCommandPanelProps {
  summary: AdminLoadingListData['summary'];
  progressPercentage: number;
  maxCBM: number;
}

export const LoadingListCommandPanel: React.FC<LoadingListCommandPanelProps> = ({
  summary,
  progressPercentage,
  maxCBM,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const totalArticles = summary.totalPackages || summary.totalItems;
  const remainingCBM = Math.max(0, summary.remainingCBM);

  return (
    <View style={styles.panel}>
      <View style={styles.heroRow}>
        <View style={styles.progressCopy}>
          <Text style={styles.eyebrow}>Chargement</Text>
          <Text style={styles.progressValue}>{progressPercentage.toFixed(0)}%</Text>
          <Text style={styles.meta}>
            {summary.loadedItems}/{summary.totalItems} colis chargés · {totalArticles} articles
          </Text>
        </View>
        <View style={styles.pendingBox}>
          <Text style={styles.pendingValue}>{summary.remainingItems}</Text>
          <Text style={styles.pendingLabel}>à charger</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(progressPercentage, 100)}%` }]} />
      </View>

      <View style={styles.metrics}>
        <Metric icon="cube-outline" label="CBM chargé" value={summary.loadedCBM.toFixed(2)} styles={styles} />
        <Metric icon="archive-outline" label="CBM restant" value={remainingCBM.toFixed(2)} styles={styles} />
        <Metric icon="speedometer-outline" label="Capacité" value={`${((summary.totalCBM / maxCBM) * 100).toFixed(0)}%`} styles={styles} />
      </View>
    </View>
  );
};

const Metric = ({
  icon,
  label,
  value,
  styles,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  styles: ReturnType<typeof createStyles>;
}) => (
  <View style={styles.metric}>
    <Ionicons name={icon} size={15} color={Theme.neutral[500]} />
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const createStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  panel: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: isDark ? colors.neutral[700] : colors.neutral[200],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.sm,
  },
  heroRow: { flexDirection: 'row', alignItems: 'stretch', gap: Theme.spacing.md },
  progressCopy: { flex: 1, minWidth: 0 },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.status.warning,
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  progressValue: {
    marginTop: 2,
    fontSize: 32,
    fontWeight: '900',
    color: colors.text.primary,
  },
  meta: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  pendingBox: {
    minWidth: 94,
    borderRadius: Theme.radius.lg,
    backgroundColor: isDark ? colors.neutral[800] : colors.feedback.warningBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.sm,
  },
  pendingValue: { fontSize: 24, fontWeight: '900', color: colors.feedback.warningDark },
  pendingLabel: { fontSize: 11, fontWeight: '800', color: colors.feedback.warningDark },
  progressTrack: {
    height: Theme.spacing.sm,
    borderRadius: Theme.radius.full,
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    overflow: 'hidden',
    marginTop: Theme.spacing.lg,
  },
  progressFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
    backgroundColor: colors.status.warning,
  },
  metrics: { flexDirection: 'row', gap: Theme.spacing.sm, marginTop: Theme.spacing.md },
  metric: {
    flex: 1,
    minWidth: 0,
    borderRadius: Theme.radius.sm,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: isDark ? colors.neutral[800] : colors.neutral[50],
    alignItems: 'center',
    gap: 2,
  },
  metricValue: { fontSize: 13, fontWeight: '900', color: colors.text.primary },
  metricLabel: { fontSize: 10, fontWeight: '700', color: colors.text.secondary },
});
