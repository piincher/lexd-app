/**
 * Build and share a CSV of product-redemption claims. Mirrors the app's export
 * pattern (expo-file-system File/Paths + react-native-share).
 */
import { File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';
import RNShare from 'react-native-share';
import type { ProductRedemption } from '../api/adminRewardApi';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'En attente',
  APPROVED: 'Approuvé',
  READY_FOR_PICKUP: 'Prêt',
  COLLECTED: 'Collecté',
  REJECTED: 'Rejeté',
  CANCELLED: 'Annulé',
};

// Quote a field and escape embedded quotes per RFC 4180.
const csvCell = (value: unknown): string => {
  const str = value == null ? '' : String(value);
  return `"${str.replace(/"/g, '""')}"`;
};

const buildCsv = (rows: ProductRedemption[]): string => {
  const header = [
    'Date',
    'Client',
    'Téléphone',
    'Article',
    'Quantité',
    'Points',
    'Statut',
    'Code retrait',
    'Remarques client',
  ];
  const lines = rows.map((r) =>
    [
      new Date(r.createdAt).toLocaleDateString('fr-FR'),
      r.user?.name || '',
      r.user?.phoneNumber || r.phoneVerification || '',
      r.rewardItem?.name || '',
      r.quantity,
      r.requestedPoints,
      STATUS_LABELS[r.status] || r.status,
      r.pickupCode || '',
      r.customerRemarks || '',
    ]
      .map(csvCell)
      .join(',')
  );
  // BOM so Excel opens UTF-8 (accents) correctly.
  return '﻿' + [header.map(csvCell).join(','), ...lines].join('\r\n');
};

/**
 * Write the redemptions to a cached CSV file and open the share sheet.
 * Returns false when there's nothing to export.
 */
export const exportRedemptionsCsv = async (rows: ProductRedemption[]): Promise<boolean> => {
  if (!rows || rows.length === 0) return false;

  const csv = buildCsv(rows);
  const filename = `echanges_produits_${new Date().toISOString().slice(0, 10)}.csv`;
  const file = new File(Paths.cache, filename);
  await file.write(csv);

  if (Platform.OS === 'web') return true;

  try {
    await RNShare.open({
      url: file.uri,
      type: 'text/csv',
      filename,
      title: 'Exporter les échanges',
      message: 'Échanges produits — ChinaLink Express',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('User did not share') || message.includes('cancelled')) return true;
    throw error;
  }
  return true;
};
