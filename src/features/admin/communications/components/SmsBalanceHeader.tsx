/**
 * SmsBalanceHeader
 * SRP: Screen header with back button, title, and live SMS balance indicator
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

interface SmsBalanceHeaderProps {
  smsBalance: number;
  onBack: () => void;
}

export const SmsBalanceHeader: React.FC<SmsBalanceHeaderProps> = ({
  smsBalance,
  onBack,
}) => {
  const balanceStatus =
    smsBalance > 100 ? 'good' : smsBalance > 20 ? 'low' : 'critical';
  const statusColor =
    balanceStatus === 'good'
      ? '#10B981'
      : balanceStatus === 'low'
        ? '#F59E0B'
        : '#EF4444';

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={Theme.neutral[800]} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Envoyer SMS</Text>
          <Text style={styles.subtitle}>Messagerie groupee</Text>
        </View>
      </View>

      <View style={[styles.balancePill, { backgroundColor: statusColor + '15' }]}>
        <Ionicons name="chatbubble-ellipses" size={14} color={statusColor} />
        <Text style={[styles.balanceText, { color: statusColor }]}>
          {smsBalance} SMS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Theme.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 1,
  },
  balancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  balanceText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
});
