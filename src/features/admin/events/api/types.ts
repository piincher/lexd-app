/**
 * Admin Event Engine types — mirror the backend Event model
 * (chinalinkexpressbackend/src/v2/models/Event.js).
 */

export type EventStatus = 'draft' | 'scheduled' | 'live' | 'ended' | 'archived';
export type EventShippingMode = 'AIR' | 'SEA' | 'EXPRESS';
export type EventFeePromoType =
  | 'none'
  | 'percent'
  | 'fixed_per_kg'
  | 'fixed_per_cbm'
  | 'flat';
export type EventCampaignStepType =
  | 'teaser'
  | 'live'
  | 'cutoff_warning'
  | 'last_call'
  | 'recap';
export type EventCampaignTriggerKind =
  | 'fixed_date'
  | 'days_before_cutoff'
  | 'on_status_change';
export type EventCampaignAudience = 'all' | 'region' | 'past_shippers' | 'rule_specific';

export interface VolumeTier {
  minKg: number;
  rate: number;
}

export interface ShippingRule {
  _id?: string;
  label?: string;
  originHub?: string;
  destinationRegion: string;
  mode: EventShippingMode;
  transitDays: number;
  bufferDays: number;
  cutoffOverride?: string | null;
  feePromoType: EventFeePromoType;
  feePromoValue: number;
  volumeTiers: VolumeTier[];
  guaranteedDelivery: boolean;
  /** Server-computed; present on read, ignored on write. */
  cutoffDate?: string;
}

export interface CampaignStep {
  _id?: string;
  type: EventCampaignStepType;
  triggerKind: EventCampaignTriggerKind;
  triggerValue: string | number | null;
  audience: EventCampaignAudience;
  title: string;
  body: string;
  sent?: boolean;
}

export interface EventTheme {
  bannerImageUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  icon?: string;
}

export interface AdminEvent {
  _id: string;
  name: string;
  slug: string;
  status: EventStatus;
  teaserStart?: string | null;
  liveStart: string;
  eventStart: string;
  liveEnd: string;
  regions: string[];
  theme: EventTheme;
  priority: number;
  isActive: boolean;
  shippingRules: ShippingRule[];
  campaignSteps: CampaignStep[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateEventInput = Omit<AdminEvent, '_id' | 'status' | 'createdAt' | 'updatedAt'> & {
  status?: EventStatus;
};
export type UpdateEventInput = Partial<CreateEventInput>;

export interface EventListResult {
  events: AdminEvent[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EventListFilters {
  page?: number;
  limit?: number;
  status?: EventStatus;
}
