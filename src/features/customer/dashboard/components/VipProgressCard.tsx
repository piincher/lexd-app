import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardSummary, VipProgress } from '@src/shared/types/dashboard';

interface Props {
  vip: VipProgress;
  rewards: RewardSummary;
}

const formatMoney = (value: number) =>
  `${Math.round(value || 0).toLocaleString('fr-FR')} FCFA`;

export const VipProgressCard: React.FC<Props> = ({ vip, rewards }) => {
  const { colors } = useAppTheme();
  const progress = Math.max(0, Math.min(100, vip.progressPercent || 0));
  const styles = useMemo(() => StyleSheet.create({
    wrapper: { paddingHorizontal: 16, marginTop: 16 },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
    title: { color: colors.text.primary, fontSize: 17, fontWeight: '900' },
    tier: { color: colors.status.warning, fontSize: 13, fontWeight: '900', marginTop: 2 },
    icon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${colors.status.warning}18`,
    },
    progressTrack: { height: 10, borderRadius: 999, backgroundColor: colors.background.paper, marginTop: 14, overflow: 'hidden' },
    progressFill: { height: 10, borderRadius: 999, backgroundColor: colors.status.warning },
    detail: { color: colors.text.secondary, fontSize: 12, lineHeight: 18, marginTop: 8 },
    rewards: { flexDirection: 'row', gap: 8, marginTop: 12 },
    rewardBox: { flex: 1, borderRadius: 12, padding: 10, backgroundColor: colors.background.paper },
    rewardValue: { color: colors.text.primary, fontSize: 16, fontWeight: '900' },
    rewardLabel: { color: colors.text.secondary, fontSize: 11, fontWeight: '600', marginTop: 2 },
  }), [colors]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.top}>
          <View>
            <Text style={styles.title}>Progression VIP</Text>
            <Text style={styles.tier}>{vip.currentTier?.name || 'Débutant'}</Text>
          </View>
          <View style={styles.icon}>
            <Ionicons name="diamond-outline" size={22} color={colors.status.warning} />
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.detail}>
          {vip.nextTier
            ? `${vip.remainingCBM.toLocaleString('fr-FR')} CBM restants pour ${vip.nextTier.name}.`
            : 'Vous êtes au meilleur niveau disponible.'}
        </Text>
        <View style={styles.rewards}>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardValue}>{rewards.rewardPoints}</Text>
            <Text style={styles.rewardLabel}>Points</Text>
          </View>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardValue}>{formatMoney(rewards.rewardValueFCFA)}</Text>
            <Text style={styles.rewardLabel}>Crédit estimé</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VipProgressCard;
