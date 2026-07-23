import { matchesFilter, matchesQuery } from '../useShipments';
import type { Shipment } from '@src/entities/shipment';

const shipment = (over: Partial<Shipment> = {}): Shipment =>
  ({
    id: 's1',
    reference: 'LEXD-001',
    mode: 'SEA',
    stage: 'IN_TRANSIT',
    exception: null,
    progress: 55,
    needsAction: false,
    origin: 'Guangzhou',
    destination: 'Bamako',
    carrier: 'Maersk',
    contents: [],
    itemCount: 0,
    isDelayed: false,
    source: 'container',
    sourceId: 's1',
    ...over,
  }) as Shipment;

describe('matchesFilter', () => {
  it('passes everything under "all"', () => {
    expect(matchesFilter(shipment(), 'all')).toBe(true);
    expect(matchesFilter(shipment({ stage: 'DELIVERED' }), 'all')).toBe(true);
    expect(matchesFilter(shipment({ exception: 'CANCELLED' }), 'all')).toBe(true);
  });

  it('"action" selects only shipments waiting on the customer', () => {
    expect(matchesFilter(shipment({ needsAction: true }), 'action')).toBe(true);
    expect(matchesFilter(shipment({ needsAction: false }), 'action')).toBe(false);
  });

  it('"delivered" selects only completed shipments', () => {
    expect(matchesFilter(shipment({ stage: 'DELIVERED' }), 'delivered')).toBe(true);
    expect(matchesFilter(shipment({ stage: 'ARRIVED' }), 'delivered')).toBe(false);
  });

  it('"active" spans the whole journey up to arrival', () => {
    (['REGISTERED', 'AT_WAREHOUSE', 'CONSOLIDATED', 'IN_TRANSIT', 'ARRIVED'] as const).forEach(
      (stage) => {
        expect(matchesFilter(shipment({ stage }), 'active')).toBe(true);
      },
    );
  });

  it('"active" excludes delivered and cancelled shipments', () => {
    expect(matchesFilter(shipment({ stage: 'DELIVERED' }), 'active')).toBe(false);
    expect(
      matchesFilter(shipment({ stage: 'IN_TRANSIT', exception: 'CANCELLED' }), 'active'),
    ).toBe(false);
  });

  it('treats an unknown stage as not active rather than assuming', () => {
    expect(matchesFilter(shipment({ stage: null }), 'active')).toBe(false);
  });
});

describe('matchesQuery', () => {
  it('matches an empty query', () => {
    expect(matchesQuery(shipment(), '')).toBe(true);
    expect(matchesQuery(shipment(), '   ')).toBe(true);
  });

  it('matches on reference, ignoring case and padding', () => {
    expect(matchesQuery(shipment(), 'lexd')).toBe(true);
    expect(matchesQuery(shipment(), '  LEXD-001 ')).toBe(true);
  });

  it('matches on route endpoints and carrier', () => {
    expect(matchesQuery(shipment(), 'bamako')).toBe(true);
    expect(matchesQuery(shipment(), 'guangzhou')).toBe(true);
    expect(matchesQuery(shipment(), 'maersk')).toBe(true);
  });

  it('searches inside the contents, so a customer can find a package', () => {
    const s = shipment({
      contents: [
        {
          id: 'g1',
          reference: 'G-42',
          description: 'Pièces détachées',
          stage: 'IN_TRANSIT',
          photos: [],
        },
      ],
    });
    expect(matchesQuery(s, 'G-42')).toBe(true);
    expect(matchesQuery(s, 'pièces')).toBe(true);
  });

  it('rejects a non-match', () => {
    expect(matchesQuery(shipment(), 'dakar')).toBe(false);
  });

  it('survives missing optional fields', () => {
    const bare = shipment({ origin: undefined, destination: undefined, carrier: undefined });
    expect(matchesQuery(bare, 'lexd')).toBe(true);
    expect(matchesQuery(bare, 'maersk')).toBe(false);
  });
});
