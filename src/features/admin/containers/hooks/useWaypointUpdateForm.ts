import { WaypointStatus } from '@src/shared/types/containerWaypoints';
import { ContainerWaypoint } from '../types';
import { useWaypointFormState } from './useWaypointFormState';
import { useWaypointFormValidation } from './useWaypointFormValidation';
import { useWaypointFormSubmission } from './useWaypointFormSubmission';

export const useWaypointUpdateForm = (
  waypoint: ContainerWaypoint | null,
  waypointIndex: number,
  onSave: (index: number, updates: Partial<ContainerWaypoint> & { status?: WaypointStatus }) => void,
  onDismiss: () => void
) => {
  const formState = useWaypointFormState(waypoint);
  const validation = useWaypointFormValidation(waypoint, formState.status);
  const submission = useWaypointFormSubmission(
    waypointIndex,
    formState.status,
    formState.actualArrival,
    formState.actualDeparture,
    formState.notes,
    onSave,
    onDismiss
  );

  return {
    ...formState,
    ...validation,
    ...submission,
  };
};
