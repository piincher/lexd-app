/**
 * WaypointsSection - Upcoming, completed, and map placeholder sections
 */
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../../types';
import { TimelineWaypointCard } from '../../TimelineWaypointCard';

interface WaypointsSectionProps {
  waypoints: ContainerWaypoint[];
  upcomingWaypoints: ContainerWaypoint[];
  completedWaypoints: ContainerWaypoint[];
  styles: Record<string, any>;
}

export const WaypointsSection: React.FC<WaypointsSectionProps> = ({
  waypoints,
  upcomingWaypoints,
  completedWaypoints,
  styles,
}) => (
  <>
    {/* Journey Map Visualization */}
    {waypoints.some((w) => w.coordinates) && (
      <Animated.View entering={FadeInUp.delay(300)} style={styles.mapSection}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="map-outline" size={18} color={Theme.neutral[600]} />
          <Text style={styles.sectionTitle}>Aperçu du Parcours</Text>
        </View>
        <View style={styles.mapPlaceholder}>
          <LinearGradient
            colors={[Theme.colors.feedback.infoBg, Theme.colors.background.paper]}
            style={styles.mapGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="map" size={48} color={Theme.status.info} />
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
          <Ionicons name="time-outline" size={18} color={Theme.neutral[600]} />
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
          <Ionicons name="checkmark-circle" size={18} color={Theme.status.success} />
          <Text style={styles.sectionTitle}>Étapes Complétées</Text>
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
              +{completedWaypoints.length - 1} étapes précédentes complétées
            </Text>
          </View>
        )}
      </Animated.View>
    )}
  </>
);
