import type { EventLane } from '../types';

/**
 * Pick the lane to feature in the countdown headline.
 * Priority: lanes in "urgency" (closest deadline first), then "normal"
 * (closest deadline first). Closed lanes are ignored. Returns null when
 * every lane has passed its cutoff.
 */
export const selectFeaturedLane = (lanes: EventLane[]): EventLane | null => {
  const open = lanes.filter((l) => l.state !== 'closed');
  if (open.length === 0) return null;

  const byCutoff = (a: EventLane, b: EventLane) =>
    new Date(a.cutoffDate).getTime() - new Date(b.cutoffDate).getTime();

  const urgent = open.filter((l) => l.state === 'urgency').sort(byCutoff);
  if (urgent.length > 0) return urgent[0];

  return open.filter((l) => l.state === 'normal').sort(byCutoff)[0] ?? null;
};
