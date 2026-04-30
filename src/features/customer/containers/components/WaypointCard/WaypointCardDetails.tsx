import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '@src/shared/types/containerWaypoints';
import { useWaypointCardStyles } from './WaypointCard.styles';

const formatDateShort = (dateString?: string): string => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

interface WaypointCardDetailsProps {
  waypoint: ContainerWaypoint;
}

export const WaypointCardDetails: React.FC<WaypointCardDetailsProps> = ({ waypoint }) => {
  const styles = useWaypointCardStyles();
  const { colors } = useAppTheme();

  return (
    <View style={styles.wpDetails}>
      <View style={styles.wpDetailDivider} />

      {waypoint.estimatedDeparture && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Départ estimé</Text>
          <Text style={styles.wpDetailValue}>{formatDateShort(waypoint.estimatedDeparture)}</Text>
        </View>
      )}
      {waypoint.actualDeparture && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Départ réel</Text>
          <Text style={styles.wpDetailValue}>{formatDateShort(waypoint.actualDeparture)}</Text>
        </View>
      )}
      {waypoint.estimatedArrival && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Arrivée estimée</Text>
          <Text style={styles.wpDetailValue}>{formatDateShort(waypoint.estimatedArrival)}</Text>
        </View>
      )}
      {waypoint.actualArrival && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Arrivée réelle</Text>
          <Text style={styles.wpDetailValue}>{formatDateShort(waypoint.actualArrival)}</Text>
        </View>
      )}
      {waypoint.seaDetails?.vesselName && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Navire</Text>
          <Text style={styles.wpDetailValue}>{waypoint.seaDetails.vesselName}</Text>
        </View>
      )}
      {waypoint.seaDetails?.carrier && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Transporteur</Text>
          <Text style={styles.wpDetailValue}>{waypoint.seaDetails.carrier}</Text>
        </View>
      )}
      {waypoint.seaDetails?.terminal && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Terminal</Text>
          <Text style={styles.wpDetailValue}>{waypoint.seaDetails.terminal}</Text>
        </View>
      )}
      {waypoint.roadDetails?.transporterName && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Transporteur</Text>
          <Text style={styles.wpDetailValue}>{waypoint.roadDetails.transporterName}</Text>
        </View>
      )}
      {waypoint.roadDetails?.borderCrossing && (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Frontière</Text>
          <Text style={styles.wpDetailValue}>{waypoint.roadDetails.borderCrossing}</Text>
        </View>
      )}
      {waypoint.description ? (
        <View style={styles.wpDetailRow}>
          <Text style={styles.wpDetailLabel}>Description</Text>
          <Text style={[styles.wpDetailValue, { flex: 1, textAlign: 'right' }]}>
            {waypoint.description}
          </Text>
        </View>
      ) : null}
      {waypoint.notes ? (
        <View style={styles.wpNotes}>
          <Ionicons name="chatbubble-outline" size={12} color={colors.text.secondary} />
          <Text style={styles.wpNotesText}>{waypoint.notes}</Text>
        </View>
      ) : null}
    </View>
  );
};
