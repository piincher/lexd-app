/**
 * GoodsCardClient - Client name and phone display
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { ClientInfo } from '../types';

interface GoodsCardClientProps {
  clientId: string | ClientInfo;
}

export const GoodsCardClient: React.FC<GoodsCardClientProps> = ({ clientId }) => {
  const clientInfo = typeof clientId === 'string' ? null : clientId;
  const clientName = clientInfo ? `${clientInfo.firstName} ${clientInfo.lastName}` : '';
  const clientPhone = clientInfo ? clientInfo.phoneNumber : '';

  if (!clientName && !clientPhone) return null;

  return (
    <View style={styles.container}>
      {clientName && (
        <View style={styles.row}>
          <Ionicons name="person-outline" size={14} color={Theme.neutral[500]} />
          <Text style={styles.name} numberOfLines={1}>
            {clientName}
          </Text>
        </View>
      )}
      {clientPhone && (
        <View style={styles.row}>
          <Ionicons name="call-outline" size={14} color={Theme.neutral[500]} />
          <Text style={styles.phone} numberOfLines={1}>
            {clientPhone}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.sm,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: Theme.typography.caption.fontSize,
    lineHeight: Theme.typography.caption.lineHeight,
    letterSpacing: Theme.typography.caption.letterSpacing,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  phone: {
    fontSize: Theme.typography.caption.fontSize,
    lineHeight: Theme.typography.caption.lineHeight,
    letterSpacing: Theme.typography.caption.letterSpacing,
    color: Theme.neutral[500],
  },
});
