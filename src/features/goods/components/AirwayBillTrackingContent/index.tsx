import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { AirwayBillTrackingGoodsList } from '../AirwayBillTrackingGoodsList';
import { AirwayBillTrackingHeader } from '../AirwayBillTrackingHeader';
import { AirwayBillTrackingRouteCard } from '../AirwayBillTrackingRouteCard';
import { AirwayBillTrackingSummary } from '../AirwayBillTrackingSummary';
import { AirwayBillTrackingTimeline } from '../AirwayBillTrackingTimeline';
import { AirwayBillTrackingWaypoints } from '../../screens/components/AirwayBillTrackingWaypoints';
import { styles } from './AirwayBillTrackingContent.styles';
import type { AirwayBill, TrackingWaypoint } from '../../api/types';

interface Props {
  awb: AirwayBill;
  flightLabel: string;
  departureAirport: string;
  arrivalAirport: string;
  waypoints: TrackingWaypoint[];
  currentWaypoint?: TrackingWaypoint;
  currentWaypointIndex: number;
  waypointProgress: number;
  currentStepIndex: number;
  estimatedArrivalLabel?: string | null;
  isFetching: boolean;
  onRefresh: () => void;
}

export const AirwayBillTrackingContent: React.FC<Props> = ({
  awb,
  flightLabel,
  departureAirport,
  arrivalAirport,
  waypoints,
  currentWaypoint,
  currentWaypointIndex,
  waypointProgress,
  currentStepIndex,
  estimatedArrivalLabel,
  isFetching,
  onRefresh,
}) => (
  <ScrollView
    contentContainerStyle={styles.content}
    refreshControl={
      <RefreshControl
        refreshing={isFetching}
        onRefresh={onRefresh}
        tintColor={Theme.primary[500]}
      />
    }
  >
    <AirwayBillTrackingHeader awbNumber={awb.awbNumber} flightLabel={flightLabel} />
    <AirwayBillTrackingRouteCard departureAirport={departureAirport} arrivalAirport={arrivalAirport} />
    <AirwayBillTrackingSummary
      status={awb.status}
      progressPercentage={waypointProgress}
      currentWaypoint={currentWaypoint}
      estimatedArrival={estimatedArrivalLabel}
      goodsCount={awb.goodsIds?.length || 0}
    />
    {waypoints.length > 0 ? (
      <AirwayBillTrackingWaypoints
        waypoints={waypoints}
        currentWaypointIndex={currentWaypointIndex}
        progressPercentage={waypointProgress}
      />
    ) : (
      <AirwayBillTrackingTimeline currentStepIndex={currentStepIndex} />
    )}
    <AirwayBillTrackingGoodsList goodsIds={awb.goodsIds} />
  </ScrollView>
);

export default AirwayBillTrackingContent;
