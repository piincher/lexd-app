/**
 * Home Screen Data Constants
 * Single source of truth for all home page section content
 */

import { Theme } from '@src/constants/Theme';

// ============================================
// HIGHLIGHTS / STATS
// ============================================

export const HIGHLIGHTS = [
  { value: '2-3', unit: 'semaines', label: 'Fret aérien', icon: 'airplane' as const },
  { value: '6-8', unit: 'semaines', label: 'Fret Maritime', icon: 'ship' as const },
  { value: '24/7', unit: '', label: 'Support Client', icon: 'headset' as const },
] as const;

// ============================================
// SERVICES
// ============================================

export const SERVICES = [
  {
    id: 'air',
    title: 'Fret aérien',
    description: 'Livraison rapide avec suivi en temps réel',
    deliveryTime: '2 à 3 semaines',
    icon: 'plane' as const,
    gradient: ['#0EA5E9', '#0284C7'] as [string, string],
    navigateTo: 'ChooseShippingMethod' as const,
  },
  {
    id: 'sea',
    title: 'Fret Maritime',
    description: 'Expédition économique en vrac',
    deliveryTime: '6 à 8 semaines',
    icon: 'ship' as const,
    gradient: ['#8B5CF6', '#7C3AED'] as [string, string],
    navigateTo: 'ChooseShippingMethod' as const,
  },
] as const;

// ============================================
// WORKFLOW STEPS
// ============================================

export const WORKFLOW_STEPS = [
  {
    icon: 'headset' as const,
    title: 'Contactez-nous',
    description: "Choisissez votre méthode d'expédition préférée",
    color: Theme.colors.status.info,
  },
  {
    icon: 'map-location-dot' as const,
    title: "Adresse entrepôt",
    description: "Recevez notre adresse d'entrepôt chinois",
    color: Theme.colors.primary.main,
  },
  {
    icon: 'box-archive' as const,
    title: 'Arrivée des colis',
    description: "Vos articles arrivent à notre dépôt",
    color: Theme.colors.status.warning,
  },
  {
    icon: 'earth-africa' as const,
    title: 'Expédition',
    description: 'Dédouanement et transport vers le Mali',
    color: Theme.colors.status.success,
  },
  {
    icon: 'hand-holding-hand' as const,
    title: 'Collecte',
    description: 'Récupérez votre envoi au centre de distribution',
    color: Theme.colors.primary.main,
  },
] as const;

// ============================================
// BENEFITS / WHY CHOOSE US
// ============================================

export const BENEFITS = [
  { label: 'Expédition rapide', icon: 'bolt' as const, color: Theme.colors.status.info },
  { label: 'Suivi temps réel', icon: 'location-dot' as const, color: Theme.colors.status.success },
  { label: 'Assurance complète', icon: 'shield-halved' as const, color: Theme.colors.status.warning },
  { label: 'Dédouanement inclus', icon: 'file-invoice' as const, color: Theme.colors.primary.main },
  { label: 'Service 24/7', icon: 'headset' as const, color: Theme.colors.status.error },
  { label: 'Prix compétitifs', icon: 'tags' as const, color: Theme.colors.primary.main },
] as const;

// ============================================
// COMPARISON: CHINALINK vs OTHERS
// ============================================

export type ComparisonStatus = 'yes' | 'no' | 'partial';

export interface ComparisonFeature {
  label: string;
  icon: string;
  color: string;
  chinalink: ComparisonStatus;
  chinalinkDetail?: string;
  others: ComparisonStatus;
  othersDetail?: string;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    label: 'Suivi en temps reel',
    icon: 'location-dot',
    color: Theme.colors.status.success,
    chinalink: 'yes',
    chinalinkDetail: 'App mobile + notifications',
    others: 'partial',
    othersDetail: 'WhatsApp seulement',
  },
  {
    label: 'Dedouanement inclus',
    icon: 'file-invoice',
    color: Theme.colors.primary.main,
    chinalink: 'yes',
    chinalinkDetail: 'Inclus dans le prix',
    others: 'partial',
    othersDetail: 'Frais supplementaires',
  },
  {
    label: 'Assurance colis',
    icon: 'shield-halved',
    color: Theme.colors.status.warning,
    chinalink: 'yes',
    chinalinkDetail: 'Couverture complete',
    others: 'partial',
    othersDetail: 'Limitee ou absente',
  },
  {
    label: 'Support client',
    icon: 'headset',
    color: Theme.colors.status.info,
    chinalink: 'yes',
    chinalinkDetail: '24/7 WhatsApp + App',
    others: 'no',
    othersDetail: 'Horaires limites',
  },
  {
    label: 'Transparence des prix',
    icon: 'tags',
    color: Theme.colors.primary.main,
    chinalink: 'yes',
    chinalinkDetail: 'Prix fixes, pas de surprises',
    others: 'partial',
    othersDetail: 'Frais caches frequents',
  },
  {
    label: 'Delai de livraison',
    icon: 'bolt',
    color: Theme.colors.status.error,
    chinalink: 'yes',
    chinalinkDetail: '2-3 sem (air) / 6-8 sem (mer)',
    others: 'partial',
    othersDetail: 'Retards frequents',
  },
  {
    label: 'Entrepot en Chine',
    icon: 'warehouse',
    color: Theme.colors.accent.gold,
    chinalink: 'yes',
    chinalinkDetail: 'Entrepot propre',
    others: 'yes',
    othersDetail: 'Partage ou tiers',
  },
  {
    label: 'Certificat de fidelite',
    icon: 'award',
    color: Theme.colors.status.info,
    chinalink: 'yes',
    chinalinkDetail: 'Certificat verifiable',
    others: 'no',
    othersDetail: 'Non disponible',
  },
  {
    label: 'Livraison porte-a-porte',
    icon: 'truck-fast',
    color: Theme.colors.status.error,
    chinalink: 'yes',
    chinalinkDetail: 'Bamako',
    others: 'yes',
    othersDetail: 'Bamako seulement',
  },
  
];

// ============================================
// COMPARISON SUMMARY STATS
// ============================================

export const COMPARISON_SUMMARY = {
  chinalinkScore: 10,
  othersScore: 3,
  totalFeatures: 10,
};

// ============================================
// PARTNER LOGOS
// ============================================

export const PARTNER_LOGOS = [
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png',
] as const;
