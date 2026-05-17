import React from 'react';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PrivacyNotificationCard.styles';
import type { PublicNotification } from '../../types';

type PrivacyNotificationMessageProps = Pick<
  PublicNotification,
  'type' | 'maskedUserName' | 'location' | 'containerNumber' | 'destination'
>;

export const PrivacyNotificationMessage: React.FC<PrivacyNotificationMessageProps> = ({
  type,
  maskedUserName,
  location,
  containerNumber,
  destination,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (type === 'GOODS_ARRIVED') {
    return (
      <Text style={styles.message}>
        <Text style={styles.highlight}>{maskedUserName}'s</Text>
        <Text style={styles.messageText}> goods arrived at </Text>
        <Text style={styles.location}>Warehouse {location}</Text>
      </Text>
    );
  }

  if (type === 'GOODS_ASSIGNED') {
    return (
      <Text style={styles.message}>
        <Text style={styles.highlight}>{maskedUserName}'s</Text>
        <Text style={styles.messageText}> goods assigned to </Text>
        <Text style={styles.containerLabel}>Container {containerNumber}</Text>
        {destination && (
          <>
            <Text style={styles.messageText}>{'\n'}Destination: </Text>
            <Text style={styles.destination}>{destination}</Text>
          </>
        )}
      </Text>
    );
  }

  return <Text style={styles.message}>{maskedUserName} - {location}</Text>;
};
