import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import type { InAppNotification } from '../../types';

interface NotificationTrackingPreviewProps {
  data?: InAppNotification['data'];
}

export const NotificationTrackingPreview: React.FC<NotificationTrackingPreviewProps> = ({ data }) => {
  if (!data) return null;

  const preview = data.nextWaypoint
    ? `→ ${data.nextWaypoint.location}`
    : data.isFinalWaypoint
      ? '🏁 Destination finale'
      : null;

  if (!preview) return null;

  return <Text style={styles.trackingPreview}>{preview}</Text>;
};

const styles = StyleSheet.create({
  trackingPreview: {
    fontSize: 12,
    color: Theme.colors.primary.main,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
});
