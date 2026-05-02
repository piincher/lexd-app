import { Ionicons } from '@expo/vector-icons';
import { WaypointStatus } from '../../../types/waypoints';

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
