/**
 * Order contact & share helpers
 *
 * Pure utilities for the order detail "advanced" quick actions: building a
 * tel:/WhatsApp deep link from a possibly-messy phone string, and composing a
 * shareable order summary. Kept side-effect free so they're trivial to test.
 */
import type { productType } from '@src/api/order';

const parsePrice = (value: unknown): number => {
  if (value === null || value === undefined || value === '') return 0;
  const num = parseFloat(String(value));
  return Number.isNaN(num) ? 0 : num;
};

/** Strip everything except digits and a leading +, for tel:/wa.me links. */
export const sanitizePhone = (phone?: string): string => {
  if (!phone) return '';
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/[^\d]/g, '');
  return hasPlus ? `+${digits}` : digits;
};

export const telUrl = (phone?: string): string => `tel:${sanitizePhone(phone)}`;

/** wa.me requires the number without a leading +. */
export const whatsappUrl = (phone?: string): string =>
  `https://wa.me/${sanitizePhone(phone).replace(/^\+/, '')}`;

const money = (value: number) => `${value.toLocaleString('fr-FR')} FCFA`;

/** Human-readable order summary for the native share sheet. */
export const buildOrderShareMessage = (order: productType): string => {
  const total =
    parsePrice(order?.calculatedTotal) || parsePrice(order?.priceTotal) || parsePrice(order?.totalCost);
  const paid = parsePrice(order?.paidAmount);
  const balance = parsePrice(order?.balanceDue) || Math.max(0, total - paid);

  const container =
    order?.containerSummaries?.[0]?.virtualContainerNumber ||
    order?.containerSummaries?.[0]?.containerNumber ||
    order?.contenairNumber;

  const lines = [
    'LEXD — Commande',
    order?.code ? `Code : ${order.code}` : null,
    order?.clientName ? `Client : ${order.clientName}` : null,
    order?.clientPhone ? `Téléphone : ${order.clientPhone}` : null,
    container ? `Conteneur : ${container}` : null,
    total > 0 ? `Montant total : ${money(total)}` : null,
    paid > 0 ? `Payé : ${money(paid)}` : null,
    balance > 0 ? `Solde dû : ${money(balance)}` : null,
    order?.status ? `Statut : ${order.status}` : null,
  ].filter(Boolean);

  return lines.join('\n');
};
