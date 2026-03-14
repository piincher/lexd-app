/**
 * TrackingHeader Component
 * 
 * Displays the header with tracking number and status badge.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface TrackingHeaderProps {
  trackingNumber: string;
  statusLabel: string;
  statusColor: string;
  statusIcon: string;
  onBack: () => void;
  onShare: () => void;
}

const AnimatedSurface = Animated.createAnimatedComponent(Surface);

export const TrackingHeader: React.FC<TrackingHeaderProps> = ({
  trackingNumber,
  statusLabel,
  statusColor,
  statusIcon,
  onBack,
  onShare,
}) => {
  return (
    <>
      <Surface style={styles.header} elevation={2}>
        <IconButton icon="arrow-left" onPress={onBack} />
        <Text style={styles.headerTitle}>Résultat du Suivi</Text>
        <IconButton icon="share-variant" onPress={onShare} />
      </Surface>

      <AnimatedSurface entering={FadeInDown.duration(400)} style={styles.trackingCard}>
        <Text style={styles.trackingLabel}>Numéro de Suivi</Text>
        <Text style={styles.trackingNumber}>{trackingNumber}</Text>
        <View style={styles.statusBadge}>
          <MaterialCommunityIcons name={statusIcon as any} size={20} color={statusColor} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </AnimatedSurface>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.sm,
    height: 56,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Theme.neutral[800],
  },
  trackingCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    alignItems: 'center',
    margin: Theme.spacing.lg,
  },
  trackingLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Theme.neutral[500],
  },
  trackingNumber: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Theme.neutral[800],
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[100],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.lg,
    gap: Theme.spacing.sm,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
