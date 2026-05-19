import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SeaSegmentDetails } from '@src/shared/types/containerWaypoints';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './WaypointDetails.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WaypointSeaDetailsProps {
  seaDetails: SeaSegmentDetails;
}

export const WaypointSeaDetails: React.FC<WaypointSeaDetailsProps> = ({ seaDetails }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Détails Maritime</Text>
      {seaDetails.vesselName && (
        <View style={styles.detailRow}>
          <Ionicons name="boat" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailLabel}>Navire:</Text>
          <Text style={styles.detailValue}>{seaDetails.vesselName}</Text>
        </View>
      )}
      {seaDetails.carrier && (
        <View style={styles.detailRow}>
          <Ionicons name="business" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailLabel}>Compagnie:</Text>
          <Text style={styles.detailValue}>{seaDetails.carrier}</Text>
        </View>
      )}
      {seaDetails.terminal && (
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailLabel}>Terminal:</Text>
          <Text style={styles.detailValue}>{seaDetails.terminal}</Text>
        </View>
      )}
    </View>
  );
};
