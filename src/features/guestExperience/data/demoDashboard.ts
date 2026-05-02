import type { DemoGoodsItem, DemoLockedFeature, DemoMetric } from '../types';

export const DEMO_METRICS: DemoMetric[] = [
  {
    id: 'active',
    label: 'Expéditions actives',
    value: '2',
    detail: 'Maritime + aérien',
    icon: 'route',
    tone: 'info',
  },
  {
    id: 'goods',
    label: 'Marchandises suivies',
    value: '7',
    detail: 'Dans cette démo',
    icon: 'boxes',
    tone: 'success',
  },
  {
    id: 'documents',
    label: 'Documents prêts',
    value: '3',
    detail: 'Packing, loading, facture',
    icon: 'file-invoice',
    tone: 'neutral',
  },
  {
    id: 'balance',
    label: 'Reste à payer',
    value: '128 000',
    detail: 'FCFA exemple',
    icon: 'wallet',
    tone: 'warning',
  },
];

export const DEMO_GOODS: DemoGoodsItem[] = [
  {
    id: 'good-sea-1',
    name: 'Cartons textiles',
    trackingCode: 'CLX-GZ-2408-01',
    status: 'Dans le conteneur CLX-2408',
    route: 'Guangzhou → Dakar → Bamako',
    quantity: 18,
    volume: '2,4 CBM',
    balance: '78 000 FCFA',
    mode: 'sea',
  },
  {
    id: 'good-sea-2',
    name: 'Accessoires boutique',
    trackingCode: 'CLX-GZ-2408-02',
    status: 'En transit maritime',
    route: 'Guangzhou → Dakar → Bamako',
    quantity: 9,
    volume: '1,1 CBM',
    balance: '50 000 FCFA',
    mode: 'sea',
  },
  {
    id: 'good-air-1',
    name: 'Petit électronique',
    trackingCode: 'AWB-HKG-1288-01',
    status: 'Vol vers Addis Abeba',
    route: 'Hong Kong → Addis Abeba → Bamako',
    quantity: 4,
    volume: '22 kg',
    balance: 'Payé',
    mode: 'air',
  },
];

export const DEMO_LOCKED_FEATURES: DemoLockedFeature[] = [
  {
    id: 'real-tracking',
    title: 'Suivi réel de vos colis',
    detail: 'Marchandises, statuts, airway bills, conteneurs et documents liés à votre compte.',
    reason: 'Connexion client obligatoire',
    icon: 'lock',
  },
  {
    id: 'payments',
    title: 'Paiements et factures',
    detail: 'Historique des paiements, reste à payer et reçus protégés.',
    reason: 'Données financières protégées',
    icon: 'shield-alt',
  },
  {
    id: 'notifications',
    title: 'Notifications personnalisées',
    detail: 'Alertes groupées envoyées uniquement aux clients concernés.',
    reason: 'Numéro client vérifié requis',
    icon: 'bell-slash',
  },
];
