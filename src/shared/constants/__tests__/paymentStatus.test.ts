import {
  normalizePaymentStatus,
  isPaidStatus,
  hasPaymentStatus,
  PAYMENT_STATUS,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLOR_KEYS,
} from '../paymentStatus';

describe('paymentStatus helpers', () => {
  describe('normalizePaymentStatus', () => {
    it('normalizes full-payment values to PAID', () => {
      expect(normalizePaymentStatus('PAID')).toBe(PAYMENT_STATUS.PAID);
      expect(normalizePaymentStatus('Paid')).toBe(PAYMENT_STATUS.PAID);
      expect(normalizePaymentStatus('paid')).toBe(PAYMENT_STATUS.PAID);
      expect(normalizePaymentStatus('FULLYPAID')).toBe(PAYMENT_STATUS.PAID);
      expect(normalizePaymentStatus('FULLY PAID')).toBe(PAYMENT_STATUS.PAID);
    });

    it('normalizes partial-payment values to PARTIAL', () => {
      expect(normalizePaymentStatus('PARTIAL')).toBe(PAYMENT_STATUS.PARTIAL);
      expect(normalizePaymentStatus('Partial')).toBe(PAYMENT_STATUS.PARTIAL);
      expect(normalizePaymentStatus('PARTIALLYPAID')).toBe(PAYMENT_STATUS.PARTIAL);
      expect(normalizePaymentStatus('PARTIALLY PAID')).toBe(PAYMENT_STATUS.PARTIAL);
    });

    it('normalizes unpaid values to UNPAID', () => {
      expect(normalizePaymentStatus('UNPAID')).toBe(PAYMENT_STATUS.UNPAID);
      expect(normalizePaymentStatus('Unpaid')).toBe(PAYMENT_STATUS.UNPAID);
      expect(normalizePaymentStatus('unpaid')).toBe(PAYMENT_STATUS.UNPAID);
    });

    it('treats missing or unknown statuses as UNPAID', () => {
      expect(normalizePaymentStatus(undefined)).toBe(PAYMENT_STATUS.UNPAID);
      expect(normalizePaymentStatus(null)).toBe(PAYMENT_STATUS.UNPAID);
      expect(normalizePaymentStatus('')).toBe(PAYMENT_STATUS.UNPAID);
      expect(normalizePaymentStatus('UNKNOWN')).toBe(PAYMENT_STATUS.UNPAID);
    });
  });

  describe('isPaidStatus', () => {
    it('returns true only for fully paid statuses', () => {
      expect(isPaidStatus('PAID')).toBe(true);
      expect(isPaidStatus('Paid')).toBe(true);
      expect(isPaidStatus('PARTIAL')).toBe(false);
      expect(isPaidStatus('UNPAID')).toBe(false);
      expect(isPaidStatus(undefined)).toBe(false);
    });
  });

  describe('hasPaymentStatus', () => {
    it('returns true for paid or partial statuses', () => {
      expect(hasPaymentStatus('PAID')).toBe(true);
      expect(hasPaymentStatus('Paid')).toBe(true);
      expect(hasPaymentStatus('PARTIAL')).toBe(true);
      expect(hasPaymentStatus('UNPAID')).toBe(false);
      expect(hasPaymentStatus(undefined)).toBe(false);
    });
  });

  describe('labels and colors', () => {
    it('has a label and color for every canonical status', () => {
      Object.values(PAYMENT_STATUS).forEach((status) => {
        expect(PAYMENT_STATUS_LABELS[status]).toBeDefined();
        expect(PAYMENT_STATUS_COLOR_KEYS[status]).toMatch(/^(success|warning|error)$/);
      });
    });
  });
});
