import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PrivacyNotificationCard.styles';

interface PrivacyNotificationHeaderProps {
  typeConfig: {
    backgroundColor: string;
    iconColor: string;
    label: string;
  };
  timeAgo: string;
}

export const PrivacyNotificationHeader: React.FC<PrivacyNotificationHeaderProps> = ({
  typeConfig,
  timeAgo,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <View style={[styles.typeBadge, { backgroundColor: typeConfig.backgroundColor }]}>
        <Text style={[styles.typeText, { color: typeConfig.iconColor }]}>{typeConfig.label}</Text>
      </View>
      <Text style={styles.timeAgo}>{timeAgo}</Text>
    </View>
  );
};
