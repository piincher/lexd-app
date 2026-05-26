/**
 * goodsListSorting - Client-side quick-filter predicates and sort comparators.
 *
 * Both operate on the already-loaded `goods` array (no extra API roundtrips) so a chip
 * tap or sort change is instant. Server-side filters (mode, status, search, client,
 * date range) still happen upstream; these apply on top of that filtered set.
 *
 * Quick filters are intentionally tolerant — they read from multiple plausible fields
 * (e.g. damaged checks both `condition` and the new `intakeException.reasons`) so we
 * don't miss records depending on which intake path created them.
 */

import type { Goods } from '../types';

export type QuickFilterKey = 'aged_7d' | 'unpaid' | 'damaged' | 'unidentified' | 'this_week';

export type SortKey = 'date_recent' | 'date_oldest' | 'cbm_desc' | 'cost_desc' | 'client_asc';

export const QUICK_FILTERS: { key: QuickFilterKey; label: string }[] = [
  { key: 'aged_7d', label: 'Vieux >7j' },
  { key: 'unpaid', label: 'Impayés' },
  { key: 'damaged', label: 'Endommagés' },
  { key: 'unidentified', label: 'Non identifiés' },
  { key: 'this_week', label: 'Cette semaine' },
];

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'date_recent', label: 'Date (plus récent)' },
  { key: 'date_oldest', label: 'Date (plus ancien)' },
  { key: 'cbm_desc', label: 'CBM (plus grand)' },
  { key: 'cost_desc', label: 'Coût (plus élevé)' },
  { key: 'client_asc', label: 'Client (A → Z)' },
];

export const DEFAULT_SORT: SortKey = 'date_recent';

const DAY_MS = 24 * 60 * 60 * 1000;

const getReceivedAtMs = (g: Goods): number =>
  g.receivedAt ? new Date(g.receivedAt).getTime() : 0;

const getAgeDays = (g: Goods): number => {
  if (!g.receivedAt) return -1;
  return Math.floor((Date.now() - getReceivedAtMs(g)) / DAY_MS);
};

const isAtWarehouse = (g: Goods): boolean => g.status === 'RECEIVED_AT_WAREHOUSE';

const isUnpaid = (g: Goods): boolean => {
  if (g.paymentStatus === 'UNPAID' || g.paymentStatus === 'PARTIAL') return true;
  // Fall back to balance math when paymentStatus isn't set / is stale.
  const total = g.totalCost || 0;
  const paid = g.amountPaid || 0;
  return total > 0 && paid < total;
};

const isDamaged = (g: Goods): boolean => {
  // Two intake paths historically — legacy `condition` field and the newer
  // `intakeException.reasons` array. Check both so neither slips through.
  const condition = (g as unknown as { condition?: string }).condition;
  if (condition === 'damaged') return true;
  const reasons = (g as unknown as { intakeException?: { reasons?: string[] } })
    .intakeException?.reasons;
  return Array.isArray(reasons) && reasons.includes('DAMAGED');
};

const isUnidentified = (g: Goods): boolean => {
  const ownerStatus = (g as unknown as { ownerStatus?: string }).ownerStatus;
  if (ownerStatus === 'UNIDENTIFIED') return true;
  if (!g.clientId) return true;
  // Populated client object — only truly unidentified if it's missing an _id.
  if (typeof g.clientId === 'object' && !g.clientId._id) return true;
  return false;
};

export const applyQuickFilter = (goods: Goods[], key: QuickFilterKey | null): Goods[] => {
  if (!key) return goods;
  switch (key) {
    case 'aged_7d':
      return goods.filter((g) => isAtWarehouse(g) && getAgeDays(g) >= 7);
    case 'this_week':
      return goods.filter((g) => {
        const age = getAgeDays(g);
        return age >= 0 && age <= 7;
      });
    case 'unpaid':
      return goods.filter(isUnpaid);
    case 'damaged':
      return goods.filter(isDamaged);
    case 'unidentified':
      return goods.filter(isUnidentified);
    default:
      return goods;
  }
};

const getClientNameLower = (g: Goods): string => {
  if (!g.clientId || typeof g.clientId === 'string') return '';
  return `${g.clientId.firstName || ''} ${g.clientId.lastName || ''}`.trim().toLowerCase();
};

export const applySort = (goods: Goods[], key: SortKey): Goods[] => {
  const arr = [...goods];
  switch (key) {
    case 'date_recent':
      return arr.sort((a, b) => getReceivedAtMs(b) - getReceivedAtMs(a));
    case 'date_oldest':
      return arr.sort((a, b) => getReceivedAtMs(a) - getReceivedAtMs(b));
    case 'cbm_desc':
      return arr.sort((a, b) => (b.actualCBM || 0) - (a.actualCBM || 0));
    case 'cost_desc':
      return arr.sort((a, b) => (b.totalCost || 0) - (a.totalCost || 0));
    case 'client_asc':
      return arr.sort((a, b) => {
        const an = getClientNameLower(a);
        const bn = getClientNameLower(b);
        // Push unidentified parcels to the end of the alphabetical list.
        if (!an && !bn) return 0;
        if (!an) return 1;
        if (!bn) return -1;
        return an.localeCompare(bn);
      });
    default:
      return arr;
  }
};
