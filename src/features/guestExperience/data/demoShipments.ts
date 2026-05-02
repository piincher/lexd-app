import type { DemoShipment } from '../types';

export const DEMO_SHIPMENTS: DemoShipment[] = [
  {
    id: 'demo-sea',
    mode: 'sea',
    label: 'Exemple conteneur maritime',
    route: 'Guangzhou → Dakar → Bamako',
    status: 'En transit vers Bamako',
    eta: 'Arrivée estimée : 35 à 45 jours',
    goodsCount: 5,
    goodsPreview: ['Cartons textiles', 'Accessoires boutique', 'Pièces détachées'],
    timeline: [
      {
        id: 'sea-loaded',
        title: 'Chargé à l’entrepôt',
        detail: 'Les marchandises sont regroupées, vérifiées puis chargées dans le conteneur.',
        status: 'done',
        icon: 'warehouse',
      },
      {
        id: 'sea-port',
        title: 'Retour au port',
        detail: 'Le conteneur plein retourne au port pour l’embarquement sur le navire.',
        status: 'done',
        icon: 'truck',
      },
      {
        id: 'sea-vessel',
        title: 'À bord du navire',
        detail: 'Le conteneur est embarqué et le trajet maritime commence.',
        status: 'active',
        icon: 'ship',
      },
      {
        id: 'sea-bamako',
        title: 'Distribution à Bamako',
        detail: 'Après le dédouanement, ChinaLink indique au client les informations de retrait.',
        status: 'next',
        icon: 'map-marker-alt',
      },
    ],
  },
  {
    id: 'demo-air',
    mode: 'air',
    label: 'Exemple expédition aérienne',
    route: 'Guangzhou → Hong Kong → Addis Abeba → Bamako',
    status: 'En vol vers Addis Abeba',
    eta: 'Arrivée estimée : 2 à 3 semaines',
    goodsCount: 2,
    goodsPreview: ['Petit électronique', 'Échantillons fournisseur'],
    timeline: [
      {
        id: 'air-warehouse',
        title: 'Entrepôt Guangzhou',
        detail: 'Les colis sont reçus, vérifiés et préparés pour le transfert.',
        status: 'done',
        icon: 'warehouse',
      },
      {
        id: 'air-hk',
        title: 'Transfert vers Hong Kong',
        detail: 'Les marchandises partent par camion vers l’aéroport de Hong Kong.',
        status: 'done',
        icon: 'truck',
      },
      {
        id: 'air-flight',
        title: 'Vol vers Addis Abeba',
        detail: 'Le suivi montre chaque grande étape de l’airway bill.',
        status: 'active',
        icon: 'plane-departure',
      },
      {
        id: 'air-bamako',
        title: 'Aéroport de Bamako',
        detail: 'Après la douane, les colis arrivent à l’entrepôt ChinaLink.',
        status: 'next',
        icon: 'plane-arrival',
      },
    ],
  },
];
