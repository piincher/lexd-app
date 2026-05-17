import React from 'react';
import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import type { InAppNotification } from '../../types';

interface TrackingSectionProps {
  data: NonNullable<InAppNotification['data']>;
  styles: ReturnType<typeof import('./NotificationDetailDataCard.styles').getStyles>;
  colors: any;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ data, styles, colors }) => (
  <View style={styles.trackingSection}>
    <Text style={styles.dataTitle}>📍 Suivi du conteneur</Text>

    {data.progressPercentage !== undefined && data.totalWaypoints !== undefined && (
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>
          Progression : {data.completedWaypoints ?? 0} / {data.totalWaypoints} ({data.progressPercentage}%)
        </Text>
        <ProgressBar progress={Math.min(data.progressPercentage / 100, 1)} color={colors.status.success} />
      </View>
    )}

    {data.currentStatus && (
      <View style={styles.trackingItem}>
        <Text style={styles.trackingBullet}>●</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.trackingText}>Statut actuel : {data.currentStatus}</Text>
          {data.currentLocation && <Text style={styles.trackingSubtext}>📍 {data.currentLocation}</Text>}
        </View>
      </View>
    )}

    {data.completedWaypoint && (
      <View style={styles.trackingItem}>
        <Text style={styles.trackingBullet}>✓</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.trackingText}>Étape accomplie : {data.completedWaypoint.location}</Text>
          {data.completedWaypoint.transportInfo && (
            <Text style={styles.trackingSubtext}>🚛 {data.completedWaypoint.transportInfo}</Text>
          )}
        </View>
      </View>
    )}

    {data.nextWaypoint && (
      <View style={styles.trackingItem}>
        <Text style={styles.trackingBullet}>→</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.trackingText}>Prochaine étape : {data.nextWaypoint.location}</Text>
          {data.nextWaypoint.estimatedArrival && (
            <Text style={styles.trackingSubtext}>
              📅 Arrivée estimée : {new Date(data.nextWaypoint.estimatedArrival).toLocaleDateString('fr-FR')}
            </Text>
          )}
          {data.nextWaypoint.transportInfo && (
            <Text style={styles.trackingSubtext}>🚛 {data.nextWaypoint.transportInfo}</Text>
          )}
        </View>
      </View>
    )}

    {data.isFinalWaypoint && (
      <View style={styles.trackingItem}>
        <Text style={styles.trackingBullet}>🏁</Text>
        <Text style={styles.trackingText}>Destination finale atteinte</Text>
      </View>
    )}
  </View>
);
