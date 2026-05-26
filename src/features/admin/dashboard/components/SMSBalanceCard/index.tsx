import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ThemeContextType } from '@src/constants/Theme';
import { createStyles } from './SMSBalanceCard.styles';
import { SMSBalanceHeader } from './SMSBalanceHeader';
import { SMSBalanceValue } from './SMSBalanceValue';
import { SMSBalanceFooter } from './SMSBalanceFooter';
import type { Balance } from './types';

type AppThemeColors = ThemeContextType['colors'];
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface SMSBalanceCardProps {
  balance: Balance;
}

const STATUS_META = (
  colors: AppThemeColors
): Record<
  Balance['status'],
  { label: string; color: string; icon: MaterialCommunityIconName }
> => ({
  success: {
    label: 'Bon niveau',
    color: colors.status.success,
    icon: 'check-circle',
  },
  warning: {
    label: 'Bientôt bas',
    color: colors.status.warning,
    icon: 'alert',
  },
  danger: {
    label: 'Critique',
    color: colors.status.error,
    icon: 'alert-octagon',
  },
});

export const SMSBalanceCard: React.FC<SMSBalanceCardProps> = ({ balance }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const meta = STATUS_META(colors)[balance.status] || STATUS_META(colors).success;
  const progressWidth = balance.totalRequestedUnits && balance.totalRequestedUnits > 0
    ? Math.min(100, Math.max(0, (balance.totalUnits / balance.totalRequestedUnits) * 100))
    : Math.min(100, Math.max(0, (balance.totalUnits / 500) * 100));

  return (
    <View style={[styles.card, { borderLeftColor: meta.color }]}>
      <SMSBalanceHeader meta={meta} />
      <SMSBalanceValue
        totalUnits={balance.totalUnits}
        progressWidth={progressWidth}
        progressColor={meta.color}
      />
      <SMSBalanceFooter balance={balance} metaColor={meta.color} metaLabel={meta.label} />
    </View>
  );
};

export default SMSBalanceCard;
