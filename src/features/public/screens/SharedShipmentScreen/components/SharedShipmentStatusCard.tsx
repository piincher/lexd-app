import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface Props {
  reference: string;
  status: string;
  type: 'goods' | 'container' | 'order';
}

const TYPE_LABELS: Record<string, string> = {
  goods: 'Marchandise',
  container: 'Container',
  order: 'Commande',
};

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
  Pending: 'clock-outline',
  Active: 'progress-check',
  Cancelled: 'close-circle',
};

const STATUS_LABELS: Record<string, string> = {
  RECEIVED_AT_WAREHOUSE: 'Reçu à l\'entrepôt',
  PACKED: 'Emballé',
  ASSIGNED_TO_CONTAINER: 'Assigné au container',
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
  Pending: 'En Attente',
  Active: 'Actif',
  Cancelled: 'Annulé',
};

const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case 'RECEIVED_AT_WAREHOUSE':
    case 'BOOKED':
      return colors.status.info;
    case 'PACKED':
    case 'ASSIGNED_TO_CONTAINER':
    case 'LOADING':
      return colors.status.info;
    case 'LOADED_IN_CONTAINER':
    case 'LOADED':
      return colors.status.info;
    case 'IN_TRANSIT':
    case 'Active':
      return colors.status.warning;
    case 'ARRIVED_DESTINATION':
    case 'ARRIVED':
    case 'DISCHARGED':
    case 'READY_FOR_PICKUP':
    case 'DELIVERED':
      return colors.status.success;
    case 'Pending':
      return colors.text.secondary;
    case 'Cancelled':
      return colors.status.error;
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

export const SharedShipmentStatusCard: React.FC<Props> = ({ reference, status, type }) => {
  const { colors } = useAppTheme();
  const config = getStatusConfig(status, colors);

  const styles = useMemo(() => StyleSheet.create({
    card: {
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      alignItems: 'center',
    },
    typeLabel: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    reference: {
      fontFamily: Fonts.bold,
      fontSize: 22,
      color: colors.text.primary,
      marginTop: Theme.spacing.xs,
      marginBottom: Theme.spacing.md,
      textAlign: 'center',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      paddingHorizontal: Theme.spacing.md,
      paddingVertical: Theme.spacing.sm,
      borderRadius: Theme.radius.lg,
      gap: Theme.spacing.sm,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
  }), [colors]);

  return (
    <Surface style={styles.card}>
      <Text style={styles.typeLabel}>{TYPE_LABELS[type] || type}</Text>
      <Text style={styles.reference}>{reference}</Text>
      <View style={styles.badge}>
        <MaterialCommunityIcons name={config.icon as any} size={20} color={config.color} />
        <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
      </View>
    </Surface>
  );
};
