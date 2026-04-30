import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { LocationCategory } from '../types/waypointStatus';

interface WaypointLocationDetailsProps {
  locationCategory: LocationCategory;
  delay?: number;
}

export const WaypointLocationDetails: React.FC<WaypointLocationDetailsProps> = ({
  locationCategory,
  delay = 0,
}) => {
  if (locationCategory !== 'DISCHARGE_PORT' && locationCategory !== 'BORDER') {
    return null;
  }

  return (
    <Animated.View entering={FadeIn.delay(delay)} style={styles.section}>
      {locationCategory === 'DISCHARGE_PORT' && (
        <>
          <View style={styles.sectionHeader}>
            <Ionicons name="boat" size={18} color={Theme.status.info} />
            <Text style={styles.sectionTitle}>Détails Portuaires</Text>
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={Theme.status.info} />
            <Text style={styles.infoText}>
              Pour les détails du navire (nom, IMO, etc.), utilisez l&apos;onglet &quot;Segments Maritimes&quot;
            </Text>
          </View>
        </>
      )}

      {locationCategory === 'BORDER' && (
        <>
          <View style={styles.sectionHeader}>
            <Ionicons name="flag" size={18} color={Theme.status.warning} />
            <Text style={styles.sectionTitle}>Informations Frontière</Text>
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color={Theme.status.warning} />
            <Text style={styles.infoText}>
              Pour les détails du transport routier, utilisez l&apos;onglet &quot;Segments Routiers&quot;
            </Text>
          </View>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.primary[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Theme.neutral[600],
  },
});
