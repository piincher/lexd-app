import { useAppTheme } from '@src/providers/ThemeProvider';
/**
 * WaypointsSection - Upcoming, completed, and map placeholder sections
 */
import React from 'react';
import { View, Text, type ImageStyle, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ContainerWaypoint } from '../../../types';
import { TimelineWaypointCard } from '../../TimelineWaypointCard';

type WaypointsSectionStyles = Record<string, StyleProp<ViewStyle | TextStyle | ImageStyle>>;

interface WaypointsSectionProps {
  waypoints: ContainerWaypoint[];
  upcomingWaypoints: ContainerWaypoint[];
  completedWaypoints: ContainerWaypoint[];
  styles: WaypointsSectionStyles;
}

export const WaypointsSection: React.FC<WaypointsSectionProps> = ({
  waypoints,
  upcomingWaypoints,
  completedWaypoints,
  styles,
}) => {
  const { colors } = useAppTheme();
  return (
  <>
    {/* Journey Map Visualization */}
    {waypoints.some((w) => w.coordinates) && (
      <Animated.View entering={FadeInUp.delay(300)} style={styles.mapSection}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="map-outline" size={18} color={colors.neutral[600]} />
          <Text style={styles.sectionTitle}>Aperçu du Parcours</Text>
        </View>
        <View style={styles.mapPlaceholder}>
          <LinearGradient
            colors={[colors.feedback.infoBg, colors.background.paper]}
            style={styles.mapGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="map" size={48} color={colors.status.info} />
            <Text style={styles.mapPlaceholderText}>Carte du Trajet</Text>
            <Text style={styles.mapPlaceholderSubtext}>
              {waypoints.filter((w) => w.coordinates).length} points de localisation disponibles
            </Text>
          </LinearGradient>
        </View>
      </Animated.View>
    )}

    {/* Upcoming Waypoints Section */}
    {upcomingWaypoints.length > 0 && (
      <Animated.View entering={FadeInUp.delay(400)} style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="time-outline" size={18} color={colors.neutral[600]} />
          <Text style={styles.sectionTitle}>Prochaines Étapes</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{upcomingWaypoints.length}</Text>
          </View>
        </View>
        {upcomingWaypoints.slice(0, 3).map((waypoint, index) => (
          <TimelineWaypointCard
            key={`upcoming-${waypoint.locationCode}-${index}`}
            waypoint={waypoint}
            isCurrent={false}
            isCompleted={false}
          />
        ))}
        {upcomingWaypoints.length > 3 && (
          <View style={styles.moreWaypoints}>
            <Text style={styles.moreWaypointsText}>
              +{upcomingWaypoints.length - 3} étapes supplémentaires
            </Text>
          </View>
        )}
      </Animated.View>
    )}

    {/* Completed Waypoints Section (Collapsed) */}
    {completedWaypoints.length > 0 && (
      <Animated.View entering={FadeInUp.delay(500)} style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="checkmark-circle" size={18} color={colors.status.success} />
          <Text style={styles.sectionTitle}>Étapes terminées</Text>
          <View style={[styles.badge, styles.badgeSuccess]}>
            <Text style={[styles.badgeText, styles.badgeTextSuccess]}>
              {completedWaypoints.length}
            </Text>
          </View>
        </View>
        <TimelineWaypointCard
          waypoint={completedWaypoints[completedWaypoints.length - 1]}
          isCurrent={false}
          isCompleted={true}
        />
        {completedWaypoints.length > 1 && (
          <View style={styles.moreWaypoints}>
            <Text style={styles.moreWaypointsText}>
              +{completedWaypoints.length - 1} étapes précédentes terminées
            </Text>
          </View>
        )}
      </Animated.View>
    )}
  </>
  );
};
