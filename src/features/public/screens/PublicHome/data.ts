export const PARTNER_LOGOS = [
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png',
];

export const SERVICES = [
  {
    id: 'air',
    icon: 'plane',
    title: 'Fret Aérien',
    description: 'Livraison rapide en 2-3 semaines avec suivi en temps réel',
    color: '#4A90E2',
    features: ['2-3 semaines', 'Suivi temps réel', 'Idéal pour petits colis'],
  },
  {
    id: 'sea',
    icon: 'ship',
    title: 'Fret Maritime',
    description: 'Solution économique pour gros volumes (45-60 jours)',
    color: '#1ED7B5',
    features: ['45-60 jours', 'Meilleur prix/KG', 'Parfait pour bulk'],
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: 'clock-check',
    title: '10+ Ans',
    subtitle: "D'expérience",
    description: 'Service logistique fiable depuis 2013',
  },
  {
    icon: 'shield-check',
    title: '100%',
    subtitle: 'Assuré',
    description: 'Protection complète de vos marchandises',
  },
  {
    icon: 'headset',
    title: '24/7',
    subtitle: 'Support',
    description: 'Assistance client disponible à tout moment',
  },
  {
    icon: 'cash-multiple',
    title: 'Meilleurs',
    subtitle: 'Tarifs',
    description: 'Prix compétitifs sans compromis qualité',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    icon: 'phone',
    title: 'Contactez-nous',
    description: 'Choisissez votre méthode de livraison préférée',
  },
  {
    step: '02',
    icon: 'warehouse',
    title: 'Adresse Chine',
    description: 'Recevez notre adresse d\'entrepôt en Chine',
  },
  {
    step: '03',
    icon: 'package-variant',
    title: 'Envoyez vos colis',
    description: 'Faites livrer vos achats à notre entrepôt',
  },
  {
    step: '04',
    icon: 'truck-delivery',
    title: 'Livraison Mali',
    description: 'Nous nous occupons du transport jusqu\'à vous',
  },
];

export type Service = typeof SERVICES[0];
export type WhyChooseItem = typeof WHY_CHOOSE_US[0];
export type HowItWorksStep = typeof HOW_IT_WORKS[0];
