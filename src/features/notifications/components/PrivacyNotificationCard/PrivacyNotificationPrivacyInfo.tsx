import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './PrivacyNotificationCard.styles';

interface PrivacyNotificationPrivacyInfoProps {
  maskedPhone: string;
}

export const PrivacyNotificationPrivacyInfo: React.FC<PrivacyNotificationPrivacyInfoProps> = ({
  maskedPhone,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.privacyContainer}>
      <MaterialCommunityIcons name="shield-check" size={12} color={colors.text.secondary} />
      <Text style={styles.privacyText}>Contact: {maskedPhone}</Text>
    </View>
  );
};
