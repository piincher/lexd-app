import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useReferralScreen } from '../hooks/useReferralScreen';
import { useMyRewardRedemptions } from '../hooks/useRewardRedemptions';
import { ReferralCodeCard } from '../components/ReferralCodeCard';
import { ReferralStatsGrid } from '../components/ReferralStatsGrid';
import { ReferralHistoryList } from '../components/ReferralHistoryList';
import { RedemptionHistoryList } from '../components/RedemptionHistoryList';
import { RedemptionRequestModal } from '../components/RedemptionRequestModal';
import { RewardRedemptionCard } from '../components/RewardRedemptionCard';
import { RewardLedgerList } from '../components/RewardLedgerList';
import { createStyles } from './ReferralScreen.styles';

export const ReferralScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const [isRedeemOpen, setRedeemOpen] = useState(false);
  const styles = createStyles();
  const { data, isLoading, isError, refetch, referralCode, handleCopy, handleShare } =
    useReferralScreen();
  const {
    createRedemption,
    cancelRedemption,
    isCreatingRedemption,
    isCancellingRedemption,
  } = useMyRewardRedemptions();

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleSubmitRedemption = useCallback(
    (points: number, note?: string) => {
      createRedemption({ points, note }, { onSuccess: () => setRedeemOpen(false) });
    },
    [createRedemption]
  );

  const goToRedemptions = useCallback(() => {
    (navigation as { navigate: (name: string) => void }).navigate('Redemption');
  }, [navigation]);

  const goToMyRewards = useCallback(() => {
    (navigation as { navigate: (name: string) => void }).navigate('MyRewards');
  }, [navigation]);

  if (isLoading) {
    return (
      <Screen header={{ title: 'Parrainage', showBack: true, onBackPress: handleBack }}>
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen header={{ title: 'Parrainage', showBack: true, onBackPress: handleBack }}>
        <View style={styles.state}>
          <Text style={[styles.stateText, { color: colors.text.secondary }]}>
            Impossible de charger votre parrainage.
          </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={[styles.retryText, { color: colors.primary.main }]}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      header={{ title: 'Parrainage', showBack: true, onBackPress: handleBack }}
      contentStyle={styles.content}
    >
      <ReferralCodeCard
        referralCode={referralCode}
        bonusPoints={data.bonusPoints}
        onCopy={handleCopy}
        onShare={handleShare}
      />
      <ReferralStatsGrid stats={data.stats} rewardPoints={data.rewardPoints} />

      {/* Redemption Section with link to dedicated screen */}
      <RewardRedemptionCard
        rewardPoints={data.rewardPoints}
        rewardValueFCFA={data.rewardValueFCFA}
        pendingPoints={data.pendingRedemptionPoints}
        pendingValueFCFA={data.pendingRedemptionValueFCFA}
        pointValueFCFA={data.pointValueFCFA}
        onRedeem={() => setRedeemOpen(true)}
      />

      <TouchableOpacity style={styles.linkRow} onPress={goToMyRewards}>
        <View style={styles.linkLeft}>
          <MaterialCommunityIcons name="wallet-giftcard" size={18} color={colors.primary.main} />
          <Text style={[styles.linkText, { color: colors.primary.main }]}>
            Voir mes récompenses
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.primary.main} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkRow} onPress={goToRedemptions}>
        <View style={styles.linkLeft}>
          <MaterialCommunityIcons name="history" size={18} color={colors.primary.main} />
          <Text style={[styles.linkText, { color: colors.primary.main }]}>
            {`Voir l'historique complet`}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.primary.main} />
      </TouchableOpacity>

      <RedemptionHistoryList
        redemptions={(data.redemptions || []).slice(0, 3)}
        isCancelling={isCancellingRedemption}
        onCancel={cancelRedemption}
      />

      <RewardLedgerList entries={data.ledger || []} />
      <ReferralHistoryList referrals={data.referrals} />

      <RedemptionRequestModal
        visible={isRedeemOpen}
        onClose={() => setRedeemOpen(false)}
        onSubmit={handleSubmitRedemption}
        isSubmitting={isCreatingRedemption}
      />
    </Screen>
  );
};

export default ReferralScreen;
