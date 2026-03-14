import { Theme } from '@src/constants/Theme';
import { WhatsAppRequestStatus, WhatsAppRequestType } from '@src/features/admin/whatsapp-requests/api/whatsappRequestApi';

export const STATUS_FILTERS: { key: WhatsAppRequestStatus | 'all'; label: string; color: string }[] = [
  { key: 'all', label: 'Tous', color: Theme.neutral[500] },
  { key: 'PENDING', label: 'En attente', color: '#F59E0B' },
  { key: 'PROCESSING', label: 'En cours', color: '#3B82F6' },
  { key: 'COMPLETED', label: 'Terminé', color: '#10B981' },
  { key: 'FAILED', label: 'Échoué', color: '#EF4444' },
];

export const TYPE_LABELS: Record<WhatsAppRequestType, string> = {
  PACKING_LIST: 'Liste de colisage',
  LOADING_LIST: 'Liste de chargement',
  TRACKING: 'Suivi',
  INVOICE: 'Facture',
  GENERAL: 'Général',
};

export const STATUS_LABELS: Record<WhatsAppRequestStatus, string> = {
  PENDING: 'En attente',
  PROCESSING: 'En cours',
  COMPLETED: 'Terminé',
  FAILED: 'Échoué',
  CANCELLED: 'Annulé',
};
