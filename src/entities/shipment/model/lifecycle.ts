/**
 * Shipment lifecycle — the canonical customer-facing journey.
 *
 * The app previously carried four parallel status vocabularies for what is,
 * from the customer's side, one journey:
 *
 *   goods      8 states  RECEIVED_AT_WAREHOUSE … DELIVERED
 *   order      5 states  Inactive … Delivered
 *   container 11 states  BOOKED … DELIVERED          (sea)
 *   air        7 states  CREATED … DELIVERED         (air)
 *
 * All four converge on the same tail — IN_TRANSIT, ARRIVED, READY_FOR_PICKUP,
 * DELIVERED — because they are four zoom levels on a single process. This
 * module defines that process once, and maps every source vocabulary onto it.
 *
 * The domain language already pointed here: the goods labels read "Assigné à
 * un envoi" and "Chargé dans l'envoi". *Envoi* was already the customer's word
 * for the unified thing.
 *
 * IMPORTANT: the mappings below are a product decision, not just a refactor.
 * Getting one wrong shows a customer the wrong status, so each source state is
 * listed explicitly rather than pattern-matched, and anything unrecognized
 * resolves to `null` (unknown) instead of silently landing on a stage.
 */

export type ShipmentStage =
  | 'REGISTERED'
  | 'AT_WAREHOUSE'
  | 'PREPARING'
  | 'CONSOLIDATED'
  | 'DEPARTED'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

/** Terminal states that sit outside the forward journey. */
export type ShipmentException = 'CANCELLED' | 'ON_HOLD';

export type ShipmentMode = 'SEA' | 'AIR' | 'UNKNOWN';

export interface StageMeta {
  key: ShipmentStage;
  /** Full label, used in the detailed timeline. */
  label: string;
  /** Compact label for step rails and cards. */
  short: string;
  /** What this means for the customer, in their terms. */
  hint: string;
  /** Position in the journey, 0-indexed. */
  index: number;
  /** Shown in the condensed 5-step progress used on cards. */
  milestone: boolean;
}

/**
 * The nine stages, ordered. Nine is the right depth for a logistics detail
 * view; cards use the five `milestone` stages instead so a small surface is
 * not asked to render nine nodes.
 */
export const SHIPMENT_STAGES: StageMeta[] = [
  {
    key: 'REGISTERED',
    label: 'Enregistré',
    short: 'Enregistré',
    hint: "Votre envoi est enregistré. Il n'est pas encore arrivé à notre entrepôt.",
    index: 0,
    milestone: false,
  },
  {
    key: 'AT_WAREHOUSE',
    label: "Reçu à l'entrepôt",
    short: 'Reçu',
    hint: "Vos colis sont arrivés à notre entrepôt en Chine.",
    index: 1,
    milestone: true,
  },
  {
    key: 'PREPARING',
    label: 'En préparation',
    short: 'Préparé',
    hint: 'Vos colis sont pesés, mesurés et préparés pour le départ.',
    index: 2,
    milestone: false,
  },
  {
    key: 'CONSOLIDATED',
    label: "Chargé dans l'envoi",
    short: 'Chargé',
    hint: 'Vos colis sont chargés avec les autres marchandises du même envoi.',
    index: 3,
    milestone: true,
  },
  {
    key: 'DEPARTED',
    label: 'Départ effectué',
    short: 'Départ',
    hint: "L'envoi a quitté le point de départ.",
    index: 4,
    milestone: false,
  },
  {
    key: 'IN_TRANSIT',
    label: 'En transit',
    short: 'Transit',
    hint: 'Votre envoi est en route vers sa destination.',
    index: 5,
    milestone: true,
  },
  {
    key: 'ARRIVED',
    label: 'Arrivé à destination',
    short: 'Arrivé',
    hint: "L'envoi est arrivé et passe les formalités de dédouanement.",
    index: 6,
    milestone: true,
  },
  {
    key: 'READY_FOR_PICKUP',
    label: 'Prêt pour retrait',
    short: 'Retrait',
    hint: 'Vous pouvez venir récupérer vos colis.',
    index: 7,
    milestone: false,
  },
  {
    key: 'DELIVERED',
    label: 'Livré',
    short: 'Livré',
    hint: 'Vos colis vous ont été remis.',
    index: 8,
    milestone: true,
  },
];

export const STAGE_BY_KEY: Record<ShipmentStage, StageMeta> = SHIPMENT_STAGES.reduce(
  (acc, s) => {
    acc[s.key] = s;
    return acc;
  },
  {} as Record<ShipmentStage, StageMeta>,
);

/** The condensed progression shown on cards and list rows. */
export const MILESTONE_STAGES: StageMeta[] = SHIPMENT_STAGES.filter((s) => s.milestone);

