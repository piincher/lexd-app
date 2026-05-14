import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '../types';
import {
  ExtendedWaypointStatus,
  LocationCategory,
  getExtendedStatusColor,
} from '../types/waypointStatus';

interface WaypointModalHeaderProps {
  status: ExtendedWaypointStatus;
  locationCategory: LocationCategory;
  locationCode: string;
  waypoint: ContainerWaypoint | null;
  onDismiss: () => void;
}

export const WaypointModalHeader: React.FC<WaypointModalHeaderProps> = ({
  status,
  locationCategory,
  locationCode,
  waypoint,
  onDismiss,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const getLocationTitle = (): string => {
    switch (locationCategory) {
      case 'DISCHARGE_PORT':
        return 'Port de Déchargement';
      case 'BORDER':
        return 'Point de Frontière';
      case 'WAREHOUSE':
        return 'Entrepôt';
      case 'LOADING_PORT':
        return 'Port de Chargement';
      case 'TRANSIT_PORT':
        return 'Port de Transit';
      default:
        return 'Waypoint';
    }
  };

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.headerIcon,
          { backgroundColor: getExtendedStatusColor(status) + (isDark ? '35' : '15') },
        ]}
      >
        <Ionicons name="location" size={28} color={getExtendedStatusColor(status)} />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>{getLocationTitle()}</Text>
        <Text style={styles.headerSubtitle}>
          {waypoint?.location?.city || waypoint?.location?.toString() || 'Location'}
          {locationCode && ` (${locationCode})`}
        </Text>
        {locationCategory === 'DISCHARGE_PORT' && (
          <View style={styles.portBadge}>
            <Text style={styles.portBadgeText}>🚢 PORT PRINCIPAL</Text>
          </View>
        )}
        {locationCategory === 'BORDER' && (
          <View style={[styles.portBadge, { backgroundColor: colors.status.warning + '15' }]}>
            <Text style={[styles.portBadgeText, { color: '#D97706' }]}>🛂 FRONTIÈRE</Text>
          </View>
        )}
        {locationCategory === 'WAREHOUSE' && (
          <View style={[styles.portBadge, { backgroundColor: colors.status.info + '12' }]}>
            <Text style={[styles.portBadgeText, { color: '#4338CA' }]}>📦 ENTREPÔT</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
        <Ionicons name="close" size={24} color={colors.neutral[500]} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[800],
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 2,
  },
  portBadge: {
    backgroundColor: colors.status.success + '18',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.radius.full,
    alignSelf: 'flex-start',
    marginTop: Theme.spacing.xs,
  },
  portBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  closeButton: {
    padding: Theme.spacing.sm,
  },
});
