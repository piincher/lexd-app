import {
  SHIPMENT_STAGES,
  MILESTONE_STAGES,
  STAGE_BY_KEY,
  toStage,
  toException,
  resolveStage,
  stageProgress,
  stageLabel,
  needsCustomerAction,
  type ShipmentStage,
} from '../lifecycle';

import {
  CUSTOMER_GOODS_STATUS_LABELS,
  CUSTOMER_ORDER_STATUS_LABELS,
  CUSTOMER_CONTAINER_STATUS_LABELS,
  CUSTOMER_AIR_STATUS_LABELS,
} from '@src/shared/lib/customerStatus';

describe('shipment lifecycle', () => {
  describe('stage table', () => {
    it('is ordered with contiguous indices', () => {
      SHIPMENT_STAGES.forEach((s, i) => expect(s.index).toBe(i));
    });

    it('exposes five milestones for compact display', () => {
      expect(MILESTONE_STAGES).toHaveLength(5);
      expect(MILESTONE_STAGES.map((s) => s.key)).toEqual([
        'AT_WAREHOUSE',
        'CONSOLIDATED',
        'IN_TRANSIT',
        'ARRIVED',
        'DELIVERED',
      ]);
    });

    it('gives every stage a distinct label and short label', () => {
      const labels = SHIPMENT_STAGES.map((s) => s.label);
      const shorts = SHIPMENT_STAGES.map((s) => s.short);
      expect(new Set(labels).size).toBe(labels.length);
      expect(new Set(shorts).size).toBe(shorts.length);
    });
  });

  /**
   * Regression guard. If a status is added to any customer vocabulary without a
   * corresponding lifecycle mapping, that status would silently render as
   * "Statut à confirmer" in production. These tests fail instead.
   */
  describe('coverage of every existing source vocabulary', () => {
    it.each([
      ['goods', CUSTOMER_GOODS_STATUS_LABELS],
      ['container', CUSTOMER_CONTAINER_STATUS_LABELS],
      ['air', CUSTOMER_AIR_STATUS_LABELS],
    ] as const)('maps every %s status', (source, labels) => {
      const unmapped = Object.keys(labels).filter((k) => toStage(source, k) === null);
      expect(unmapped).toEqual([]);
    });

    it('maps every order status, treating Cancelled as an exception', () => {
      const unmapped = Object.keys(CUSTOMER_ORDER_STATUS_LABELS).filter(
        (k) => toStage('order', k) === null && toException(k) === null,
      );
      expect(unmapped).toEqual([]);
    });
  });

  describe('toStage', () => {
    it('resolves representative statuses from each vocabulary', () => {
      expect(toStage('goods', 'RECEIVED_AT_WAREHOUSE')).toBe('AT_WAREHOUSE');
      expect(toStage('order', 'Inactive')).toBe('REGISTERED');
      expect(toStage('container', 'LOADED_ON_VESSEL')).toBe('DEPARTED');
      expect(toStage('air', 'READY_FOR_DEPARTURE')).toBe('DEPARTED');
    });

    it('treats a discharged container as arrived, not collectable', () => {
      // Cargo is at destination but customs is not cleared — promoting this to
      // READY_FOR_PICKUP would tell customers to travel to the warehouse early.
      expect(toStage('container', 'DISCHARGED')).toBe('ARRIVED');
    });

    it('collapses both consolidation states onto one stage', () => {
      expect(toStage('goods', 'ASSIGNED_TO_CONTAINER')).toBe('CONSOLIDATED');
      expect(toStage('goods', 'LOADED_IN_CONTAINER')).toBe('CONSOLIDATED');
    });

    it('returns null for unknown or missing input rather than guessing', () => {
      expect(toStage('goods', 'SOMETHING_NEW')).toBeNull();
      expect(toStage('order', undefined)).toBeNull();
      expect(toStage('container', null)).toBeNull();
      expect(toStage('air', '')).toBeNull();
    });

    it('does not leak statuses across vocabularies', () => {
      // 'BOOKED' is a container concept; goods never report it.
      expect(toStage('goods', 'BOOKED')).toBeNull();
      expect(toStage('container', 'PACKED')).toBeNull();
    });
  });

  describe('toException', () => {
    it('identifies cancelled orders', () => {
      expect(toException('Cancelled')).toBe('CANCELLED');
    });

    it('does not treat ordinary statuses as exceptions', () => {
      expect(toException('Active')).toBeNull();
      expect(toException(undefined)).toBeNull();
    });
  });

  describe('resolveStage', () => {
    it('takes the furthest signal, so a sailed container wins over stale goods', () => {
      expect(resolveStage(['AT_WAREHOUSE', 'IN_TRANSIT', 'PREPARING'])).toBe('IN_TRANSIT');
    });

    it('ignores missing signals', () => {
      expect(resolveStage([null, 'CONSOLIDATED', undefined])).toBe('CONSOLIDATED');
    });

    it('returns null when nothing is known', () => {
      expect(resolveStage([])).toBeNull();
      expect(resolveStage([null, undefined])).toBeNull();
    });

    it('is order-independent', () => {
      const a = resolveStage(['DELIVERED', 'AT_WAREHOUSE']);
      const b = resolveStage(['AT_WAREHOUSE', 'DELIVERED']);
      expect(a).toBe(b);
      expect(a).toBe('DELIVERED');
    });
  });

  describe('stageProgress', () => {
    it('runs 0 to 100 across the journey', () => {
      expect(stageProgress('REGISTERED')).toBe(0);
      expect(stageProgress('DELIVERED')).toBe(100);
    });

    it('increases monotonically', () => {
      const values = SHIPMENT_STAGES.map((s) => stageProgress(s.key));
      const sorted = [...values].sort((x, y) => x - y);
      expect(values).toEqual(sorted);
    });

    it('is 0 when the stage is unknown', () => {
      expect(stageProgress(null)).toBe(0);
    });
  });

  describe('customer-facing helpers', () => {
    it('flags only pickup as needing customer action', () => {
      const acting = SHIPMENT_STAGES.filter((s) => needsCustomerAction(s.key));
      expect(acting.map((s) => s.key)).toEqual(['READY_FOR_PICKUP']);
    });

    it('falls back rather than rendering an empty status', () => {
      expect(stageLabel(null)).toBe('Statut à confirmer');
      expect(stageLabel(null, 'Inconnu')).toBe('Inconnu');
      expect(stageLabel('IN_TRANSIT')).toBe('En transit');
    });

    it('keeps STAGE_BY_KEY in sync with the table', () => {
      SHIPMENT_STAGES.forEach((s) => {
        expect(STAGE_BY_KEY[s.key as ShipmentStage]).toBe(s);
      });
    });
  });
});
