/**
 * Event Engine — client types mirroring the backend
 * GET /api/v2/public/active-event payload (see eventService.resolveEventForClient).
 */

export type EventLaneState = 'normal' | 'urgency' | 'closed';
export type EventShippingMode = 'AIR' | 'SEA' | 'EXPRESS';
export type EventFeePromoType =
  | 'none'
  | 'percent'
  | 'fixed_per_kg'
  | 'fixed_per_cbm'
  | 'flat';

export interface EventVolumeTier {
  minKg: number;
  rate: number;
}

export interface EventFeePromo {
  type: EventFeePromoType;
  value: number;
  volumeTiers: EventVolumeTier[];
}

export interface EventLane {
  ruleId: string;
  label?: string;
  mode: EventShippingMode;
  originHub?: string;
  destinationRegion: string;
  transitDays: number;
  bufferDays: number;
  /** ISO date string the client counts down to (ship-by deadline). */
  cutoffDate: string;
  state: EventLaneState;
  guaranteedDelivery: boolean;
  feePromo: EventFeePromo;
}

export interface EventTheme {
  bannerImageUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  icon?: string;
}

export interface ActiveEvent {
  id: string;
  name: string;
  slug: string;
  status: 'draft' | 'scheduled' | 'live' | 'ended' | 'archived';
  theme: EventTheme;
  regions: string[];
  eventStart: string;
  liveStart: string;
  liveEnd: string;
  lanes: EventLane[];
}
