/**
 * CargoBagDetailScreen - Detail view of a cargo bag with assigned goods.
 *
 * Redesigned to mirror the Airway Bill screen: a gradient identity hero,
 * KPI grid, and a segmented Itinéraire / Marchandises split so the bag's
 * status, journey, and contents are each clear and never crammed together.
 */

import React, { useState } from 'react';
import { ScrollView, RefreshControl, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useCargoBagDetail } from '../hooks/useCargoBagDetail';
import { CargoBagDetailSkeleton } from './components/CargoBagDetailSkeleton';
import { CargoBagDetailGoodsList } from './components/CargoBagDetailGoodsList';
import { CargoBagDetailFooter } from './components/CargoBagDetailFooter';
import { CargoBagStatusMenu } from './components/CargoBagStatusMenu';
import { AirwayBillWaypointTimeline } from './components/AirwayBillWaypointTimeline';
import { ShipmentHero, type HeroMetaChip } from './components/ShipmentHero';
import { ShipmentKpiGrid, type KpiItem } from './components/ShipmentKpiGrid';
import { SegmentTabs, type SegmentTab } from './components/SegmentTabs';
import { CARGO_BAG_STATUS_CONFIG, CARGO_BAG_STATUS_LABELS } from '../constants';
import { styles } from './CargoBagDetailScreen.styles';

const formatDate = (date?: string | null) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

type TabKey = 'itinerary' | 'goods';

export const CargoBagDetailScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const [tab, setTab] = useState<TabKey>('itinerary');
  const {
    cargoBag, waypointPayload, goodsList, isLoading, isRefreshing, handleRefresh, handleBack,
    statusMenuVisible, setStatusMenuVisible, handleChangeStatus, removeMode,
    selectedRemoveIds, handleToggleRemoveMode, handleToggleRemoveSelection,
    handleConfirmRemove, handleAddGoods, handleDeleteBag, handleWaypointStatusChange,
    isRemoving, isUpdatingStatus,
  } = useCargoBagDetail();

  if (isLoading || !cargoBag) {
    return <CargoBagDetailSkeleton onBack={handleBack} />;
  }

  const isEmpty = goodsList.length === 0;
  const statusConfig = CARGO_BAG_STATUS_CONFIG[cargoBag.status];

  const waypoints = waypointPayload?.waypoints || cargoBag.waypoints || [];
  const currentWaypointIndex = waypointPayload?.currentWaypointIndex ?? cargoBag.currentWaypointIndex ?? -1;
  const totalWaypoints = waypointPayload?.totalWaypoints ?? cargoBag.totalWaypoints ?? waypoints.length;
  const progress = waypointPayload?.progressPercentage ?? cargoBag.waypointProgressPercentage ?? 0;
  const progressLabel =
    currentWaypointIndex >= 0 && totalWaypoints > 0
      ? `Étape ${currentWaypointIndex + 1} sur ${totalWaypoints}`
      : 'Voyage planifié';

  const routeFrom = waypoints[0]?.location?.city;
  const routeTo = waypoints[waypoints.length - 1]?.location?.city;

  const arrived = formatDate(cargoBag.arrivedAt);
  const metaChips: HeroMetaChip[] = [];
  if (cargoBag.routeName) metaChips.push({ icon: 'map-marker-path', label: cargoBag.routeName });
  if (arrived) metaChips.push({ icon: 'calendar-check', label: `Arrivé le ${arrived}` });

  const kpis: KpiItem[] = [
    { icon: 'package-variant', value: cargoBag.totalPackages, label: 'Colis' },
    { icon: 'weight-kilogram', value: `${cargoBag.totalWeight?.toFixed?.(1) ?? cargoBag.totalWeight}`, label: 'Kg' },
    { icon: 'cube-outline', value: cargoBag.goodsCount, label: 'Articles' },
  ];

  const tabs: SegmentTab[] = [
    { key: 'itinerary', label: 'Itinéraire', icon: 'map-marker-path' },
    { key: 'goods', label: 'Marchandises', icon: 'cube-outline', count: goodsList.length },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary.main} />
        }
      >
        <View style={localStyles.body}>
          <ShipmentHero
            icon="bag-personal-outline"
            eyebrow="Sac de cargo"
            title={cargoBag.bagNumber}
            subtitle={cargoBag.notes || undefined}
            statusLabel={CARGO_BAG_STATUS_LABELS[cargoBag.status]}
            statusColor={statusConfig.color}
            routeFrom={routeFrom}
            routeTo={routeTo}
            progress={progress}
            progressLabel={progressLabel}
            metaChips={metaChips}
            onBack={handleBack}
            rightSlot={
              <View style={localStyles.actions}>
                <TouchableOpacity onPress={handleToggleRemoveMode} disabled={isEmpty} hitSlop={10}>
                  <Ionicons
                    name={removeMode ? 'close' : 'remove-circle-outline'}
                    size={22}
                    color={isEmpty ? 'rgba(255,255,255,0.4)' : '#FFFFFF'}
                  />
                </TouchableOpacity>
                <CargoBagStatusMenu
                  visible={statusMenuVisible}
                  onDismiss={() => setStatusMenuVisible(false)}
                  anchor={
                    <TouchableOpacity onPress={() => setStatusMenuVisible(true)} hitSlop={10}>
                      <Ionicons name="ellipsis-vertical" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                  }
                  currentStatus={cargoBag.status}
                  onStatusChange={handleChangeStatus}
                  onDelete={handleDeleteBag}
                  disabled={isUpdatingStatus}
                />
              </View>
            }
          />

          <ShipmentKpiGrid items={kpis} />

          <SegmentTabs tabs={tabs} active={tab} onChange={(k) => setTab(k as TabKey)} />

          {tab === 'itinerary' && (
            <AirwayBillWaypointTimeline
              waypoints={waypoints}
              currentWaypointIndex={currentWaypointIndex}
              progressPercentage={progress}
              isUpdating={isUpdatingStatus}
              onWaypointStatusChange={handleWaypointStatusChange}
            />
          )}

          {tab === 'goods' && (
            <CargoBagDetailGoodsList
              goodsList={goodsList}
              removeMode={removeMode}
              selectedRemoveIds={selectedRemoveIds}
              onToggleSelection={handleToggleRemoveSelection}
              onAddGoods={handleAddGoods}
            />
          )}
        </View>
        <View style={styles.spacer} />
      </ScrollView>
      <CargoBagDetailFooter
        removeMode={removeMode}
        selectedCount={selectedRemoveIds.length}
        onConfirmRemove={handleConfirmRemove}
        onAddGoods={handleAddGoods}
        onToggleRemoveMode={handleToggleRemoveMode}
        isRemoving={isRemoving}
        isEmpty={isEmpty}
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  body: { gap: 16 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
});

export default CargoBagDetailScreen;
