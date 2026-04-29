import { SegmentType, WaypointStatus } from '../../../types';

export type TabType = 'waypoints' | 'sea' | 'road';

export interface NewWaypointForm {
  locationCity?: string;
  locationCode?: string;
  segmentType?: SegmentType;
  status?: WaypointStatus;
}
