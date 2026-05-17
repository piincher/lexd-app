/**
 * SmsSubscriptionCard
 * Displays a single SMS subscription with expiry progress and actions
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SmsService } from '@src/shared/types/user';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { CardHeader, StatsRow, ProgressSection, ActionButton } from './components';

interface SmsSubscriptionCardProps {
  subscription: SmsService;
  index: number;
}

const STATUS_META = (colors: any): Record<string, { label: string; color: string; bg: string; icon: string }> => ({
  ACTIVE: { label: 'Actif', color: colors.status.success, bg: colors.status.success + '15', icon: 'checkmark-circle' },
  EXPIRED: { label: 'Expiré', color: colors.status.error, bg: colors.status.error + '15', icon: 'close-circle' },
  PENDING: { label: 'En attente', color: colors.status.warning, bg: colors.status.warning + '15', icon: 'time' },
});

const getProgressColor = (pct: number, isExpiringSoon: boolean, colors: any) => {
  if (isExpiringSoon) return colors.status.warning;
  if (pct > 50) return colors.status.success;
  if (pct > 20) return colors.status.warning;
  return colors.status.error;
};

const getProgressSubtext = (subscription: SmsService) => {
  if (subscription.isExpired) {
    return 'Expiré depuis ' + Math.abs(subscription.daysRemaining) + ' jours';
  }
  if (subscription.isExpiringSoon) {
    return 'Expire bientôt — renouvellement recommandé';
  }
  if (subscription.isPending) {
    return "En attente d'activation";
  }
  return subscription.daysRemaining + ' jours avant expiration';
};

const getActionProps = (subscription: SmsService) => {
  if (subscription.isExpired) {
    return { label: 'Renouveler', icon: 'refresh' };
  }
  if (subscription.isPending) {
    return { label: 'Activer', icon: 'play' };
  }
  return { label: 'Renouveler bientôt', icon: 'warning' };
};

export const SmsSubscriptionCard: React.FC<SmsSubscriptionCardProps> = ({
  subscription,
  index,
}) => {
  const { colors } = useAppTheme();
  const meta = STATUS_META(colors)[subscription.status] || STATUS_META(colors).ACTIVE;
  const progressColor = getProgressColor(subscription.progressPercentage, subscription.isExpiringSoon, colors);
  const progressSubtext = getProgressSubtext(subscription);
  const actionProps = getActionProps(subscription);

  const handleAction = () => {
    if (subscription.isExpired) {
      // TODO: navigate to renewal
    } else if (subscription.isPending) {
      // TODO: navigate to activation
    }
  };

  const showAction = subscription.isExpired || subscription.isExpiringSoon || subscription.isPending;

  return (
    <Animated.View entering={FadeInUp.delay(index * 80)} style={styles.container}>
      <CardHeader
        countryFlag={subscription.countryFlag}
        countryName={subscription.countryName}
        offerName={subscription.offerName}
        statusLabel={meta.label}
        statusColor={meta.color}
        statusBg={meta.bg}
        statusIcon={meta.icon}
      />
      <StatsRow
        availableUnits={subscription.availableUnits}
        daysRemaining={subscription.daysRemaining}
        expirationDateShort={subscription.expirationDateShort}
      />
      <ProgressSection
        progressPercentage={subscription.progressPercentage}
        progressColor={progressColor}
        progressSubtext={progressSubtext}
      />
      {showAction && (
        <ActionButton
          label={actionProps.label}
          icon={actionProps.icon}
          color={meta.color}
          onPress={handleAction}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Theme.neutral[100],
    ...Theme.shadows.sm,
  },
});

export default SmsSubscriptionCard;
