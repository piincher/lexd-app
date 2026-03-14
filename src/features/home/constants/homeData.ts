/**
 * HomeScreen Data Constants
 */

export const PARTNER_LOGOS = [
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/cma-cgm.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/maersk.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/hapag.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/ethiopian.png',
  'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/turkish.png',
];

export const FEATURES = [
  'Expedition rapide',
  'Suivi en temps réel',
  'Assurance complète',
  'Dedouanement inclus',
  'Service client 24/7',
];

export const WORKFLOW_STEPS = [
  { 
    icon: 'headset', 
    title: "1. Contactez & Choisissez la Méthode", 
    description: "Contactez-nous et choisissez votre méthode d'expédition préférée" 
  },
  { 
    icon: 'map-location-dot', 
    title: "2. Recevez l'adresse de l'entrepôt", 
    description: "Nous fournissons notre adresse d'entrepôt chinois pour la consolidation des colis" 
  },
  { 
    icon: 'box-archive', 
    title: "3. Arrivée des colis", 
    description: "Nous vous informons de l'arrivée de tous les articles à notre dépôt" 
  },
  { 
    icon: 'earth-africa', 
    title: "4. Expédition vers le Mali", 
    description: "Nous nous occupons du dédouanement et du transport vers le Mali" 
  },
  { 
    icon: 'hand-holding-hand', 
    title: "5. Collecte du colis", 
    description: "Récupérez votre envoi dans notre centre de distribution au Mali" 
  },
];

export const SHIPPING_CARDS = [
  {
    title: "Fret Aérien",
    description: "Livraison rapide en 2 à 3 semaines avec suivi en temps réel",
    icon: "plane",
    colors: ['#4A90E2', '#1ED7B5'] as [string, string],
    navigateTo: "faq" as const,
    delay: 200,
  },
  {
    title: "Sea Freight",
    description: "Expédition économique en vrac (6 à 8 semaines)",
    icon: "ship",
    colors: ['#1ED7B5', '#4A90E2'] as [string, string],
    navigateTo: "AboutUs" as const,
    delay: 400,
  },
];
