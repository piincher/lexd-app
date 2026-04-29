import { useState, useCallback } from 'react';
import { Linking, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ContainerWaypoint, ExtendedWaypointStatus } from '../../../types';
import { getLocationCategory, getExtendedStatusLabel, getQuickActions, isValidStatusTransition } from '../../../types/waypointStatus';

const isNewArchitectureEnabled = Boolean(
  (globalThis as { nativeFabricUIManager?: unknown }).nativeFabricUIManager
);

if (Platform.OS === 'android' && !isNewArchitectureEnabled && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  onMarkArrived?: (i: number, s?: ExtendedWaypointStatus) => void;
  onMarkDeparted?: (i: number, s?: ExtendedWaypointStatus) => void;
  onUpdateStatus?: (i: number, s: ExtendedWaypointStatus) => void;
}

interface Return {
  expandedIndex: number | null;
  toggleExpand: (i: number) => void;
  formatDateTime: (d?: string) => string;
  formatDate: (d?: string) => string;
  callConsignee: (p: string) => void;
  isDakarPort: (w: ContainerWaypoint) => boolean;
  isBorder: (w: ContainerWaypoint) => boolean;
  isWarehouse: (w: ContainerWaypoint) => boolean;
  getLocationCategoryDisplay: (w: ContainerWaypoint) => { label: string; color: string; icon: string } | null;
  getRouteDisplay: (w: ContainerWaypoint, i: number) => { icon: string; label: string } | null;
  handleQuickAction: (i: number, s: ExtendedWaypointStatus) => void;
}

const fmt = (d?: string, t = false): string => {
  if (!d) return '-';
  try { const date = new Date(d), o: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }; if (t) { o.hour = '2-digit'; o.minute = '2-digit'; } return date.toLocaleDateString('fr-FR', o); } catch { return d; }
};

const CAT_DISP: Record<string, { label: string; color: string; icon: string }> = {
  DISCHARGE_PORT: { label: 'PORT', color: '#0EA5E9', icon: 'boat' },
  BORDER: { label: 'FRONTIÈRE', color: '#F59E0B', icon: 'flag' },
  WAREHOUSE: { label: 'ENTREPÔT', color: '#8B5CF6', icon: 'warehouse' },
  LOADING_PORT: { label: 'CHARGEMENT', color: '#10B981', icon: 'cube' },
  TRANSIT_PORT: { label: 'TRANSIT', color: '#6366F1', icon: 'git-branch' },
};

export const useContainerWaypointTracker = ({ waypoints, onMarkArrived, onMarkDeparted, onUpdateStatus }: Props): Return => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleExpand = useCallback((i: number) => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setExpandedIndex(p => p === i ? null : i); }, []);
  const formatDateTime = useCallback((d?: string) => fmt(d, true), []);
  const formatDate = useCallback((d?: string) => fmt(d, false), []);
  const callConsignee = useCallback((p: string) => Linking.openURL(`tel:${p}`), []);
  const isDakarPort = useCallback((w: ContainerWaypoint) => { const pc = w.location?.portCode || '', c = w.location?.city || ''; return pc === 'SNDKR' || c.toLowerCase().includes('dakar'); }, []);
  const isBorder = useCallback((w: ContainerWaypoint) => { const pc = w.location?.portCode || '', c = w.location?.city || ''; return getLocationCategory(pc) === 'BORDER' || c.toLowerCase().includes('diboli') || c.toLowerCase().includes('border'); }, []);
  const isWarehouse = useCallback((w: ContainerWaypoint) => { const pc = w.location?.portCode || '', c = w.location?.city || ''; return getLocationCategory(pc) === 'WAREHOUSE' || c.toLowerCase().includes('bamako'); }, []);
  const getLocationCategoryDisplay = useCallback((w: ContainerWaypoint) => CAT_DISP[getLocationCategory(w.location?.portCode || '')] || null, []);
  const getRouteDisplay = useCallback((w: ContainerWaypoint, i: number) => { const cat = getLocationCategory(w.location?.portCode || ''); if (cat === 'DISCHARGE_PORT') return { icon: 'boat', label: 'Port d\'arrivée - DÉCHARGEMENT' }; if (cat === 'BORDER') return { icon: 'flag', label: 'Frontière (Douane)' }; if (cat === 'WAREHOUSE') return { icon: 'home', label: 'Destination Finale - Bamako' }; if (w.segmentType === 'ROAD' && i > 0) { const prev = waypoints[i - 1]; if (prev && getLocationCategory(prev.location?.portCode || '') === 'DISCHARGE_PORT') return { icon: 'car', label: 'Transport Routier' }; } return null; }, [waypoints]);
  const handleQuickAction = useCallback((i: number, s: ExtendedWaypointStatus) => { const w = waypoints[i], cs = w.status as ExtendedWaypointStatus, pc = w.location?.portCode || ''; if (!isValidStatusTransition(pc, cs, s)) { Alert.alert('Transition non valide', `Impossible de passer de ${getExtendedStatusLabel(cs)} à ${getExtendedStatusLabel(s)}`); return; } if (onUpdateStatus) onUpdateStatus(i, s); else if (s === 'ARRIVED_AT_PORT' && onMarkArrived) onMarkArrived(i, s); else if ((s === 'DEPARTED' || s === 'COMPLETED') && onMarkDeparted) onMarkDeparted(i, s); }, [waypoints, onUpdateStatus, onMarkArrived, onMarkDeparted]);
  return { expandedIndex, toggleExpand, formatDateTime, formatDate, callConsignee, isDakarPort, isBorder, isWarehouse, getLocationCategoryDisplay, getRouteDisplay, handleQuickAction };
};

export default useContainerWaypointTracker;
