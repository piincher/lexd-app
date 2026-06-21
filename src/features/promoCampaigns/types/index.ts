export type PromoCampaignCtaAction = 'DEEP_LINK' | 'EXTERNAL_URL' | 'DISMISS';

export interface PromoCampaignSlide {
  id: string;
  imageUrl: string;
  title: string | null;
  body: string | null;
  ctaText: string | null;
  ctaAction: PromoCampaignCtaAction;
  ctaTarget: string | null;
}

export interface PromoCampaign {
  id: string;
  campaignId: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  slides: PromoCampaignSlide[];
  primaryCtaText: string | null;
  primaryCtaAction: PromoCampaignCtaAction;
  primaryCtaTarget: string | null;
  backgroundColor: string;
  textColor: string;
  startDate: string;
  endDate: string;
  targetCountries: string[];
  targetLanguages: string[];
  targetPlatforms: string[];
  minAppVersion: string | null;
  maxAppVersion: string | null;
  dismissBehavior: 'SHOW_AGAIN_NEXT_LAUNCH' | 'HIDE_FOR_24H' | 'NEVER_SHOW_AGAIN';
  maxImpressionsPerUser: number | null;
  priority: number;
}

export type PromoCampaignEventType = 'impression' | 'click' | 'dismiss';

export interface PromoCampaignDismissState {
  dismissedCampaignIds: string[];
  campaignImpressions: Record<string, number>;
  hideUntil: Record<string, number>;
}
