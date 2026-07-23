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

import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Modal, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useGetGoodsSummary } from '../../../hooks/useGoods';
import type { GoodsFilters } from '../../../types';
import type { ShippingMode } from '../../../hooks/useGoodsListFilters';
import { createStyles } from './GoodsStatsBottomSheet.styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
// Drag distance (px) past which releasing dismisses the sheet.
const DISMISS_DISTANCE = 110;
// Downward flick velocity (px/s) that dismisses regardless of distance.
const DISMISS_VELOCITY = 800;

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

// French labels for the per-status breakdown (mirrors GoodsFilterChips).
const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'En entrepôt',
  PACKED: 'Préparé',
  ASSIGNED_TO_CONTAINER: 'Assigné container',
  LOADED_IN_CONTAINER: 'Chargé container',
  IN_TRANSIT: 'En transit',
  ARRIVED_DESTINATION: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt retrait',
  DELIVERED: 'Livré',
  UNKNOWN: 'Autre',
};

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

  // Keep the Modal mounted through the exit animation: `render` trails `visible`.
  const [render, setRender] = useState(visible);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  // Measured sheet height — used to fully slide the card off-screen on dismiss.
  const sheetHeight = useSharedValue(SCREEN_HEIGHT * 0.6);

  const animateIn = useCallback(() => {
    translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    backdropOpacity.value = withTiming(1, { duration: 220 });
  }, [translateY, backdropOpacity]);

  const animateOut = useCallback(() => {
    backdropOpacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(sheetHeight.value + 40, { duration: 220 }, (finished) => {
      if (finished) runOnJS(setRender)(false);
    });
  }, [translateY, backdropOpacity, sheetHeight]);

  // Mount when the parent opens us.
  useEffect(() => {
    if (visible) setRender(true);
  }, [visible]);

  // Drive the entry/exit animations off the `visible` prop once mounted.
  useEffect(() => {
    if (!render) return;
    if (visible) animateIn();
    else animateOut();
  }, [visible, render, animateIn, animateOut]);

  // Drag the handle/header: follow the finger downward, snap back or dismiss on release.
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      if (event.translationY > DISMISS_DISTANCE || event.velocityY > DISMISS_VELOCITY) {
        runOnJS(onDismiss)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <Modal
      visible={render}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
    >
      <GestureHandlerRootView style={styles.root}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.backdrop, backdropStyle]}>
            <Pressable style={styles.backdropPressable} onPress={onDismiss} accessibilityLabel="Fermer" />
          </Animated.View>

          <Animated.View
            style={[styles.card, sheetStyle]}
            onLayout={(e) => {
              sheetHeight.value = e.nativeEvent.layout.height;
            }}
          >
            {/* Drag area: handle + header. Pulling down dismisses the sheet. */}
            <GestureDetector gesture={panGesture}>
              <View style={styles.dragArea}>
                <View style={styles.handle} />

                <View style={styles.header}>
                  <View style={styles.headerText}>
                    <Text style={styles.title}>{"Vue d'ensemble"}</Text>
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
              </View>
            </GestureDetector>

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

          {/* Per-status breakdown — quick glance at where the goods are. */}
          {summary?.byStatus && summary.byStatus.length > 0 && (
            <View style={styles.breakdown}>
              <Text style={styles.breakdownTitle}>Répartition par statut</Text>
              <ScrollView style={styles.breakdownScroll} showsVerticalScrollIndicator={false}>
                {summary.byStatus.map((bucket) => (
                  <View key={bucket.status} style={styles.breakdownRow}>
                    <View style={styles.breakdownLabelWrap}>
                      <View style={[styles.breakdownDot, { backgroundColor: colors.primary.main }]} />
                      <Text style={styles.breakdownLabel} numberOfLines={1}>
                        {STATUS_LABELS[bucket.status] ?? bucket.status}
                      </Text>
                    </View>
                    <Text style={styles.breakdownMeta}>
                      {formatCount(bucket.count)} · {formatVolume(bucket.totalCBM)} · {formatWeight(bucket.totalWeight)}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Hint when filters are narrowing — helps the operator interpret the numbers */}
          {summary && hasActiveFilters && (
            <Text style={styles.footnote}>
              {"Ces totaux ne reflètent que les marchandises correspondant aux filtres actifs. Effacez les filtres pour voir l'entrepôt complet."}
            </Text>
          )}
          </Animated.View>
        </View>
      </GestureHandlerRootView>
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
