import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useReferralScreen } from '../hooks/useReferralScreen';
import { ReferralCodeCard } from '../components/ReferralCodeCard';
import { ReferralStatsGrid } from '../components/ReferralStatsGrid';
import { ReferralHistoryList } from '../components/ReferralHistoryList';
import { createStyles } from './ReferralScreen.styles';

export const ReferralScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(), []);
  const { data, isLoading, isError, refetch, referralCode, handleCopy, handleShare } =
    useReferralScreen();
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

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
      <ReferralHistoryList referrals={data.referrals} />
    </Screen>
  );
};

export default ReferralScreen;
