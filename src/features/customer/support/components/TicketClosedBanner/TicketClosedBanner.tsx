/**
 * TicketClosedBanner Component
 * Shows when ticket is resolved/closed and cannot receive messages
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { TicketStatus } from '../../types';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface TicketClosedBannerProps {
  status: TicketStatus;
}

export const TicketClosedBanner: React.FC<TicketClosedBannerProps> = ({ status }) => {
  const statusText = status === 'RESOLVED' ? 'résolu' : 'fermé';

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.DimGray} />
      <Text style={styles.text}>
        Ce ticket est {statusText}. Vous ne pouvez plus envoyer de messages.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Silver,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: COLORS.DimGray,
    marginLeft: 8,
  },
});
