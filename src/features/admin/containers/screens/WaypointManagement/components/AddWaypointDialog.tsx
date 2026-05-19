import React from 'react';
import { Portal, Dialog } from 'react-native-paper';
import { NewWaypointForm } from '../../hooks/types';
import { LocationNameField, LocationCodeField, SegmentTypeField } from './AddWaypointDialogFields';
import { AddWaypointDialogActions } from './AddWaypointDialogActions';
import { createStyles } from './AddWaypointDialog.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AddWaypointDialogProps {
  visible: boolean;
  newWaypoint: NewWaypointForm;
  onDismiss: () => void;
  onAdd: () => void;
  onUpdateField: (field: keyof NewWaypointForm, value: any) => void;
}

export const AddWaypointDialog: React.FC<AddWaypointDialogProps> = ({
  visible,
  newWaypoint,
  onDismiss,
  onAdd,
  onUpdateField,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const isValid = Boolean(newWaypoint.locationCity && newWaypoint.locationCode && newWaypoint.segmentType);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>Add New Waypoint</Dialog.Title>
        <Dialog.Content>
          <LocationNameField newWaypoint={newWaypoint} onUpdateField={onUpdateField} />
          <LocationCodeField newWaypoint={newWaypoint} onUpdateField={onUpdateField} />
          <SegmentTypeField newWaypoint={newWaypoint} onUpdateField={onUpdateField} />
        </Dialog.Content>
        <AddWaypointDialogActions onDismiss={onDismiss} onAdd={onAdd} isValid={isValid} />
      </Dialog>
    </Portal>
  );
};
