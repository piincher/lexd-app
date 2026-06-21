import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';
import { parseDeepLink } from '@src/shared/lib/parseDeepLink';
import { navigationRef } from '@src/navigations/navigationRef';
import { PromoCampaignModal } from '@src/features/promoCampaigns/components/PromoCampaignModal';
import {
  useActivePromoCampaigns,
  usePromoCampaignTrack,
  usePromoCampaignDismissal,
} from '@src/features/promoCampaigns/hooks';
import type { PromoCampaign, PromoCampaignEventType } from '@src/features/promoCampaigns/types';

const getPlatform = () => {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'web';
};

const getAppVersion = () => {
  const expoConfig = Constants.expoConfig as { version?: string } | undefined;
  const manifest = Constants.manifest as { version?: string } | undefined;
  return expoConfig?.version || manifest?.version || process.env.EXPO_PUBLIC_APP_VERSION || '';
};

export const PromoCampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: campaigns, refetch } = useActivePromoCampaigns({
    platform: getPlatform(),
    appVersion: getAppVersion(),
  });
  const trackMutation = usePromoCampaignTrack();
  const { isReady, shouldShowCampaign, markImpression, markDismissed } = usePromoCampaignDismissal();

  const [activeCampaign, setActiveCampaign] = useState<PromoCampaign | null>(null);
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);
  const appStateRef = useRef(AppState.currentState);

  const eligibleCampaign = useMemo(() => {
    if (!isReady || !campaigns?.length) return null;
    return campaigns.find((campaign) => shouldShowCampaign(campaign)) || null;
  }, [isReady, campaigns, shouldShowCampaign]);

  useEffect(() => {
    if (eligibleCampaign && eligibleCampaign.id !== activeCampaign?.id) {
      setActiveCampaign(eligibleCampaign);
      setHasTrackedImpression(false);
    } else if (!eligibleCampaign && activeCampaign) {
      setActiveCampaign(null);
      setHasTrackedImpression(false);
    }
  }, [eligibleCampaign, activeCampaign]);

  useEffect(() => {
    if (activeCampaign && !hasTrackedImpression) {
      trackMutation.mutate({ campaignId: activeCampaign.id, input: { eventType: 'impression' } });
      markImpression(activeCampaign.id);
      setHasTrackedImpression(true);
    }
  }, [activeCampaign, hasTrackedImpression, trackMutation, markImpression]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        refetch();
      }
      appStateRef.current = nextAppState;
    });
    return () => subscription.remove();
  }, [refetch]);

  const handleClose = useCallback(() => {
    if (activeCampaign) {
      markDismissed(activeCampaign.id, activeCampaign.dismissBehavior);
    }
    setActiveCampaign(null);
  }, [activeCampaign, markDismissed]);

  const handleEvent = useCallback(
    (campaignId: string, eventType: PromoCampaignEventType, slideIndex?: number) => {
      trackMutation.mutate({ campaignId, input: { eventType, slideIndex } });
    },
    [trackMutation]
  );

  const handleNavigate = useCallback((deepLink: string) => {
    const parsed = parseDeepLink(deepLink);
    if (parsed && navigationRef.isReady()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigationRef.navigate(parsed.screen as any, parsed.params as any);
    } else {
      Linking.openURL(deepLink).catch(() => {
        // Ignore unsupported URLs.
      });
    }
    setActiveCampaign(null);
  }, []);

  return (
    <>
      {children}
      {activeCampaign ? (
        <PromoCampaignModal
          campaign={activeCampaign}
          visible
          onClose={handleClose}
          onEvent={handleEvent}
          onNavigate={handleNavigate}
        />
      ) : null}
    </>
  );
};
