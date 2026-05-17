import { WaypointStatus } from '@src/shared/types/containerWaypoints';
import { ContainerWaypoint } from '../types';
import { ExtendedWaypointStatus } from '../types/waypointStatus';

export const useWaypointFormSubmission = (
  waypointIndex: number,
  status: ExtendedWaypointStatus,
  actualArrival: Date | null,
  actualDeparture: Date | null,
  notes: string,
  onSave: (index: number, updates: Partial<ContainerWaypoint> & { status?: WaypointStatus }) => void,
  onDismiss: () => void
) => {
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

  return { handleSave };
};
