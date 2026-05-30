/**
 * GoodsStatsBottomSheet — Warehouse overview totals for the current filter set.
 *
 * Operators tap the stats icon in the goods list header → this sheet opens →
 * shows count, total weight (kg), total volume (m³) across ALL goods matching
 * the on-screen filters (not just the current page). Filter-aware: the sub-
 * header tells the operator whether they're seeing filtered or unfiltered
 * totals so they don't misread a low count as "warehouse is empty".
 *
 * Lifecycle: the React Query hook fires only when `visible` flips to true
 * (the parent controls the enabled flag) so we don't run the aggregation on
 * every screen mount.
 */

import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Text, Card, ActivityIndicator, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetGoodsSummary } from '../../../hooks/useGoods';
import type { GoodsFilters } from '../../../types';
import type { ShippingMode } from '../../../hooks/useGoodsListFilters';
import { createStyles } from './GoodsStatsBottomSheet.styles';

interface GoodsStatsBottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  filters: GoodsFilters;
  /** True when any user-applied filter (search/client/date/quick) narrows the view. */
  hasActiveFilters: boolean;
  /** Current shipping mode — surfaced in the sub-header so the operator sees the scope. */
  mode: ShippingMode;
}

// French digit grouping (e.g., "12 345") — no decimals for whole counts.
const formatCount = (n: number) => n.toLocaleString('fr-FR');

// kg with up to 1 decimal — warehouse weight precision doesn't need more.
const formatWeight = (kg: number) =>
  `${kg.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} kg`;

// m³ with up to 3 decimals to match the backend's rounding.
const formatVolume = (cbm: number) =>
  `${cbm.toLocaleString('fr-FR', { maximumFractionDigits: 3 })} m³`;

export const GoodsStatsBottomSheet: React.FC<GoodsStatsBottomSheetProps> = ({
  visible,
  onDismiss,
  filters,
  hasActiveFilters,
  mode,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  // `enabled: visible` keeps the aggregation off until the sheet is opened.
  // Once enabled, React Query handles caching with the 30s staleTime in the hook.
  const { data, isLoading, isError, refetch, isRefetching } = useGetGoodsSummary(filters, {
    enabled: visible,
  });

  const summary = data?.data;

  const modeLabel = mode === 'AIR' ? 'Aérien' : 'Maritime';
  const scopeLabel = hasActiveFilters
    ? `Filtres actifs · ${modeLabel}`
    : `Tout l'entrepôt · ${modeLabel}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <Card style={styles.card}>
          {/* Pull handle for visual affordance — matches OS bottom-sheet expectations */}
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.title}>Vue d'ensemble</Text>
              <Text style={styles.subtitle}>{scopeLabel}</Text>
            </View>
            <TouchableOpacity
              onPress={onDismiss}
              style={styles.closeButton}
              accessibilityLabel="Fermer"
            >
              <Ionicons name="close" size={22} color={colors.neutral[600]} />
            </TouchableOpacity>
          </View>

          {/* States: loading / error / data. Each one full-width inside the card. */}
          {isLoading && !data && (
            <View style={styles.stateBlock}>
              <ActivityIndicator size="large" color={colors.primary.main} />
              <Text style={styles.stateText}>Calcul des totaux…</Text>
            </View>
          )}

          {isError && !isLoading && (
            <View style={styles.stateBlock}>
              <Ionicons name="alert-circle" size={40} color={colors.status.error} />
              <Text style={styles.stateText}>
                Impossible de calculer les totaux. Vérifiez votre connexion.
              </Text>
              <Button
                mode="contained"
                onPress={() => refetch()}
                loading={isRefetching}
                style={styles.retryButton}
              >
                Réessayer
              </Button>
            </View>
          )}

          {summary && !isError && (
            <View style={styles.metricsGrid}>
              <MetricCard
                icon="cube-outline"
                accent={colors.primary.main}
                label="Marchandises"
                value={formatCount(summary.count)}
                styles={styles}
              />
              <MetricCard
                icon="barbell-outline"
                accent={colors.status.warning}
                label="Poids total"
                value={formatWeight(summary.totalWeight)}
                styles={styles}
              />
              <MetricCard
                icon="resize-outline"
                accent={colors.status.info ?? colors.primary.main}
                label="Volume total"
                value={formatVolume(summary.totalCBM)}
                styles={styles}
              />
            </View>
          )}

          {/* Hint when filters are narrowing — helps the operator interpret the numbers */}
          {summary && hasActiveFilters && (
            <Text style={styles.footnote}>
              Ces totaux ne reflètent que les marchandises correspondant aux filtres actifs.
              Effacez les filtres pour voir l'entrepôt complet.
            </Text>
          )}
        </Card>
      </View>
    </Modal>
  );
};

interface MetricCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  label: string;
  value: string;
  styles: ReturnType<typeof createStyles>;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, accent, label, value, styles }) => (
  <View style={styles.metricCard}>
    <View style={[styles.metricIconWrap, { backgroundColor: accent + '18' }]}>
      <Ionicons name={icon} size={22} color={accent} />
    </View>
    <Text style={styles.metricValue} numberOfLines={1} adjustsFontSizeToFit>
      {value}
    </Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

export default GoodsStatsBottomSheet;
