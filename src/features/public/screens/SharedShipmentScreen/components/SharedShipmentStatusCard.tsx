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

const STATUS_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  RECEIVED_AT_WAREHOUSE: { color: '#6366F1', icon: 'package-variant', label: 'Reçu à l\'entrepôt' },
  PACKED: { color: '#3B82F6', icon: 'package-variant-closed', label: 'Emballé' },
  ASSIGNED_TO_CONTAINER: { color: '#3B82F6', icon: 'ferry', label: 'Assigné au container' },
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
  Pending: { color: '#6B7280', icon: 'clock-outline', label: 'En Attente' },
  Active: { color: '#F59E0B', icon: 'progress-check', label: 'Actif' },
  Delivered: { color: '#059669', icon: 'check-circle', label: 'Livré' },
  Cancelled: { color: '#EF4444', icon: 'close-circle', label: 'Annulé' },
};

const getStatusConfig = (status: string) => {
  return STATUS_CONFIG[status] || { color: '#6B7280', icon: 'help-circle', label: status };
};

export const SharedShipmentStatusCard: React.FC<Props> = ({ reference, status, type }) => {
  const { colors } = useAppTheme();
  const config = getStatusConfig(status);

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
