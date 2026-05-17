import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useSharedShipmentTimelineStyles } from './SharedShipmentTimeline.styles';

export const TimelineEmptyState: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useSharedShipmentTimelineStyles();

  return (
    <View style={styles.empty}>
      <MaterialCommunityIcons name="timeline-clock" size={48} color={colors.text.disabled} />
      <Text style={styles.emptyText}>Aucun historique disponible</Text>
    </View>
  );
};
