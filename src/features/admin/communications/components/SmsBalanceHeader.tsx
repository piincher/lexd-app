/**
 * SmsBalanceHeader
 * SRP: Screen header with back button, title, and live SMS balance indicator
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '@src/constants/Fonts';

interface SmsBalanceHeaderProps {
  smsBalance: number;
  hasExpiringSoon?: boolean;
  hasExpired?: boolean;
  onBack: () => void;
}

export const SmsBalanceHeader: React.FC<SmsBalanceHeaderProps> = ({
  smsBalance,
  hasExpiringSoon = false,
  hasExpired = false,
  onBack,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const balanceStatus =
    hasExpired ? 'critical' :
    hasExpiringSoon ? 'low' :
    smsBalance > 100 ? 'good' :
    smsBalance > 20 ? 'low' : 'critical';

  const statusColor =
    balanceStatus === 'good'
      ? colors.status.success
      : balanceStatus === 'low'
        ? colors.status.warning
        : colors.status.error;

  const alertIcon = hasExpired ? 'alert-circle' : hasExpiringSoon ? 'warning' : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={Theme.neutral[800]} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Envoyer SMS</Text>
          <Text style={styles.subtitle}>Messagerie groupée</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={22}
          color={Theme.neutral[800]}
        />
        <View style={[styles.balancePill, { backgroundColor: statusColor + '15' }]}>
          {alertIcon && (
            <Ionicons name={alertIcon as any} size={14} color={statusColor} style={{ marginRight: 4 }} />
          )}
          <Ionicons name="chatbubble-ellipses" size={14} color={statusColor} />
          <Text style={[styles.balanceText, { color: statusColor }]}>
            {smsBalance} SMS
          </Text>
        </View>
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
    backgroundColor: Theme.colors.background.card,
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

export default SmsBalanceHeader;
