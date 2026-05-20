import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { RewardBalanceCard } from '../components/RewardBalanceCard';
import { RewardEarningRules } from '../components/RewardEarningRules';
import { RewardLedgerList } from '../components/RewardLedgerList';
import { RedemptionEmptyState } from '../components/RedemptionEmptyState';
import { useMyRewards } from '../hooks/useRewards';
import { useMyRewardRedemptions } from '../hooks/useRewardRedemptions';
import { createStyles } from './MyRewardsScreen.styles';

export const MyRewardsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const rewards = useMyRewards();
  const redemptions = useMyRewardRedemptions();

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const goToRedemptions = useCallback(() => {
    (navigation as { navigate: (name: string) => void }).navigate('Redemption');
  }, [navigation]);

  const goToReferral = useCallback(() => {
    (navigation as { navigate: (name: string) => void }).navigate('Referral');
  }, [navigation]);

  const data = rewards.data;
  const isLoading = rewards.isLoading;
  const isError = rewards.isError;

  const pendingPoints = useMemo(() => {
    const items = redemptions.redemptions.data?.items || [];
    return items
      .filter((r) => r.status === 'PENDING')
      .reduce((sum, r) => sum + r.requestedPoints, 0);
  }, [redemptions.redemptions.data]);

  if (isLoading) {
    return (
      <Screen header={{ title: 'Mes récompenses', showBack: true, onBackPress: handleBack }}>
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary.main} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen header={{ title: 'Mes récompenses', showBack: true, onBackPress: handleBack }}>
        <View style={styles.state}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger vos récompenses.</Text>
          <TouchableOpacity onPress={() => rewards.refetch()}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      header={{ title: 'Mes récompenses', showBack: true, onBackPress: handleBack }}
      contentStyle={styles.content}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <RewardBalanceCard
          points={data.rewardPoints}
          pointValueFCFA={data.pointValueFCFA}
          pendingPoints={pendingPoints}
          onRedeem={goToRedemptions}
          onHistory={goToRedemptions}
        />

        <RewardEarningRules settings={data.settings} />

        {/* Ledger */}
        <View style={styles.ledgerSection}>
          <View style={styles.ledgerHeader}>
            <Text style={styles.ledgerTitle}>Historique des transactions</Text>
            <TouchableOpacity onPress={goToRedemptions}>
              <Text style={[styles.ledgerLink, { color: colors.primary.main }]}>Tout voir</Text>
            </TouchableOpacity>
          </View>

          {data.ledger && data.ledger.length > 0 ? (
            <RewardLedgerList entries={data.ledger.slice(0, 5)} />
          ) : (
            <RedemptionEmptyState
              title="Aucune transaction"
              subtitle="Vos transactions de points apparaîtront ici après votre première livraison."
              icon="book-open-variant"
            />
          )}
        </View>

        {/* Referral CTA */}
        <TouchableOpacity style={[styles.referralCard, { backgroundColor: colors.accent.gold + '12' }]} onPress={goToReferral}>
          <View style={styles.referralLeft}>
            <MaterialCommunityIcons name="gift-outline" size={22} color={colors.accent.gold} />
            <View>
              <Text style={[styles.referralTitle, { color: colors.accent.goldDark }]}>
                Programme de parrainage
              </Text>
              <Text style={styles.referralSubtitle}>
                Gagnez des points en parrainant vos proches
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.accent.gold} />
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

export default MyRewardsScreen;
