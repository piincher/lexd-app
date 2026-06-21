import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PromoCampaign, PromoCampaignDismissState } from '../types';

const STORAGE_KEY = 'CHINALINK_PROMO_CAMPAIGN_DISMISSALS';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const DEFAULT_STATE: PromoCampaignDismissState = {
  dismissedCampaignIds: [],
  campaignImpressions: {},
  hideUntil: {},
};

async function loadState(): Promise<PromoCampaignDismissState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as PromoCampaignDismissState;
    return {
      dismissedCampaignIds: parsed.dismissedCampaignIds || [],
      campaignImpressions: parsed.campaignImpressions || {},
      hideUntil: parsed.hideUntil || {},
    };
  } catch {
    return DEFAULT_STATE;
  }
}

async function saveState(state: PromoCampaignDismissState): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silent failure — promo campaigns are non-critical.
  }
}

export const usePromoCampaignDismissal = () => {
  const [state, setState] = useState<PromoCampaignDismissState>(DEFAULT_STATE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadState().then((loaded) => {
      if (!cancelled) {
        setState(loaded);
        setIsReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: PromoCampaignDismissState) => {
    setState(next);
    saveState(next);
  }, []);

  const shouldShowCampaign = useCallback(
    (campaign: PromoCampaign): boolean => {
      if (!isReady) return false;

      const now = Date.now();
      if (state.hideUntil[campaign.id] && state.hideUntil[campaign.id] > now) {
        return false;
      }

      if (campaign.dismissBehavior === 'NEVER_SHOW_AGAIN' && state.dismissedCampaignIds.includes(campaign.id)) {
        return false;
      }

      const impressions = state.campaignImpressions[campaign.id] || 0;
      if (campaign.maxImpressionsPerUser && impressions >= campaign.maxImpressionsPerUser) {
        return false;
      }

      return true;
    },
    [isReady, state]
  );

  const markImpression = useCallback(
    (campaignId: string) => {
      const next: PromoCampaignDismissState = {
        ...state,
        campaignImpressions: {
          ...state.campaignImpressions,
          [campaignId]: (state.campaignImpressions[campaignId] || 0) + 1,
        },
      };
      persist(next);
    },
    [state, persist]
  );

  const markDismissed = useCallback(
    (campaignId: string, behavior: PromoCampaign['dismissBehavior']) => {
      const next: PromoCampaignDismissState = { ...state };

      if (behavior === 'NEVER_SHOW_AGAIN') {
        if (!next.dismissedCampaignIds.includes(campaignId)) {
          next.dismissedCampaignIds = [...next.dismissedCampaignIds, campaignId];
        }
      } else if (behavior === 'HIDE_FOR_24H') {
        next.hideUntil = { ...next.hideUntil, [campaignId]: Date.now() + ONE_DAY_MS };
      }
      // SHOW_AGAIN_NEXT_LAUNCH: no persistent state change needed.

      persist(next);
    },
    [state, persist]
  );

  return {
    isReady,
    shouldShowCampaign,
    markImpression,
    markDismissed,
  };
};
