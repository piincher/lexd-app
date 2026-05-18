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

  const shareMessage = useMemo(
    () =>
      `Rejoins ChinaLink Express avec mon code de parrainage ${referralCode}. ` +
      'Utilise ce code lors de la creation de ton compte.',
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
