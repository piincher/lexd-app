import { CreateEventInput, ShippingRule, CampaignStep } from '../api/types';

export const emptyRule = (): ShippingRule => ({
  label: '',
  originHub: 'Guangzhou',
  destinationRegion: '',
  mode: 'SEA',
  transitDays: 35,
  bufferDays: 7,
  cutoffOverride: null,
  feePromoType: 'none',
  feePromoValue: 0,
  volumeTiers: [],
  guaranteedDelivery: false,
});

export const emptyStep = (): CampaignStep => ({
  type: 'teaser',
  triggerKind: 'fixed_date',
  triggerValue: null,
  audience: 'all',
  title: '',
  body: '',
});

export const emptyEvent = (): CreateEventInput => ({
  name: '',
  slug: '',
  status: 'draft',
  teaserStart: null,
  liveStart: '',
  eventStart: '',
  liveEnd: '',
  regions: [],
  theme: { primaryColor: '', accentColor: '', icon: '', bannerImageUrl: '' },
  priority: 0,
  isActive: true,
  shippingRules: [],
  campaignSteps: [],
});

/** Strip server-only fields and normalize an event into a writable payload. */
export const toEditableEvent = (e: Partial<CreateEventInput>): CreateEventInput => ({
  ...emptyEvent(),
  ...e,
  theme: { ...emptyEvent().theme, ...(e.theme || {}) },
  shippingRules: (e.shippingRules || []).map((r) => ({ ...emptyRule(), ...r })),
  campaignSteps: (e.campaignSteps || []).map((s) => ({ ...emptyStep(), ...s })),
});
