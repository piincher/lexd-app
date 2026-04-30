import { useState, useEffect } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { WaypointStatus } from '@src/shared/types/containerWaypoints';
import { ContainerWaypoint } from '../types';
import {
  ExtendedWaypointStatus,
  LocationCategory,
  QuickAction,
  PortStatusOption,
  getLocationCategory,
  getQuickActions,
  DISCHARGE_PORT_STATUSES,
  BORDER_STATUSES,
  WAREHOUSE_STATUSES,
  STANDARD_STATUSES,
} from '../types/waypointStatus';

const getLocationTitle = (category: LocationCategory): string => {
  switch (category) {
    case 'DISCHARGE_PORT':
      return 'Port de Déchargement';
    case 'BORDER':
      return 'Point de Frontière';
    case 'WAREHOUSE':
      return 'Entrepôt';
    case 'LOADING_PORT':
      return 'Port de Chargement';
    case 'TRANSIT_PORT':
      return 'Port de Transit';
    default:
      return 'Waypoint';
  }
};

const getAllStatusesForLocation = (category: LocationCategory): PortStatusOption[] => {
  switch (category) {
    case 'DISCHARGE_PORT':
      return DISCHARGE_PORT_STATUSES;
    case 'BORDER':
      return BORDER_STATUSES;
    case 'WAREHOUSE':
      return WAREHOUSE_STATUSES;
    default:
      return STANDARD_STATUSES;
  }
};

export const useWaypointUpdateForm = (
  waypoint: ContainerWaypoint | null,
  waypointIndex: number,
  onSave: (index: number, updates: Partial<ContainerWaypoint> & { status?: WaypointStatus }) => void,
  onDismiss: () => void
) => {
  const [status, setStatus] = useState<ExtendedWaypointStatus>('PENDING');
  const [actualArrival, setActualArrival] = useState<Date | null>(null);
  const [actualDeparture, setActualDeparture] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);

  useEffect(() => {
    if (waypoint) {
      setStatus(waypoint.status as ExtendedWaypointStatus);
      setActualArrival(waypoint.actualArrival ? new Date(waypoint.actualArrival) : null);
      setActualDeparture(waypoint.actualDeparture ? new Date(waypoint.actualDeparture) : null);
      setNotes(waypoint.notes || '');
    }
  }, [waypoint]);

  const locationCode = waypoint?.location?.portCode || '';
  const locationCategory = getLocationCategory(locationCode);
  const quickActions = locationCode ? getQuickActions(locationCode, status) : [];
  const allStatuses = getAllStatusesForLocation(locationCategory);
  const locationTitle = getLocationTitle(locationCategory);

  const handleSave = () => {
    const updates: Partial<ContainerWaypoint> & { status?: WaypointStatus } = {
      status: status as WaypointStatus,
      actualArrival: actualArrival?.toISOString(),
      actualDeparture: actualDeparture?.toISOString(),
      notes: notes || undefined,
    };

    Object.keys(updates).forEach((key) => {
      if (updates[key as keyof typeof updates] === undefined) {
        delete updates[key as keyof typeof updates];
      }
    });

    onSave(waypointIndex, updates);
    onDismiss();
  };

  const handleQuickAction = (action: QuickAction) => {
    setStatus(action.targetStatus);
    if (action.targetStatus === 'ARRIVED_AT_PORT' && !actualArrival) {
      setActualArrival(new Date());
    }
  };

  const onArrivalChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowArrivalPicker(false);
    if (selectedDate) {
      setActualArrival(selectedDate);
    }
  };

  const onDepartureChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      setActualDeparture(selectedDate);
    }
  };

  return {
    status,
    setStatus,
    actualArrival,
    setActualArrival,
    actualDeparture,
    setActualDeparture,
    notes,
    setNotes,
    showStatusDropdown,
    setShowStatusDropdown,
    showArrivalPicker,
    setShowArrivalPicker,
    showDeparturePicker,
    setShowDeparturePicker,
    locationCode,
    locationCategory,
    quickActions,
    allStatuses,
    locationTitle,
    handleSave,
    handleQuickAction,
    onArrivalChange,
    onDepartureChange,
  };
};
