import React, { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { Portal, Dialog } from 'react-native-paper';
import { NewWaypointForm } from '../hooks/types';
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
  const styles = createStyles(colors, isDark);
  const isValid = Boolean(newWaypoint.locationCity && newWaypoint.locationCode && newWaypoint.segmentType);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>Add New Waypoint</Dialog.Title>
        <Dialog.Content>
          <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <LocationNameField newWaypoint={newWaypoint} onUpdateField={onUpdateField} onInputFocus={scrollToEnd} />
            <LocationCodeField newWaypoint={newWaypoint} onUpdateField={onUpdateField} onInputFocus={scrollToEnd} />
            <SegmentTypeField newWaypoint={newWaypoint} onUpdateField={onUpdateField} />
            <View style={{ height: 280 }} />
          </ScrollView>
        </Dialog.Content>
        <AddWaypointDialogActions onDismiss={onDismiss} onAdd={onAdd} isValid={isValid} />
      </Dialog>
    </Portal>
  );
};
