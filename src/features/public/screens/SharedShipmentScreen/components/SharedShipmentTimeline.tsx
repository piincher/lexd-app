import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';
import { SharedShipmentTimelineItem } from '../../../api/shareApi';

interface Props {
  timeline: SharedShipmentTimelineItem[];
}

const STATUS_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  RECEIVED_AT_WAREHOUSE: { color: '#6366F1', icon: 'package-variant', label: 'Reçu à l\'entrepôt' },
  PACKED: { color: '#3B82F6', icon: 'package-variant-closed', label: 'Emballé' },
  ASSIGNED_TO_CONTAINER: { color: '#3B82F6', icon: 'ferry', label: 'Assigné' },
  LOADED_IN_CONTAINER: { color: '#0EA5E9', icon: 'ferry', label: 'Chargé' },
  IN_TRANSIT: { color: '#F59E0B', icon: 'truck-fast', label: 'En Transit' },
  ARRIVED_DESTINATION: { color: '#10B981', icon: 'map-marker-check', label: 'Arrivé' },
  READY_FOR_PICKUP: { color: '#059669', icon: 'store-check', label: 'Prêt pour retrait' },
  DELIVERED: { color: '#059669', icon: 'check-circle', label: 'Livré' },
  BOOKED: { color: '#6366F1', icon: 'book-check', label: 'Réservé' },
  LOADING: { color: '#3B82F6', icon: 'loading', label: 'Chargement' },
  LOADED: { color: '#0EA5E9', icon: 'ferry', label: 'Chargé' },
  ARRIVED: { color: '#10B981', icon: 'map-marker-check', label: 'Arrivé' },
  DISCHARGED: { color: '#10B981', icon: 'download', label: 'Déchargé' },
  received: { color: '#6366F1', icon: 'package-variant', label: 'Reçu' },
  in_container: { color: '#3B82F6', icon: 'ferry', label: 'En Container' },
  shipped: { color: '#0EA5E9', icon: 'ferry', label: 'Expédié' },
  pending: { color: Theme.colors.text.secondary, icon: 'clock-outline', label: 'En Attente' },
};

const getStatusConfig = (status: string) => {
  return STATUS_CONFIG[status] || { color: Theme.colors.text.secondary, icon: 'help-circle', label: status };
};

export const SharedShipmentTimeline: React.FC<Props> = ({ timeline }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    card: {
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      marginTop: Theme.spacing.lg,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      marginBottom: Theme.spacing.md,
    },
    container: {
      paddingTop: Theme.spacing.sm,
    },
    item: {
      flexDirection: 'row',
    },
    left: {
      width: 24,
      alignItems: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: colors.border,
      marginVertical: 4,
    },
    content: {
      flex: 1,
      paddingLeft: Theme.spacing.md,
      paddingBottom: Theme.spacing.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statusText: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: colors.text.primary,
    },
    date: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
    },
    location: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
    },
    description: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 4,
    },
    empty: {
      alignItems: 'center',
      paddingVertical: Theme.spacing.xl,
    },
    emptyText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.disabled,
      marginTop: Theme.spacing.md,
    },
  }), [colors]);

  if (!timeline || timeline.length === 0) {
    return (
      <Surface style={styles.card}>
        <Text style={styles.title}>Historique</Text>
        <View style={styles.empty}>
          <MaterialCommunityIcons name="timeline-clock" size={48} color={colors.text.disabled} />
          <Text style={styles.emptyText}>Aucun historique disponible</Text>
        </View>
      </Surface>
    );
  }

  return (
    <Surface style={styles.card}>
      <Text style={styles.title}>Historique</Text>
      <View style={styles.container}>
        {timeline.map((event, index) => {
          const isLast = index === timeline.length - 1;
          const config = getStatusConfig(event.status);

          return (
            <View key={index} style={styles.item}>
              <View style={styles.left}>
                <View style={[styles.dot, { backgroundColor: config.color }]} />
                {!isLast && <View style={styles.line} />}
              </View>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.statusText}>{config.label}</Text>
                  <Text style={styles.date}>
                    {new Date(event.timestamp).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </Text>
                </View>
                <Text style={styles.location}>{event.location}</Text>
                {event.description && (
                  <Text style={styles.description}>{event.description}</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Surface>
  );
};
