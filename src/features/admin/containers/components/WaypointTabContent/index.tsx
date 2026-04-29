import React from 'react';
import {
  WaypointTracker,
  SeaSegmentsSection,
  RoadSegmentsSection,
} from '../../screens/WaypointManagement/components';
import { ContainerWaypoint, SeaSegment, RoadSegment } from '../../types';
import type { TabType } from '../../screens/WaypointManagement/hooks/types';

interface WaypointTabContentProps {
  activeTab: TabType;
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  containerNumber: string;
  seaSegments: SeaSegment[];
  roadSegments: RoadSegment[];
  onMarkArrived: (index: number) => void;
  onMarkDeparted: (index: number) => void;
  onUpdateInfo: (index: number) => void;
}

export const WaypointTabContent: React.FC<WaypointTabContentProps> = ({
  activeTab,
  waypoints,
  currentWaypointIndex,
  containerNumber,
  seaSegments,
  roadSegments,
  onMarkArrived,
  onMarkDeparted,
  onUpdateInfo,
}) => {
  switch (activeTab) {
    case 'waypoints':
      return (
        <WaypointTracker
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          containerNumber={containerNumber}
          onMarkArrived={onMarkArrived}
          onMarkDeparted={onMarkDeparted}
          onUpdateInfo={onUpdateInfo}
        />
      );
    case 'sea':
      return <SeaSegmentsSection seaSegments={seaSegments} />;
    case 'road':
      return <RoadSegmentsSection roadSegments={roadSegments} />;
    default:
      return null;
  }
};

export default WaypointTabContent;
