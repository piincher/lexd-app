/**
 * Events feature — Event Engine (reusable seasonal "event mode").
 * Public surface consumed by other layers.
 */

export { EventCountdownBanner } from './components/EventCountdownBanner';
export { useActiveEvent } from './hooks/useActiveEvent';
export { useCountdown } from './hooks/useCountdown';
export type { ActiveEvent, EventLane, EventLaneState } from './types';
