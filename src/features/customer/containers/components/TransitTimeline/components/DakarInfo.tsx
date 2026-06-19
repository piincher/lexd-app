/**
 * DakarInfo - Dakar port arrival and onward road leg context
 */
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '../../../types';
import { createStyles } from '../TransitTimeline.styles';
import { formatTimestamp } from './TimelineDateMarker';

type Styles = ReturnType<typeof createStyles>;

interface DakarInfoProps {
  dakarWaypoint: ContainerWaypoint;
  waypoints: ContainerWaypoint[];
  styles: Styles;
}

export const DakarInfo: React.FC<DakarInfoProps> = ({ dakarWaypoint, waypoints, styles }) => {
  const { colors } = useAppTheme();

  const roadLeg = useMemo(
    () =>
      waypoints.find(
        (w) =>
          w.transportMode === 'ROAD' &&
          (w.routeDetails ||
            w.borderCrossing ||
            w.roadDetails?.routeDetails ||
            w.roadDetails?.borderCrossing ||
            w.location?.toLowerCase().includes('bamako')),
      ),
    [waypoints],
  );

  const legRouteDetails = roadLeg?.routeDetails || roadLeg?.roadDetails?.routeDetails;
  const legBorderCrossing = roadLeg?.borderCrossing || roadLeg?.roadDetails?.borderCrossing;

  return (
  <Animated.View entering={FadeInUp.delay(750)} style={styles.dakarInfoCard}>
    <LinearGradient colors={[colors.feedback.successBg, colors.background.paper]} style={styles.dakarInfoGradient}>
      <View style={styles.dakarInfoHeader}>
        <Ionicons name="boat" size={24} color={colors.status.success} />
        <Text style={styles.dakarInfoTitle}>Port d&apos;Arrivée Principal</Text>
      </View>
      <Text style={styles.dakarInfoText}>
        Votre conteneur arrive à <Text style={styles.dakarInfoHighlight}>Dakar, Sénégal</Text>.
        {' '}Après le déchargement au port de Dakar, il partira par route vers{' '}
        <Text style={styles.dakarInfoHighlight}>Bamako, Mali</Text>.
        {legBorderCrossing
          ? ` Le dédouanement aura lieu à la frontière ${legBorderCrossing}.`
          : ''}
      </Text>
      {roadLeg && (
        <View style={{ marginTop: 8 }}>
          {legRouteDetails && (
            <Text style={styles.dakarInfoETA}>
              🛣️ Itinéraire : {legRouteDetails}
            </Text>
          )}
          {legBorderCrossing && (
            <Text style={styles.dakarInfoETA}>
              🛂 Passage frontalier : {legBorderCrossing}
            </Text>
          )}
        </View>
      )}
      {dakarWaypoint.estimatedArrival && (
        <Text style={styles.dakarInfoETA}>
          📅 Arrivée estimée à Dakar : {formatTimestamp(dakarWaypoint.estimatedArrival)}
        </Text>
      )}
    </LinearGradient>
  </Animated.View>
  );
};
