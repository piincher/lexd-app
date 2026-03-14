import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal, Dialog, Button, Menu } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { SEGMENT_TYPE_OPTIONS, SEGMENT_TYPE_LABELS, WaypointStatus, SegmentType } from '../../../types';

export interface NewWaypointForm {
  locationCity?: string;
  locationCode?: string;
  segmentType?: SegmentType;
  status?: WaypointStatus;
}

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
  const [typeMenuVisible, setTypeMenuVisible] = React.useState(false);

  const isValid = newWaypoint.locationCity && newWaypoint.locationCode && newWaypoint.segmentType;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>Add New Waypoint</Dialog.Title>
        <Dialog.Content>
          <View style={styles.field}>
            <Text style={styles.label}>Location Name *</Text>
            <TextInput
              style={styles.input}
              value={newWaypoint.locationCity || ''}
              onChangeText={(text) => onUpdateField('locationCity', text)}
              placeholder="Enter location name"
              placeholderTextColor={Theme.neutral[400]}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location Code *</Text>
            <TextInput
              style={styles.input}
              value={newWaypoint.locationCode || ''}
              onChangeText={(text) => onUpdateField('locationCode', text.toUpperCase())}
              placeholder="Enter location code (e.g., SHA)"
              placeholderTextColor={Theme.neutral[400]}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Segment Type *</Text>
            <Menu
              visible={typeMenuVisible}
              onDismiss={() => setTypeMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setTypeMenuVisible(true)}
                >
                  <Text style={newWaypoint.segmentType ? styles.dropdownText : styles.dropdownPlaceholder}>
                    {newWaypoint.segmentType ? SEGMENT_TYPE_LABELS[newWaypoint.segmentType] : 'Select segment type'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={Theme.neutral[400]} />
                </TouchableOpacity>
              }
            >
              {SEGMENT_TYPE_OPTIONS.map((type) => (
                <Menu.Item
                  key={type}
                  onPress={() => {
                    onUpdateField('segmentType', type);
                    setTypeMenuVisible(false);
                  }}
                  title={SEGMENT_TYPE_LABELS[type]}
                />
              ))}
            </Menu>
          </View>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button onPress={onDismiss} textColor={Theme.neutral[500]}>
            Cancel
          </Button>
          <Button
            onPress={onAdd}
            mode="contained"
            disabled={!isValid}
            buttonColor={Theme.primary[600]}
          >
            Add
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Theme.neutral[50],
    borderRadius: Theme.radius.lg,
  },
  title: {
    color: Theme.neutral[900],
    fontSize: 20,
    fontWeight: '600',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[900],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Theme.neutral[900],
    backgroundColor: Theme.neutral[100],
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Theme.neutral[100],
  },
  dropdownText: {
    fontSize: 16,
    color: Theme.neutral[900],
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: Theme.neutral[400],
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
