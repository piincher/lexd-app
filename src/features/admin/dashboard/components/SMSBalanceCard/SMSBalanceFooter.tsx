import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './SMSBalanceCard.styles';
import type { Balance } from './types';

interface SMSBalanceFooterProps {
  balance: Balance;
  metaColor: string;
  metaLabel: string;
}

export const SMSBalanceFooter: React.FC<SMSBalanceFooterProps> = ({
  balance,
  metaColor,
  metaLabel,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const showExpiry =
    balance.hasExpired ||
    balance.hasExpiringSoon ||
    (balance.daysRemaining !== undefined && balance.daysRemaining <= 30);

  if (showExpiry && balance.expirationDateShort) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={[styles.footerStrong, { color: metaColor }]}>
            {balance.hasExpired ? 'Expiré' : `${balance.daysRemaining} jours`}
          </Text>{' '}
          restants
        </Text>
        <Text style={styles.footerText}>
          Expire le <Text style={styles.footerStrong}>{balance.expirationDateShort}</Text>
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        <Text style={styles.footerStrong}>{balance.totalUnits.toLocaleString()}</Text> SMS disponibles
      </Text>
      <Text style={styles.footerText}>
        Statut <Text style={[styles.footerStrong, { color: metaColor }]}>{metaLabel}</Text>
      </Text>
    </View>
  );
};
