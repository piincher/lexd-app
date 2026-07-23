import React from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { InAppNotification } from '../../types';
import { getStyles } from './NotificationDetailDataCard.styles';
import { TrackingSection } from './TrackingSection';
import { EntitiesSection } from './EntitiesSection';

interface NotificationDetailDataCardProps {
  data: InAppNotification['data'];
}

const hasTrackingData = (data: InAppNotification['data']): boolean =>
  !!data && (data.currentStatus !== undefined || data.nextWaypoint !== undefined || data.progressPercentage !== undefined);

const hasEntityData = (data: InAppNotification['data']): boolean =>
  !!data && ['orderId', 'containerId', 'ticketId', 'invoiceId', 'certificateId'].some((key) => data[key as keyof typeof data]);

export const NotificationDetailDataCard: React.FC<NotificationDetailDataCardProps> = ({ data }) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);

  if (!data || Object.keys(data).length === 0) return null;

  const showTracking = hasTrackingData(data);
  const showEntities = hasEntityData(data);

  if (!showTracking && !showEntities) return null;

  return (
    <Animated.View entering={FadeInUp.delay(300)}>
      <Surface style={styles.dataCard} elevation={0}>
        {showTracking && <TrackingSection data={data} styles={styles} colors={colors} />}
        {showTracking && showEntities && <View style={styles.divider} />}
        {showEntities && <EntitiesSection data={data} styles={styles} />}
      </Surface>
    </Animated.View>
  );
};
