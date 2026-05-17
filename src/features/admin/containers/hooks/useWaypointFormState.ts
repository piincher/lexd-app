import { useState, useEffect } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ExtendedWaypointStatus, QuickAction } from '../types/waypointStatus';
import { ContainerWaypoint } from '../types';

export const useWaypointFormState = (waypoint: ContainerWaypoint | null) => {
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
    handleQuickAction,
    onArrivalChange,
    onDepartureChange,
  };
};
