export const shippingOptions = [
  { key: 'all', label: 'Tous' },
  { key: 'sea', label: 'Mer' },
  { key: 'air', label: 'Air' },
] as const;

export const paymentOptions = [
  { key: 'all', label: 'Paiement' },
  { key: 'UNPAID', label: 'Impayé' },
  { key: 'PARTIAL', label: 'Partiel' },
  { key: 'PAID', label: 'Payé' },
] as const;

export const linkOptions = [
  { key: 'all', label: 'Tous types' },
  { key: 'linked', label: 'Avec marchandises' },
  { key: 'manual', label: 'Manuel' },
  { key: 'unlinked', label: 'Non lié' },
] as const;

export const sortLabels = {
  updatedAt: 'Dernière activité',
  createdAt: 'Création',
  departureDate: 'Départ',
  calculatedTotal: 'Montant',
  balanceDue: 'Solde',
};
