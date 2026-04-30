import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import {
  ExtendedWaypointStatus,
  PortStatusOption,
} from '../types/waypointStatus';

interface WaypointStatusDropdownProps {
  allStatuses: PortStatusOption[];
  currentStatus: ExtendedWaypointStatus;
  onSelectStatus: (status: ExtendedWaypointStatus) => void;
}

export const WaypointStatusDropdown: React.FC<WaypointStatusDropdownProps> = ({
  allStatuses,
  currentStatus,
  onSelectStatus,
}) => {
  return (
    <View style={styles.dropdownMenu}>
      {allStatuses.map((option) => (
        <TouchableOpacity
          key={option.status}
          style={[
            styles.dropdownItem,
            currentStatus === option.status && styles.dropdownItemActive,
          ]}
          onPress={() => onSelectStatus(option.status)}
        >
          <View style={[styles.statusIndicator, { backgroundColor: option.color }]} />
          <View style={styles.dropdownItemContent}>
            <Text
              style={[
                styles.dropdownItemText,
                currentStatus === option.status && styles.dropdownItemTextActive,
              ]}
            >
              {option.label}
            </Text>
            {option.description && (
              <Text style={styles.dropdownItemDescription}>{option.description}</Text>
            )}
          </View>
          {currentStatus === option.status && (
            <Ionicons name="checkmark" size={18} color={Theme.primary[600]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownMenu: {
    backgroundColor: Theme.colors.background.card,
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    marginTop: Theme.spacing.sm,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  dropdownItemActive: {
    backgroundColor: Theme.primary[50],
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dropdownItemContent: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Theme.neutral[700],
  },
  dropdownItemTextActive: {
    fontWeight: '600',
    color: Theme.primary[600],
  },
  dropdownItemDescription: {
    fontSize: 11,
    color: Theme.neutral[500],
    marginTop: 2,
  },
});
