/**
 * SmsSubscriptionCard
 * Displays a single SMS subscription with expiry progress and actions
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SmsService } from '@src/constants/types';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface SmsSubscriptionCardProps {
  subscription: SmsService;
  index: number;
}

const STATUS_META: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  ACTIVE: { label: 'Actif', color: '#10B981', bg: '#10B98115', icon: 'checkmark-circle' },
  EXPIRED: { label: 'Expiré', color: '#EF4444', bg: '#EF444415', icon: 'close-circle' },
  PENDING: { label: 'En attente', color: '#F59E0B', bg: '#F59E0B15', icon: 'time' },
};

const getProgressColor = (pct: number, isExpiringSoon: boolean) => {
  if (isExpiringSoon) return '#F59E0B';
  if (pct > 50) return '#10B981';
  if (pct > 20) return '#F59E0B';
  return '#EF4444';
};

export const SmsSubscriptionCard: React.FC<SmsSubscriptionCardProps> = ({
  subscription,
  index,
}) => {
  const meta = STATUS_META[subscription.status] || STATUS_META.ACTIVE;
  const progressColor = getProgressColor(subscription.progressPercentage, subscription.isExpiringSoon);

  const handleAction = () => {
    // Action handler - can be wired to renewal flow
    if (subscription.isExpired) {
      // TODO: navigate to renewal
    } else if (subscription.isPending) {
      // TODO: navigate to activation
    }
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 80)} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.countryRow}>
          <Text style={styles.flag}>{subscription.countryFlag}</Text>
          <View>
            <Text style={styles.countryName}>{subscription.countryName}</Text>
            <Text style={styles.offerName}>{subscription.offerName}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: meta.bg }]}>
          <Ionicons name={meta.icon as any} size={12} color={meta.color} />
          <Text style={[styles.statusText, { color: meta.color }]}>{meta.label}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{subscription.availableUnits.toLocaleString()}</Text>
          <Text style={styles.statLabel}>SMS restants</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{subscription.daysRemaining}</Text>
          <Text style={styles.statLabel}>Jours restants</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{subscription.expirationDateShort}</Text>
          <Text style={styles.statLabel}>Expiration</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.max(2, subscription.progressPercentage)}%`, backgroundColor: progressColor },
            ]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={[styles.progressText, { color: progressColor }]}>
            {subscription.progressPercentage}% restants
          </Text>
          <Text style={styles.progressSubtext}>
            {subscription.isExpired
              ? 'Expiré depuis ' + Math.abs(subscription.daysRemaining) + ' jours'
              : subscription.isExpiringSoon
                ? 'Expire bientôt — renouvellement recommandé'
                : subscription.isPending
                  ? "En attente d'activation"
                  : subscription.daysRemaining + ' jours avant expiration'}
          </Text>
        </View>
      </View>

      {(subscription.isExpired || subscription.isExpiringSoon || subscription.isPending) && (
        <TouchableOpacity
          onPress={handleAction}
          style={[styles.actionButton, { backgroundColor: meta.color + '12' }]}
          activeOpacity={0.7}
        >
          <Ionicons
            name={subscription.isExpired ? 'refresh' : subscription.isPending ? 'play' : 'warning'}
            size={16}
            color={meta.color}
          />
          <Text style={[styles.actionText, { color: meta.color }]}>
            {subscription.isExpired ? 'Renouveler' : subscription.isPending ? 'Activer' : 'Renouveler bientôt'}
          </Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flag: {
    fontSize: 28,
  },
  countryName: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
  },
  offerName: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Theme.neutral[100],
  },
  statValue: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 2,
  },
  progressSection: {
    marginBottom: 4,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.neutral[100],
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  progressSubtext: {
    fontSize: 11,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  actionText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
});

export default SmsSubscriptionCard;
