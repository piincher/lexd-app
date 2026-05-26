import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RoadSegmentDetails } from '@src/shared/types/containerWaypoints';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './WaypointDetails.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WaypointRoadDetailsProps {
  roadDetails: RoadSegmentDetails;
}

export const WaypointRoadDetails: React.FC<WaypointRoadDetailsProps> = ({ roadDetails }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Détails Routier</Text>
      {roadDetails.transporterName && (
        <View style={styles.detailRow}>
          <Ionicons name="car" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailLabel}>Transporteur:</Text>
          <Text style={styles.detailValue}>{roadDetails.transporterName}</Text>
        </View>
      )}
      {roadDetails.truckPlateNumber && (
        <View style={styles.detailRow}>
          <Ionicons name="card" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailLabel}>Plaque:</Text>
          <Text style={styles.detailValue}>{roadDetails.truckPlateNumber}</Text>
        </View>
      )}
      {roadDetails.borderCrossing && (
        <View style={styles.detailRow}>
          <Ionicons name="flag" size={16} color={colors.neutral[500]} />
          <Text style={styles.detailLabel}>Passage frontalier:</Text>
          <Text style={styles.detailValue}>{roadDetails.borderCrossing}</Text>
        </View>
      )}
    </View>
  );
};
