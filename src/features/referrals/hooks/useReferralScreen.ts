import { useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useQuery } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';
import { getReferralSummary } from '../api/referralApi';

export const REFERRAL_SUMMARY_KEY = ['referrals', 'summary'] as const;

export const useReferralScreen = () => {
  const query = useQuery({
    queryKey: REFERRAL_SUMMARY_KEY,
    queryFn: getReferralSummary,
  });

  const referralCode = query.data?.referralCode || '';

  // Accounts are created by an admin (no public self-signup), so the referral
  // share carries the CODE — the new client gives it to the team when their
  // account is created. (No onboarding deep link to consume it.)
  const shareMessage = useMemo(
    () =>
      `Rejoins ChinaLink Express ! Donne mon code de parrainage ${referralCode} ` +
      'à l’équipe lors de la création de ton compte.',
    [referralCode]
  );

  const handleCopy = useCallback(async () => {
    if (!referralCode) return;
    await Clipboard.setStringAsync(referralCode);
    showMessage({ message: 'Code copié', type: 'success' });
  }, [referralCode]);

  const handleShare = useCallback(async () => {
    if (!referralCode) return;
    await Share.share({ message: shareMessage });
  }, [referralCode, shareMessage]);

  return {
    ...query,
    referralCode,
    handleCopy,
    handleShare,
  };
};
