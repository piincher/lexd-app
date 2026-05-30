/**
 * Container ETA & delay prediction — pure, client-side.
 *
 * The backend stamps timeline milestones (departedAt, estimatedArrival…) and
 * the route carries `estimatedTransitDays`. From those we derive a *predicted*
 * arrival and a delay-risk score so operators can act on at-risk containers
 * before the client complains — no extra network call required.
 */
import type { Container, ContainerStatus } from '../../types';

export type DelayRisk = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
export type EtaConfidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ContainerEta {
  /** ISO date of the predicted arrival, or null when not yet predictable. */
  predictedArrival: string | null;
  /** Whole days from "now" until the predicted arrival (negative when overdue). */
  daysRemaining: number | null;
  /** How many days late we project the container to be vs. the original ETA. */
  projectedDelayDays: number;
  risk: DelayRisk;
  confidence: EtaConfidence;
  /** True once the container has docked/discharged/delivered. */
  isArrived: boolean;
  /** True when the predicted/estimated arrival is already in the past. */
  isOverdue: boolean;
  /** Human-readable French factors explaining the prediction. */
  factors: string[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

const ARRIVED_STATUSES = new Set<ContainerStatus>([
  'ARRIVED',
  'DISCHARGED',
  'READY_FOR_PICKUP',
  'DELIVERED',
]);

const IN_TRANSIT_STATUSES = new Set<ContainerStatus>([
  'GATE_IN_FULL',
  'LOADED_ON_VESSEL',
  'IN_TRANSIT',
]);

const parseDate = (value?: string): Date | null => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const diffDays = (from: Date, to: Date): number =>
  Math.round((to.getTime() - from.getTime()) / DAY_MS);

const riskFromDelay = (delayDays: number): DelayRisk => {
  if (delayDays <= 0) return 'NONE';
  if (delayDays <= 2) return 'LOW';
  if (delayDays <= 5) return 'MEDIUM';
  return 'HIGH';
};

/**
 * Compute the ETA / delay outlook for a single container.
 *
 * @param container The container to evaluate.
 * @param now Injectable clock for deterministic tests; defaults to current time.
 */
export const buildContainerEta = (container: Container, now: Date = new Date()): ContainerEta => {
  const factors: string[] = [];
  const timeline = container.timeline ?? ({} as Container['timeline']);
  const isArrived = ARRIVED_STATUSES.has(container.status);

  const departed = parseDate(timeline.departedAt);
  const originalEta = parseDate(timeline.estimatedArrival);
  const transitDays = container.route?.estimatedTransitDays;

  // Already arrived → settle the outcome against the original estimate.
  if (isArrived) {
    const arrivedAt = parseDate(timeline.arrivedAt) ?? parseDate(timeline.dischargedAt) ?? now;
    const projectedDelayDays = originalEta ? Math.max(diffDays(originalEta, arrivedAt), 0) : 0;
    factors.push(projectedDelayDays > 0 ? `Arrivé avec ${projectedDelayDays} j de retard` : 'Arrivé à temps');
    return {
      predictedArrival: arrivedAt.toISOString(),
      daysRemaining: 0,
      projectedDelayDays,
      risk: 'NONE',
      confidence: 'HIGH',
      isArrived: true,
      isOverdue: false,
      factors,
    };
  }

  // Best-available predicted arrival:
  //   1. departure + transitDays (most reliable once sailing)
  //   2. the backend's estimatedArrival
  let predicted: Date | null = null;
  let confidence: EtaConfidence = 'LOW';

  if (departed && typeof transitDays === 'number' && transitDays > 0) {
    predicted = new Date(departed.getTime() + transitDays * DAY_MS);
    confidence = IN_TRANSIT_STATUSES.has(container.status) ? 'HIGH' : 'MEDIUM';
    factors.push(`Départ + ${transitDays} j de transit`);
  } else if (originalEta) {
    predicted = originalEta;
    confidence = 'MEDIUM';
    factors.push('Basé sur l’ETA estimée');
  } else if (typeof transitDays === 'number' && transitDays > 0) {
    predicted = new Date(now.getTime() + transitDays * DAY_MS);
    confidence = 'LOW';
    factors.push('Pas encore parti — estimation indicative');
  }

  if (!predicted) {
    factors.push('Données insuffisantes pour prédire l’arrivée');
    return {
      predictedArrival: null,
      daysRemaining: null,
      projectedDelayDays: 0,
      risk: 'NONE',
      confidence: 'LOW',
      isArrived: false,
      isOverdue: false,
      factors,
    };
  }

  const daysRemaining = diffDays(now, predicted);
  const isOverdue = daysRemaining < 0;

  // Projected delay = how much later than the original ETA we now land.
  const projectedDelayDays = originalEta ? Math.max(diffDays(originalEta, predicted), 0) : 0;
  if (projectedDelayDays > 0) {
    factors.push(`Retard projeté de ${projectedDelayDays} j vs ETA initiale`);
  }

  // Not yet departed but the departure window has passed → real risk.
  let risk = riskFromDelay(projectedDelayDays);
  if (!departed && !IN_TRANSIT_STATUSES.has(container.status)) {
    const estDeparture = parseDate(timeline.estimatedDeparture);
    if (estDeparture && now > estDeparture) {
      const lateDeparture = diffDays(estDeparture, now);
      factors.push(`Départ en retard de ${lateDeparture} j`);
      risk = riskFromDelay(Math.max(projectedDelayDays, lateDeparture));
    }
  }
  if (isOverdue) {
    factors.push(`En retard de ${Math.abs(daysRemaining)} j sur la prévision`);
    if (risk === 'NONE') risk = 'MEDIUM';
  }

  return {
    predictedArrival: predicted.toISOString(),
    daysRemaining,
    projectedDelayDays,
    risk,
    confidence,
    isArrived: false,
    isOverdue,
    factors,
  };
};

export const DELAY_RISK_LABELS: Record<DelayRisk, string> = {
  NONE: 'À temps',
  LOW: 'Risque faible',
  MEDIUM: 'Risque modéré',
  HIGH: 'Risque élevé',
};

export const ETA_CONFIDENCE_LABELS: Record<EtaConfidence, string> = {
  HIGH: 'Fiabilité élevée',
  MEDIUM: 'Fiabilité moyenne',
  LOW: 'Fiabilité faible',
};
