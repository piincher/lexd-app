import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { SharedShipmentTimelineItem } from '../../../api/shareApi';
import { Theme } from '@src/constants/Theme';

interface Props {
  timeline: SharedShipmentTimelineItem[];
}

const STATUS_ICONS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'package-variant',
  PACKED: 'package-variant-closed',
  ASSIGNED_TO_CONTAINER: 'ferry',
  LOADED_IN_CONTAINER: 'ferry',
  IN_TRANSIT: 'truck-fast',
  ARRIVED_DESTINATION: 'map-marker-check',
  READY_FOR_PICKUP: 'store-check',
  DELIVERED: 'check-circle',
  BOOKED: 'book-check',
  LOADING: 'loading',
  LOADED: 'ferry',
  ARRIVED: 'map-marker-check',
  DISCHARGED: 'download',
  received: 'package-variant',
  in_container: 'ferry',
  shipped: 'ferry',
  pending: 'clock-outline',
};

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'Reçu à l\'entrepôt',
  PACKED: 'Emballé',
  ASSIGNED_TO_CONTAINER: 'Assigné',
  LOADED_IN_CONTAINER: 'Chargé',
  IN_TRANSIT: 'En Transit',
  ARRIVED_DESTINATION: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
  BOOKED: 'Réservé',
  LOADING: 'Chargement',
  LOADED: 'Chargé',
  ARRIVED: 'Arrivé',
  DISCHARGED: 'Déchargé',
  received: 'Reçu',
  in_container: 'En Container',
  shipped: 'Expédié',
  pending: 'En Attente',
};

const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case 'RECEIVED_AT_WAREHOUSE':
    case 'BOOKED':
    case 'received':
      return colors.status.info;
    case 'PACKED':
    case 'ASSIGNED_TO_CONTAINER':
    case 'LOADING':
    case 'in_container':
      return colors.status.info;
    case 'LOADED_IN_CONTAINER':
    case 'LOADED':
    case 'shipped':
      return colors.status.info;
    case 'IN_TRANSIT':
      return colors.status.warning;
    case 'ARRIVED_DESTINATION':
    case 'ARRIVED':
    case 'DISCHARGED':
    case 'READY_FOR_PICKUP':
    case 'DELIVERED':
      return colors.status.success;
    case 'pending':
      return colors.text.secondary;
    default:
      return colors.text.secondary;
  }
};

const getStatusConfig = (status: string, colors: any) => {
  return {
    color: getStatusColor(status, colors),
    icon: STATUS_ICONS[status] || 'help-circle',
    label: STATUS_LABELS[status] || status,
  };
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
          const config = getStatusConfig(event.status, colors);

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
