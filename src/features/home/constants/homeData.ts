/**
 * Home Screen Data Constants
 * Single source of truth for all home page section content
 */

// ============================================
// HIGHLIGHTS / STATS
// ============================================

export const HIGHLIGHTS = [
  { value: '2-3', unit: 'semaines', label: 'Fret Aerien', icon: 'airplane' as const },
  { value: '6-8', unit: 'semaines', label: 'Fret Maritime', icon: 'ship' as const },
  { value: '24/7', unit: '', label: 'Support Client', icon: 'headset' as const },
] as const;

// ============================================
// SERVICES
// ============================================

export const SERVICES = [
  {
    id: 'air',
    title: 'Fret Aerien',
    description: 'Livraison rapide avec suivi en temps reel',
    deliveryTime: '2 a 3 semaines',
    icon: 'plane' as const,
    gradient: ['#0EA5E9', '#0284C7'] as [string, string],
    navigateTo: 'faq' as const,
  },
  {
    id: 'sea',
    title: 'Fret Maritime',
    description: 'Expedition economique en vrac',
    deliveryTime: '6 a 8 semaines',
    icon: 'ship' as const,
    gradient: ['#8B5CF6', '#7C3AED'] as [string, string],
    navigateTo: 'AboutUs' as const,
  },
] as const;

// ============================================
// WORKFLOW STEPS
// ============================================

export const WORKFLOW_STEPS = [
  {
    icon: 'headset' as const,
    title: 'Contactez-nous',
    description: "Choisissez votre methode d'expedition preferee",
    color: '#0EA5E9',
  },
  {
    icon: 'map-location-dot' as const,
    title: "Adresse entrepot",
    description: "Recevez notre adresse d'entrepot chinois",
    color: '#8B5CF6',
  },
  {
    icon: 'box-archive' as const,
    title: 'Arrivee des colis',
    description: "Vos articles arrivent a notre depot",
    color: '#F59E0B',
  },
  {
    icon: 'earth-africa' as const,
    title: 'Expedition',
    description: 'Dedouanement et transport vers le Mali',
    color: '#22C55E',
  },
  {
    icon: 'hand-holding-hand' as const,
    title: 'Collecte',
    description: 'Recuperez votre envoi au centre de distribution',
    color: '#10B981',
  },
] as const;

// ============================================
// BENEFITS / WHY CHOOSE US
// ============================================

export const BENEFITS = [
  { label: 'Expedition rapide', icon: 'bolt' as const, color: '#0EA5E9' },
  { label: 'Suivi temps reel', icon: 'location-dot' as const, color: '#22C55E' },
  { label: 'Assurance complete', icon: 'shield-halved' as const, color: '#F59E0B' },
  { label: 'Dedouanement inclus', icon: 'file-invoice' as const, color: '#8B5CF6' },
  { label: 'Service 24/7', icon: 'headset' as const, color: '#EF4444' },
  { label: 'Prix competitifs', icon: 'tags' as const, color: '#10B981' },
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
    color: '#22C55E',
    chinalink: 'yes',
    chinalinkDetail: 'App mobile + notifications',
    others: 'partial',
    othersDetail: 'WhatsApp seulement',
  },
  {
    label: 'Dedouanement inclus',
    icon: 'file-invoice',
    color: '#8B5CF6',
    chinalink: 'yes',
    chinalinkDetail: 'Inclus dans le prix',
    others: 'partial',
    othersDetail: 'Frais supplementaires',
  },
  {
    label: 'Assurance colis',
    icon: 'shield-halved',
    color: '#F59E0B',
    chinalink: 'yes',
    chinalinkDetail: 'Couverture complete',
    others: 'partial',
    othersDetail: 'Limitee ou absente',
  },
  {
    label: 'Support client',
    icon: 'headset',
    color: '#0EA5E9',
    chinalink: 'yes',
    chinalinkDetail: '24/7 WhatsApp + App',
    others: 'no',
    othersDetail: 'Horaires limites',
  },
  {
    label: 'Transparence des prix',
    icon: 'tags',
    color: '#10B981',
    chinalink: 'yes',
    chinalinkDetail: 'Prix fixes, pas de surprises',
    others: 'partial',
    othersDetail: 'Frais caches frequents',
  },
  {
    label: 'Delai de livraison',
    icon: 'bolt',
    color: '#EF4444',
    chinalink: 'yes',
    chinalinkDetail: '2-3 sem (air) / 6-8 sem (mer)',
    others: 'partial',
    othersDetail: 'Retards frequents',
  },
  {
    label: 'Entrepot en Chine',
    icon: 'warehouse',
    color: '#D4AF37',
    chinalink: 'yes',
    chinalinkDetail: 'Entrepot propre',
    others: 'yes',
    othersDetail: 'Partage ou tiers',
  },
  {
    label: 'Certificat de fidelite',
    icon: 'award',
    color: '#6366F1',
    chinalink: 'yes',
    chinalinkDetail: 'Certificat verifiable',
    others: 'no',
    othersDetail: 'Non disponible',
  },
  {
    label: 'Livraison porte-a-porte',
    icon: 'truck-fast',
    color: '#EC4899',
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
