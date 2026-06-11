import { ShippingRule } from '../api/types';

/**
 * Mirror of backend Event.computeCutoffDate so the admin form can preview a
 * lane's ship-by deadline live as the user edits:
 *   cutoff = cutoffOverride ?? (eventStart − transitDays − bufferDays)
 * Returns null when eventStart is not a valid date.
 */
export const computeCutoffDate = (
  eventStart: string | null | undefined,
  rule: Pick<ShippingRule, 'transitDays' | 'bufferDays' | 'cutoffOverride'>
): Date | null => {
  if (rule.cutoffOverride) {
    const d = new Date(rule.cutoffOverride);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (!eventStart) return null;
  const anchor = new Date(eventStart);
  if (Number.isNaN(anchor.getTime())) return null;
  const totalDays = (Number(rule.transitDays) || 0) + (Number(rule.bufferDays) || 0);
  const cutoff = new Date(anchor);
  cutoff.setUTCDate(cutoff.getUTCDate() - totalDays);
  return cutoff;
};
