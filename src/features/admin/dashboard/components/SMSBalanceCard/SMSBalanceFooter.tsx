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
    // Expired but still has credits
    if (balance.hasExpired && balance.totalUnits > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={[styles.footerStrong, { color: metaColor }]}>
              {balance.expiredCount && balance.expiredCount > 1
                ? `${balance.expiredCount} abonnements expirés`
                : 'Abonnement expiré'}
            </Text>
          </Text>
          <Text style={styles.footerText}>
            <Text style={styles.footerStrong}>{balance.totalUnits.toLocaleString()}</Text> SMS restants
          </Text>
        </View>
      );
    }

    // Expired with no credits
    if (balance.hasExpired) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <Text style={[styles.footerStrong, { color: metaColor }]}>
              Abonnement expiré
            </Text>
          </Text>
          <Text style={styles.footerText}>
            Aucun SMS disponible
          </Text>
        </View>
      );
    }

    // Expiring soon
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={[styles.footerStrong, { color: metaColor }]}>
            {balance.daysRemaining} jours
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
