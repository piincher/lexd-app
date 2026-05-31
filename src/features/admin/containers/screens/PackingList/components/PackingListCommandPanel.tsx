/* Hallmark · genre: modern-minimal · macrostructure: Operations command surface · designed-as-app */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CapacityUsageBar } from '../../../components/CapacityUsageBar';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme, type ThemeContextType } from '@src/constants/Theme';
import { ClientGoodsGroup, ContainerSummary } from '../../../types/packingList';

type AppColors = ThemeContextType['colors'];

interface PackingListCommandPanelProps {
  allClients: ClientGoodsGroup[];
  clients: ClientGoodsGroup[];
  selectedClientId: string | null;
  summary: ContainerSummary;
}

export const PackingListCommandPanel: React.FC<PackingListCommandPanelProps> = ({
  allClients,
  clients,
  selectedClientId,
  summary,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const isSingleClient = Boolean(selectedClientId && clients.length === 1);
  const scopeLabel = isSingleClient ? clients[0].clientName : 'Container complet';
  const totalArticles = summary.totalQuantity || summary.totalPackages || 0;

  return (
    <View style={styles.panel}>
      <View style={styles.heroRow}>
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>Liste de colisage</Text>
          <Text style={styles.scope} numberOfLines={1}>{scopeLabel}</Text>
          <Text style={styles.meta}>
            {isSingleClient ? 'Vue client' : `${allClients.length} clients`} · {summary.totalItems} colis
          </Text>
        </View>
        <View style={styles.articleHero}>
          <Text style={styles.articleValue}>{totalArticles}</Text>
          <Text style={styles.articleLabel}>articles</Text>
        </View>
      </View>

      <View style={styles.capacityBlock}>
        <View style={styles.capacityHeader}>
          <Ionicons name="cube-outline" size={17} color={colors.primary[600]} />
          <Text style={styles.capacityTitle}>Capacité container</Text>
          <Text style={styles.capacityMeta}>{summary.totalCBM.toFixed(2)} m³</Text>
        </View>
        <CapacityUsageBar
          used={summary.totalCBM}
          max={summary.maxCBM || 67}
          unit="m³"
          showPercentage
          showLabels
          height={24}
          variant="cbm"
        />
      </View>

      <View style={styles.metrics}>
        <Metric label="Clients" value={isSingleClient ? 1 : allClients.length} styles={styles} />
        <Metric label="Colis" value={summary.totalItems} styles={styles} />
        <Metric label="Poids" value={`${summary.totalWeight.toFixed(0)} kg`} styles={styles} />
      </View>
    </View>
  );
};

const Metric = ({ label, value, styles }: {
  label: string; value: string | number; styles: ReturnType<typeof createStyles>;
}) => (
  <View style={styles.metric}>
    <Text style={styles.metricValue} numberOfLines={1}>{value}</Text>
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
  heroRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Theme.spacing.md,
  },
  heroCopy: { flex: 1, minWidth: 0 },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary[600],
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  scope: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '900',
    color: colors.text.primary,
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  articleHero: {
    minWidth: 92,
    borderRadius: Theme.radius.lg,
    backgroundColor: isDark ? colors.neutral[200] : colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.sm,
  },
  articleValue: { fontSize: 24, fontWeight: '900', color: colors.primary[700] },
  articleLabel: { fontSize: 11, fontWeight: '800', color: colors.primary[700] },
  capacityBlock: { marginTop: Theme.spacing.lg },
  capacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  capacityTitle: { flex: 1, fontSize: 13, fontWeight: '800', color: colors.text.primary },
  capacityMeta: { fontSize: 12, fontWeight: '800', color: colors.text.secondary },
  metrics: { flexDirection: 'row', gap: Theme.spacing.sm, marginTop: Theme.spacing.md },
  metric: {
    flex: 1,
    minWidth: 0,
    borderRadius: Theme.radius.sm,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: isDark ? colors.neutral[200] : colors.neutral[50],
    alignItems: 'center',
  },
  metricValue: { fontSize: 14, fontWeight: '900', color: colors.text.primary },
  metricLabel: { marginTop: 2, fontSize: 11, fontWeight: '700', color: colors.text.secondary },
});
