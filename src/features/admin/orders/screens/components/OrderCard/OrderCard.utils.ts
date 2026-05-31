import type { productType } from '@src/api/order';

export type NormalizedPaymentStatus = 'PAID' | 'PARTIAL' | 'UNPAID';

export const parseOrderMoney = (value: unknown): number => {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getOrderTotal = (order: productType): number =>
  parseOrderMoney(order.calculatedTotal) || parseOrderMoney(order.priceTotal) || parseOrderMoney(order.totalCost);

export const getPaymentSummary = (order: productType) => {
  const total = getOrderTotal(order);
  const paid = parseOrderMoney(order.paidAmount);
  const recordedBalance = parseOrderMoney(order.balanceDue);
  const balance = recordedBalance || Math.max(0, total - paid);
  const rawStatus = String(order.paymentStatus || '').toUpperCase();

  let status: NormalizedPaymentStatus = 'UNPAID';
  if (rawStatus === 'PAID' || (total > 0 && balance <= 0)) {
    status = 'PAID';
  } else if (rawStatus === 'PARTIAL' || paid > 0) {
    status = 'PARTIAL';
  }

  return { total, paid, balance, status };
};

export const formatMoney = (value: number): string =>
  value > 0 ? `${value.toLocaleString('fr-FR')} FCFA` : 'Non défini';

export const formatShortDate = (value?: string): string => {
  if (!value) return 'No date';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('fr-FR');
};
