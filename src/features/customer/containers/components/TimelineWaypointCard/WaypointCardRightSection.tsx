import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface WaypointCardRightSectionProps {
  styles: any;
  colors: any;
  isCompleted: boolean;
  isCurrent: boolean;
}

export const WaypointCardRightSection: React.FC<WaypointCardRightSectionProps> = ({
  styles,
  colors,
  isCompleted,
  isCurrent,
}) => (
  <View style={styles.rightSection}>
    {isCompleted ? (
      <View style={[styles.statusIcon, { backgroundColor: Theme.status.success }]}>
        <Ionicons name="checkmark" size={16} color={colors.text.inverse} />
      </View>
    ) : isCurrent ? (
      <View style={[styles.statusIcon, { backgroundColor: Theme.status.info }]}>
        <Ionicons name="navigate" size={16} color={colors.text.inverse} />
      </View>
    ) : (
      <View style={[styles.statusIcon, { backgroundColor: colors.neutral[300] }]}>
        <Ionicons name="time-outline" size={16} color={colors.text.inverse} />
      </View>
    )}
  </View>
);
