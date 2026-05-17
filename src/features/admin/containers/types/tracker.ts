import { ContainerWaypoint } from './waypoints';
import { ExtendedWaypointStatus } from './waypointStatus';
import { FinalDestination } from './destination';
import { ConsigneeInfo } from './destination';

export interface ContainerWaypointTrackerProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  onMarkArrived?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onMarkDeparted?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onAddNotes?: (waypointIndex: number) => void;
  onUpdateInfo?: (waypointIndex: number) => void;
  onUpdateStatus?: (waypointIndex: number, status: ExtendedWaypointStatus) => void;
  containerNumber: string;
  finalDestination?: FinalDestination;
  consignee?: ConsigneeInfo;
}
