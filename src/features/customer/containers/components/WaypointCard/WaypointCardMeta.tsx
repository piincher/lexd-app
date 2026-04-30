import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '@src/shared/types/containerWaypoints';
import { useWaypointCardStyles } from './WaypointCard.styles';

interface WaypointCardMetaProps {
  waypoint: ContainerWaypoint;
  isCurrent: boolean;
}

const formatDateShort = (dateString?: string): string => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
  } catch {
    return dateString;
  }
};

export const WaypointCardMeta: React.FC<WaypointCardMetaProps> = ({ waypoint, isCurrent }) => {
  const { colors } = useAppTheme();
  const styles = useWaypointCardStyles();

  return (
    <>
      <View style={styles.wpTypeRow}>
        <View style={styles.wpTypeBadge}>
          <Ionicons
            name={(waypoint.segmentType === 'SEA' ? 'boat' :
                  waypoint.segmentType === 'AIR' ? 'airplane' :
                  waypoint.segmentType === 'ROAD' ? 'car' : 'cube') as any}
            size={12}
            color={colors.text.secondary}
          />
          <Text style={styles.wpTypeBadgeText}>
            {waypoint.segmentType || 'Transport'}
          </Text>
        </View>

        {isCurrent && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>POSITION ACTUELLE</Text>
          </View>
        )}
      </View>

      <View style={styles.wpQuickInfo}>
        {waypoint.actualArrival ? (
          <View style={styles.wpInfoItem}>
            <Ionicons name="calendar" size={12} color="#10B981" />
            <Text style={styles.wpInfoText}>
              Arrivé: {formatDateShort(waypoint.actualArrival)}
            </Text>
          </View>
        ) : waypoint.estimatedArrival ? (
          <View style={styles.wpInfoItem}>
            <Ionicons name="time-outline" size={12} color="#F59E0B" />
            <Text style={styles.wpInfoText}>
              Est. arrivée: {formatDateShort(waypoint.estimatedArrival)}
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
};
