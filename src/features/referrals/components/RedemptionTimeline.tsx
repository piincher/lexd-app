import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardRedemption } from '../types';
import { createStyles } from './RedemptionTimeline.styles';

interface RedemptionTimelineProps {
  redemption: RewardRedemption;
}

interface TimelineStep {
  key: string;
  label: string;
  sublabel: string;
  icon: string;
  active: boolean;
  color: string;
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const RedemptionTimeline: React.FC<RedemptionTimelineProps> = ({ redemption }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const steps: TimelineStep[] = useMemo(() => {
    const base: TimelineStep[] = [
      {
        key: 'created',
        label: 'Demande envoyée',
        sublabel: formatDate(redemption.createdAt),
        icon: 'send-circle-outline',
        active: true,
        color: colors.primary.main,
      },
    ];

    if (redemption.status === 'CANCELLED') {
      base.push({
        key: 'cancelled',
        label: 'Demande annulée',
        sublabel: formatDate(redemption.cancelledAt),
        icon: 'cancel',
        active: true,
        color: colors.status.error,
      });
      return base;
    }

    if (redemption.status === 'REJECTED') {
      base.push({
        key: 'rejected',
        label: 'Demande rejetée',
        sublabel: formatDate(redemption.reviewedAt),
        icon: 'close-circle-outline',
        active: true,
        color: colors.status.error,
      });
      return base;
    }

    if (redemption.status === 'APPROVED') {
      base.push(
        {
          key: 'reviewed',
          label: 'En cours de validation',
          sublabel: formatDate(redemption.reviewedAt),
          icon: 'account-check-outline',
          active: true,
          color: colors.status.info,
        },
        {
          key: 'approved',
          label: 'Points approuvés',
          sublabel: formatDate(redemption.reviewedAt),
          icon: 'check-circle-outline',
          active: true,
          color: colors.status.success,
        }
      );
      return base;
    }

    // PENDING
    base.push({
      key: 'pending',
      label: 'En attente de validation',
      sublabel: '—',
      icon: 'clock-outline',
      active: false,
      color: colors.text.disabled,
    });
    return base;
  }, [redemption, colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi de la demande</Text>
      {steps.map((step, index) => (
        <View key={step.key} style={styles.stepRow}>
          <View style={styles.leftColumn}>
            <View style={[styles.iconCircle, { backgroundColor: step.color + '18' }]}>
              <MaterialCommunityIcons name={step.icon as any} size={16} color={step.color} />
            </View>
            {index < steps.length - 1 && <View style={[styles.connector, { backgroundColor: step.color + '40' }]} />}
          </View>
          <View style={styles.content}>
            <Text style={[styles.stepLabel, { color: step.active ? colors.text.primary : colors.text.disabled }]}>
              {step.label}
            </Text>
            <Text style={[styles.stepSublabel, { color: colors.text.secondary }]}>{step.sublabel}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
