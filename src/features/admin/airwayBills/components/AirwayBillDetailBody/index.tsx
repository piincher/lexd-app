import React from 'react';
import {
  AirwayBillDetailHeader,
  AirwayBillStatusMenu,
  AirwayBillInfoCard,
  AirwayBillTimeline,
  AirwayBillWaypointTimeline,
  AirwayBillStatsRow,
  CargoBagList,
  AirwayBillGoodsList,
  AirwayBillDetailActions,
} from '../../screens/components';
import {
  AirwayBill,
  AirwayBillConsignee,
  AirwayBillGoods,
  AirwayBillStatus,
  AirwayBillWaypointPayload,
  CargoBag,
} from '../../types';
import { AirwayBillDetailMenuButton } from '../AirwayBillDetailMenuButton';

interface Props {
  airwayBill: AirwayBill;
  waypointPayload?: AirwayBillWaypointPayload;
  goodsList: AirwayBillGoods[];
  flightLabel: string;
  routeLabel: string;
  consignee: AirwayBillConsignee | null;
  nextStatuses: AirwayBillStatus[];
  menuVisible: boolean;
  statusLabels: Record<AirwayBillStatus, string>;
  statusColors: Record<AirwayBillStatus, string>;
  handleStatusChange: (status: AirwayBillStatus) => void;
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

export const AirwayBillDetailBody: React.FC<Props> = ({
  airwayBill,
  waypointPayload,
  goodsList,
  flightLabel,
  routeLabel,
  consignee,
  nextStatuses,
  menuVisible,
  statusLabels,
  statusColors,
  handleStatusChange,
  handleDelete,
  openMenu,
  closeMenu,
  handleAssignPress,
  handleBack,
  airwayBillId,
  isUpdatingStatus,
  cargoBags,
  isLoadingCargoBags,
  setCreateBagVisible,
  handleBagPress,
  handleRefreshCargoBags,
  isRefreshingCargoBags,
}) => (
  <>
    <AirwayBillDetailHeader onBack={handleBack} title="Détail AWB">
      <AirwayBillStatusMenu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<AirwayBillDetailMenuButton onPress={openMenu} />}
        nextStatuses={nextStatuses}
        statusLabels={statusLabels}
        statusColors={statusColors}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        disabled={isUpdatingStatus}
      />
    </AirwayBillDetailHeader>
    <AirwayBillInfoCard airwayBill={airwayBill} flightLabel={flightLabel} routeLabel={routeLabel} consignee={consignee} />
    <AirwayBillTimeline currentStatus={airwayBill.status} statusLabels={statusLabels} statusColors={statusColors} />
    <AirwayBillWaypointTimeline
      waypoints={waypointPayload?.waypoints || airwayBill.waypoints || []}
      currentWaypointIndex={waypointPayload?.currentWaypointIndex ?? airwayBill.currentWaypointIndex ?? -1}
      progressPercentage={waypointPayload?.progressPercentage ?? airwayBill.waypointProgressPercentage ?? 0}
    />
    <AirwayBillStatsRow totalPackages={airwayBill.totalPackages} totalWeight={airwayBill.totalWeight} />
    <CargoBagList
      cargoBags={cargoBags}
      onBagPress={handleBagPress}
      onCreatePress={() => setCreateBagVisible(true)}
      loading={isLoadingCargoBags}
      refreshing={isRefreshingCargoBags}
      onRefresh={handleRefreshCargoBags}
    />
    <AirwayBillGoodsList goodsList={goodsList} cargoBags={cargoBags} airwayBillId={airwayBillId} onAssignPress={handleAssignPress} />
    <AirwayBillDetailActions hasGoods={goodsList.length > 0} onAssignPress={handleAssignPress} />
  </>
);
