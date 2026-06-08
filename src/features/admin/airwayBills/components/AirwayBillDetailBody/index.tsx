import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  AirwayBillStatusMenu,
  AirwayBillWaypointTimeline,
  ShipmentHero,
  ShipmentKpiGrid,
  SegmentTabs,
  CargoBagSection,
  AirwayBillGoodsSection,
} from '../../screens/components';
import type { HeroMetaChip } from '../../screens/components/ShipmentHero';
import type { KpiItem } from '../../screens/components/ShipmentKpiGrid';
import type { SegmentTab } from '../../screens/components/SegmentTabs';
import {
  AirwayBill,
  AirwayBillConsignee,
  AirwayBillGoods,
  AirwayBillStatus,
  AirwayBillWaypointStatus,
  AirwayBillWaypointPayload,
  CargoBag,
} from '../../types';

interface Props {
  airwayBill: AirwayBill;
  waypointPayload?: AirwayBillWaypointPayload;
  goodsList: AirwayBillGoods[];
  flightLabel: string;
  routeLabel: string;
  consignee: AirwayBillConsignee | null;
  nextStatuses: AirwayBillStatus[];
  menuVisible: boolean;
  menuKey: number;
  statusLabels: Record<AirwayBillStatus, string>;
  statusColors: Record<AirwayBillStatus, string>;
  handleStatusChange: (status: AirwayBillStatus) => void;
  handleWaypointStatusChange: (waypointIndex: number, status: AirwayBillWaypointStatus) => void;
  handleDelete: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  handleAssignPress: () => void;
  handleBack: () => void;
  airwayBillId: string;
  isUpdatingStatus: boolean;
  cargoBags: CargoBag[];
  isLoadingCargoBags: boolean;
  setCreateBagVisible: (visible: boolean) => void;
  handleBagPress: (bagId: string) => void;
  handleRefreshCargoBags: () => void;
  isRefreshingCargoBags: boolean;
}

const formatDate = (date?: string | null) => {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

type TabKey = 'itinerary' | 'bags' | 'goods';

export const AirwayBillDetailBody: React.FC<Props> = ({
  airwayBill,
  waypointPayload,
  goodsList,
  flightLabel,
  consignee,
  nextStatuses,
  menuVisible,
  menuKey,
  statusLabels,
  statusColors,
  handleStatusChange,
  handleWaypointStatusChange,
  handleDelete,
  openMenu,
  closeMenu,
  handleAssignPress,
  handleBack,
  isUpdatingStatus,
  cargoBags,
  isLoadingCargoBags,
  setCreateBagVisible,
  handleBagPress,
}) => {
  const [tab, setTab] = useState<TabKey>('itinerary');

  const waypoints = waypointPayload?.waypoints || airwayBill.waypoints || [];
  const currentWaypointIndex = waypointPayload?.currentWaypointIndex ?? airwayBill.currentWaypointIndex ?? -1;
  const totalWaypoints = waypointPayload?.totalWaypoints ?? airwayBill.totalWaypoints ?? waypoints.length;
  const progress = waypointPayload?.progressPercentage ?? airwayBill.waypointProgressPercentage ?? 0;

  const progressLabel =
    currentWaypointIndex >= 0 && totalWaypoints > 0
      ? `Étape ${currentWaypointIndex + 1} sur ${totalWaypoints}`
      : 'Voyage planifié';

  const eta = formatDate(airwayBill.actualArrivalDate || airwayBill.estimatedArrivalDate);
  const metaChips: HeroMetaChip[] = [];
  if (eta) {
    metaChips.push({
      icon: airwayBill.actualArrivalDate ? 'calendar-check' : 'calendar-clock',
      label: airwayBill.actualArrivalDate ? `Arrivé le ${eta}` : `Arrivée prévue ${eta}`,
    });
  }
  if (consignee?.name) metaChips.push({ icon: 'account-tie', label: consignee.name });

  const kpis: KpiItem[] = [
    { icon: 'bag-personal-outline', value: cargoBags.length, label: 'Sacs' },
    { icon: 'cube-outline', value: goodsList.length, label: 'Marchandises' },
    { icon: 'package-variant', value: airwayBill.totalPackages, label: 'Colis' },
    { icon: 'weight-kilogram', value: (airwayBill.totalWeight ?? 0).toFixed(1), label: 'Kg' },
  ];

  const tabs: SegmentTab[] = [
    { key: 'itinerary', label: 'Itinéraire', icon: 'map-marker-path' },
    { key: 'bags', label: 'Sacs', icon: 'bag-personal-outline', count: cargoBags.length },
    { key: 'goods', label: 'Articles', icon: 'cube-outline', count: goodsList.length },
  ];

  return (
    <View style={styles.root}>
      <ShipmentHero
        icon="airplane"
        eyebrow="Airway Bill"
        title={airwayBill.awbNumber}
        subtitle={flightLabel}
        statusLabel={statusLabels[airwayBill.status]}
        statusColor={statusColors[airwayBill.status]}
        routeFrom={airwayBill.departureAirport || undefined}
        routeTo={airwayBill.arrivalAirport || undefined}
        progress={progress}
        progressLabel={progressLabel}
        metaChips={metaChips}
        onBack={handleBack}
        rightSlot={
          <AirwayBillStatusMenu
            key={menuKey}
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} hitSlop={12} activeOpacity={0.7}>
                <Ionicons name="ellipsis-vertical" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            }
            nextStatuses={nextStatuses}
            statusLabels={statusLabels}
            statusColors={statusColors}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            disabled={isUpdatingStatus}
          />
        }
      />

      <ShipmentKpiGrid
        items={kpis}
        capacity={
          airwayBill.capacityWeight > 0
            ? { used: airwayBill.totalWeight ?? 0, total: airwayBill.capacityWeight }
            : undefined
        }
      />

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

      {tab === 'bags' && (
        <CargoBagSection
          cargoBags={cargoBags}
          onBagPress={handleBagPress}
          onCreatePress={() => setCreateBagVisible(true)}
          loading={isLoadingCargoBags}
        />
      )}

      {tab === 'goods' && (
        <AirwayBillGoodsSection
          goodsList={goodsList}
          cargoBags={cargoBags}
          onAssignPress={handleAssignPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { gap: 16 },
});
