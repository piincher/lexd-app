/**
 * Timeline Types and Constants
 */

/**
 * Container timeline for tracking
 */
export interface ContainerTimeline {
  bookedAt: string;
  emptyDispatchedAt?: string;
  loadingStartedAt?: string;
  loadingCompletedAt?: string;
  gateInFullAt?: string;
  loadedOnVesselAt?: string;
  departedAt?: string;
  arrivedAt?: string;
  dischargedAt?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
}

/**
 * Timeline step labels (French)
 */
export const TIMELINE_STEP_LABELS: Record<keyof ContainerTimeline, string> = {
  bookedAt: 'Envoi planifié',
  emptyDispatchedAt: 'Préparation au chargement',
  loadingStartedAt: 'Chargement commencé',
  loadingCompletedAt: 'Chargement terminé',
  gateInFullAt: 'Au port de départ',
  loadedOnVesselAt: 'Chargé sur le navire',
  departedAt: 'Départ',
  arrivedAt: 'Arrivé',
  dischargedAt: 'Déchargé',
  readyForPickupAt: 'Prêt pour retrait',
  deliveredAt: 'Livré',
};

/**
 * Order of timeline steps for display
 */
export const TIMELINE_STEPS_ORDER: (keyof ContainerTimeline)[] = [
  'bookedAt',
  'emptyDispatchedAt',
  'loadingStartedAt',
  'loadingCompletedAt',
  'gateInFullAt',
  'loadedOnVesselAt',
  'departedAt',
  'arrivedAt',
  'dischargedAt',
  'readyForPickupAt',
  'deliveredAt',
];

/**
 * Customer-visible steps only (simplified timeline)
 */
export const CUSTOMER_TIMELINE_STEPS: { key: keyof ContainerTimeline; label: string }[] = [
  { key: 'bookedAt', label: 'Planifié' },
  { key: 'loadingStartedAt', label: 'Chargement' },
  { key: 'loadingCompletedAt', label: 'Chargé' },
  { key: 'gateInFullAt', label: 'Port' },
  { key: 'loadedOnVesselAt', label: 'Navire' },
  { key: 'departedAt', label: 'En transit' },
  { key: 'arrivedAt', label: 'Arrivé' },
  { key: 'dischargedAt', label: 'Déchargé' },
  { key: 'readyForPickupAt', label: 'Retrait' },
  { key: 'deliveredAt', label: 'Livré' },
];
