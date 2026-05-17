import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { SEGMENT_TYPE_OPTIONS, SEGMENT_TYPE_LABELS } from '../../../types';
import { NewWaypointForm } from '../../hooks/types';
import { styles } from './AddWaypointDialog.styles';

interface FieldsProps {
  newWaypoint: NewWaypointForm;
  onUpdateField: (field: keyof NewWaypointForm, value: any) => void;
}

export const LocationNameField: React.FC<FieldsProps> = ({ newWaypoint, onUpdateField }) => (
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
);

export const LocationCodeField: React.FC<FieldsProps> = ({ newWaypoint, onUpdateField }) => (
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
);

export const SegmentTypeField: React.FC<FieldsProps> = ({ newWaypoint, onUpdateField }) => {
  const [typeMenuVisible, setTypeMenuVisible] = React.useState(false);

  return (
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
  );
};
