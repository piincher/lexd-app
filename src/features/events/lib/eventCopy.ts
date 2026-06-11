import { formatCurrency } from '@src/shared/lib/currency';
import type { EventLane, EventFeePromo, EventShippingMode } from '../types';

/** French labels for shipping modes. */
export const MODE_LABELS: Record<EventShippingMode, string> = {
  SEA: 'Fret maritime',
  AIR: 'Fret aérien',
  EXPRESS: 'Express',
};

/** Headline shown above the countdown, tuned to the lane's urgency. */
export const laneHeadline = (lane: EventLane): string => {
  const mode = MODE_LABELS[lane.mode];
  if (lane.state === 'urgency') return `Dernier appel — ${mode}`;
  return `Expédiez avant la date limite — ${mode}`;
};

/** Short promo chip text, or null when the lane has no fee promo. */
export const feePromoLabel = (promo: EventFeePromo): string | null => {
  switch (promo.type) {
    case 'percent':
      return `-${promo.value}% sur le fret`;
    case 'fixed_per_kg':
      return `${formatCurrency(promo.value)}/kg`;
    case 'fixed_per_cbm':
      return `${formatCurrency(promo.value)}/CBM`;
    case 'flat':
      return `Tarif fixe ${formatCurrency(promo.value)}`;
    default:
      return null;
  }
};
