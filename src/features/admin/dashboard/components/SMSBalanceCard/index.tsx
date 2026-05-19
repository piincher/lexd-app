import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './SMSBalanceCard.styles';
import { SMSBalanceHeader } from './SMSBalanceHeader';
import { SMSBalanceValue } from './SMSBalanceValue';
import { SMSBalanceFooter } from './SMSBalanceFooter';
import type { Balance } from './types';

interface SMSBalanceCardProps {
  balance: Balance;
}

const STATUS_META = (
  colors: any
): Record<
  Balance['status'],
  { label: string; color: string; icon: string; gradient: readonly [string, string, string] }
> => ({
  success: {
    label: 'Bon niveau',
    color: colors.status.success,
    icon: 'check-circle',
    gradient: Theme.gradients.primary,
  },
  warning: {
    label: 'Bientôt bas',
    color: colors.status.warning,
    icon: 'alert',
    gradient: Theme.gradients.gold,
  },
  danger: {
    label: 'Critique',
    color: colors.status.error,
    icon: 'alert-octagon',
    gradient: Theme.gradients.sunset,
  },
});

export const SMSBalanceCard: React.FC<SMSBalanceCardProps> = ({ balance }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const meta = STATUS_META(colors)[balance.status] || STATUS_META(colors).success;
  const progressWidth = balance.hasExpired
    ? 5
    : balance.hasExpiringSoon
    ? 25
    : Math.min(100, Math.max(10, balance.totalUnits / 3));

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={meta.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.decor} />
        <SMSBalanceHeader meta={meta} />
        <SMSBalanceValue totalUnits={balance.totalUnits} progressWidth={progressWidth} />
        <SMSBalanceFooter balance={balance} metaColor={meta.color} metaLabel={meta.label} />
      </LinearGradient>
    </View>
  );
};

export default SMSBalanceCard;
