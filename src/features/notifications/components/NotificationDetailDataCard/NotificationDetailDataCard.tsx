import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, ProgressBar } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../../types';

interface NotificationDetailDataCardProps {
  data: InAppNotification['data'];
}

const DATA_FIELDS: { key: 'orderId' | 'containerId' | 'ticketId' | 'invoiceId' | 'certificateId'; label: string }[] = [
  { key: 'orderId', label: 'Commande' },
  { key: 'containerId', label: 'Conteneur' },
  { key: 'ticketId', label: 'Ticket' },
  { key: 'invoiceId', label: 'Facture' },
  { key: 'certificateId', label: 'Certificat' },
];

const hasTrackingData = (data: InAppNotification['data']): boolean =>
  !!data && (data.currentStatus !== undefined || data.nextWaypoint !== undefined || data.progressPercentage !== undefined);

const hasEntityData = (data: InAppNotification['data']): boolean =>
  !!data && DATA_FIELDS.some((field) => data[field.key]);

export const NotificationDetailDataCard: React.FC<NotificationDetailDataCardProps> = ({ data }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        dataCard: {
          margin: 16,
          marginTop: 0,
          padding: 20,
          borderRadius: 16,
          backgroundColor: colors.background.card,
        },
        dataTitle: {
          fontFamily: Fonts.bold,
          fontSize: 16,
          color: colors.text.primary,
          marginBottom: 12,
        },
        dataItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        dataLabel: {
          fontFamily: Fonts.medium,
          fontSize: 14,
          color: colors.text.secondary,
        },
        dataValue: {
          fontFamily: Fonts.bold,
          fontSize: 14,
          color: colors.text.primary,
        },
        progressContainer: {
          marginBottom: 12,
        },
        progressLabel: {
          fontFamily: Fonts.medium,
          fontSize: 12,
          color: colors.text.secondary,
          marginBottom: 4,
        },
        trackingSection: {
          marginBottom: 16,
        },
        trackingItem: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 6,
        },
        trackingBullet: {
          fontFamily: Fonts.bold,
          fontSize: 14,
          color: colors.status.success,
          marginRight: 8,
          marginTop: 2,
        },
        trackingText: {
          fontFamily: Fonts.regular,
          fontSize: 14,
          color: colors.text.primary,
          flex: 1,
          lineHeight: 20,
        },
        trackingSubtext: {
          fontFamily: Fonts.regular,
          fontSize: 12,
          color: colors.text.secondary,
          marginTop: 2,
        },
        divider: {
          height: 1,
          backgroundColor: colors.border,
          marginVertical: 12,
        },
      }),
    [colors]
  );

  if (!data || Object.keys(data).length === 0) return null;

  const showTracking = hasTrackingData(data);
  const showEntities = hasEntityData(data);

  if (!showTracking && !showEntities) return null;

  return (
    <Animated.View entering={FadeInUp.delay(300)}>
      <Surface style={styles.dataCard} elevation={1}>
        {showTracking && (
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
                  {data.currentLocation && (
                    <Text style={styles.trackingSubtext}>📍 {data.currentLocation}</Text>
                  )}
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
        )}

        {showTracking && showEntities && <View style={styles.divider} />}

        {showEntities && (
          <>
            <Text style={styles.dataTitle}>Informations associées</Text>
            {DATA_FIELDS.map(
              (field) =>
                data[field.key] && (
                  <View key={field.key} style={styles.dataItem}>
                    <Text style={styles.dataLabel}>{field.label}</Text>
                    <Text style={styles.dataValue}>#{String(data[field.key]).slice(-6)}</Text>
                  </View>
                )
            )}
          </>
        )}
      </Surface>
    </Animated.View>
  );
};