// ============================================================
// Source vocabulary → canonical stage
//
// Every historical state is listed explicitly. An unlisted value returns null
// so an unmapped status surfaces as "à confirmer" rather than being guessed.
// ============================================================

/** Goods-level status (per-package). */
const GOODS_TO_STAGE: Record<string, ShipmentStage> = {
  RECEIVED_AT_WAREHOUSE: 'AT_WAREHOUSE',
  PACKED: 'PREPARING',
  ASSIGNED_TO_CONTAINER: 'CONSOLIDATED',
  LOADED_IN_CONTAINER: 'CONSOLIDATED',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED_DESTINATION: 'ARRIVED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DELIVERED: 'DELIVERED',
};

/** Commercial order status. `Pending`/`Inactive` mean "not yet at warehouse". */
const ORDER_TO_STAGE: Record<string, ShipmentStage> = {
  Pending: 'REGISTERED',
  Inactive: 'REGISTERED',
  Active: 'AT_WAREHOUSE',
  'In Transit': 'IN_TRANSIT',
  Arrived: 'ARRIVED',
  Delivered: 'DELIVERED',
};

/** Sea container status. */
const CONTAINER_TO_STAGE: Record<string, ShipmentStage> = {
  BOOKED: 'REGISTERED',
  EMPTY_TO_WAREHOUSE: 'AT_WAREHOUSE',
  LOADING: 'PREPARING',
  LOADED: 'CONSOLIDATED',
  GATE_IN_FULL: 'DEPARTED',
  LOADED_ON_VESSEL: 'DEPARTED',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED: 'ARRIVED',
  // Discharged is still "arrived" from the customer's side — the cargo is at
  // destination but not yet collectable.
  DISCHARGED: 'ARRIVED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DELIVERED: 'DELIVERED',
};

/** Air waybill status. */
const AIR_TO_STAGE: Record<string, ShipmentStage> = {
  CREATED: 'REGISTERED',
  PACKING: 'PREPARING',
  READY_FOR_DEPARTURE: 'DEPARTED',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED: 'ARRIVED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  DELIVERED: 'DELIVERED',
};

/** Order states that are exceptions rather than points on the journey. */
const ORDER_EXCEPTIONS: Record<string, ShipmentException> = {
  Cancelled: 'CANCELLED',
};

export type StageSource = 'goods' | 'order' | 'container' | 'air';

const SOURCE_MAPS: Record<StageSource, Record<string, ShipmentStage>> = {
  goods: GOODS_TO_STAGE,
  order: ORDER_TO_STAGE,
  container: CONTAINER_TO_STAGE,
  air: AIR_TO_STAGE,
};

/**
 * Resolve a source status onto the canonical journey.
 * Returns null when the status is absent or unrecognized.
 */
export const toStage = (
  source: StageSource,
  status?: string | null,
): ShipmentStage | null => {
  if (!status) return null;
  return SOURCE_MAPS[source][status] ?? null;
};

/** Resolve an exception state, if this status represents one. */
export const toException = (status?: string | null): ShipmentException | null => {
  if (!status) return null;
  return ORDER_EXCEPTIONS[status] ?? null;
};

/**
 * A shipment's stage is the furthest point any of its signals has reached.
 *
 * A shipment aggregates several records (an order, its goods, the container
 * carrying them) which update at different times. Taking the maximum avoids
 * showing a customer "at warehouse" when the container has already sailed.
 */
export const resolveStage = (
  candidates: (ShipmentStage | null | undefined)[],
): ShipmentStage | null => {
  const known = candidates.filter((c): c is ShipmentStage => !!c);
  if (known.length === 0) return null;
  return known.reduce((furthest, s) =>
    STAGE_BY_KEY[s].index > STAGE_BY_KEY[furthest].index ? s : furthest,
  );
};

/** Completion across the full nine-stage journey, 0–100. */
export const stageProgress = (stage: ShipmentStage | null): number => {
  if (!stage) return 0;
  const last = SHIPMENT_STAGES.length - 1;
  return Math.round((STAGE_BY_KEY[stage].index / last) * 100);
};

/** True once the shipment needs the customer to act. */
export const needsCustomerAction = (stage: ShipmentStage | null): boolean =>
  stage === 'READY_FOR_PICKUP';

/** Human label with a safe fallback, mirroring the old customerStatusLabel. */
export const stageLabel = (
  stage: ShipmentStage | null,
  fallback = 'Statut à confirmer',
): string => (stage ? STAGE_BY_KEY[stage].label : fallback);

export const stageShortLabel = (
  stage: ShipmentStage | null,
  fallback = '—',
): string => (stage ? STAGE_BY_KEY[stage].short : fallback);
