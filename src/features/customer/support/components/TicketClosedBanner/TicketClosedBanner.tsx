/**
 * TicketClosedBanner Component
 * Shows when ticket is resolved/closed and cannot receive messages
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { TicketStatus } from '../../types';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface TicketClosedBannerProps {
  status: TicketStatus;
}

export const TicketClosedBanner: React.FC<TicketClosedBannerProps> = ({ status }) => {
  const { colors, isDark } = useAppTheme();
  const statusText = status === 'RESOLVED' ? 'résolu' : 'fermé';

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.neutral[200],
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    text: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      marginLeft: 8,
    },
  }), [colors, isDark]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="lock-outline" size={20} color={colors.text.secondary} />
      <Text style={styles.text}>
        Ce ticket est {statusText}. Vous ne pouvez plus envoyer de messages.
      </Text>
    </View>
  );
};
