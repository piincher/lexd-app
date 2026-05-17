import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  ExtendedWaypointStatus,
  PortStatusOption,
  getExtendedStatusColor,
  getExtendedStatusLabel,
} from '../types/waypointStatus';
import { WaypointStatusDropdown } from './WaypointStatusDropdown';

interface WaypointStatusSelectorProps {
  status: ExtendedWaypointStatus;
  showStatusDropdown: boolean;
  allStatuses: PortStatusOption[];
  onToggleDropdown: () => void;
  onSelectStatus: (status: ExtendedWaypointStatus) => void;
  delay?: number;
}

export const WaypointStatusSelector: React.FC<WaypointStatusSelectorProps> = ({
  status,
  showStatusDropdown,
  allStatuses,
  onToggleDropdown,
  onSelectStatus,
  delay = 0,
}) => {
  const { colors } = useAppTheme();
  return (
    <Animated.View entering={FadeIn.delay(delay)} style={styles.section}>
      <Text style={styles.sectionTitle}>Statut</Text>
      <TouchableOpacity style={styles.dropdown} onPress={onToggleDropdown}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getExtendedStatusColor(status) },
          ]}
        />
        <Text style={styles.dropdownText}>{getExtendedStatusLabel(status)}</Text>
        <Ionicons
          name={showStatusDropdown ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Theme.neutral[500]}
        />
      </TouchableOpacity>

      {showStatusDropdown && (
        <WaypointStatusDropdown
          allStatuses={allStatuses}
          currentStatus={status}
          onSelectStatus={onSelectStatus}
        />
      )}

      <View style={styles.statusFlowContainer}>
        <Text style={styles.statusFlowLabel}>Progression:</Text>
        <View style={styles.statusFlow}>
          <View style={[styles.statusFlowDot, { backgroundColor: Theme.status.success }]} />
          <View style={styles.statusFlowLine} />
          <View style={[styles.statusFlowDot, { backgroundColor: getExtendedStatusColor(status) }]} />
          <View style={styles.statusFlowLine} />
          <View style={[styles.statusFlowDot, { backgroundColor: Theme.neutral[300] }]} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.md,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  statusFlowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
  },
  statusFlowLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginRight: Theme.spacing.md,
  },
  statusFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusFlowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusFlowLine: {
    flex: 1,
    height: 2,
    backgroundColor: Theme.neutral[300],
    marginHorizontal: 4,
  },
});
