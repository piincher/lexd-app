import { Ionicons } from '@expo/vector-icons';
import { ContainerWaypoint, WaypointStatus } from '../../../types/waypoints';

/**
 * Label for the *active* leg, shared by the top card and the timeline so they
 * never disagree. "En cours" was ambiguous (travelling vs. on site); this maps to
 * the real situation:
 *  - has actualArrival → "Sur place"
 *  - first waypoint     → "Au point de départ" (origin, not travelled to)
 *  - otherwise          → "En route vers"
 */
export const getCurrentLegLabel = (waypoint?: ContainerWaypoint, index = 0): string => {
  if (waypoint?.actualArrival) return 'Sur place';
  if (index === 0) return 'Au point de départ';
  return 'En route vers';
};

export const WAYPOINT_STATUS_ICONS: Record<WaypointStatus, React.ComponentProps<typeof Ionicons>['name']> = {
  PENDING: 'time-outline',
  IN_PROGRESS: 'navigate',
  COMPLETED: 'checkmark-circle',
  DELAYED: 'alert-circle',
  CANCELLED: 'close-circle',
};

export const formatTimestamp = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
