import { fromContainer, fromOrder, buildShipments, toMode } from '../shipment';
import type { CustomerContainer } from '@src/features/customer/containers/types/container';
import type { productType } from '@src/shared/api/order';

// Minimal fixtures: only the fields the adapters actually read. Casting keeps
// the tests focused on adapter behavior rather than on rebuilding entire API
// payloads that the adapters ignore.
const container = (over: Partial<CustomerContainer> = {}): CustomerContainer =>
  ({
    _id: 'c1',
    virtualContainerNumber: 'LEXD-001',
    shippingMode: 'SEA',
    shippingLine: 'Maersk',
    status: 'IN_TRANSIT',
    route: { name: 'r', origin: 'Guangzhou', destination: 'Bamako', estimatedTransitDays: 45 },
    timeline: {},
    myGoods: [],
    ...over,
  }) as unknown as CustomerContainer;

const goods = (over: Record<string, unknown> = {}) =>
  ({
    _id: 'g1',
    goodsId: 'G-1',
    description: 'Cartons',
    weight: 12,
    actualCBM: 0.5,
    status: 'IN_TRANSIT',
    ...over,
  }) as never;

const order = (over: Partial<productType> = {}): productType =>
  ({
    _id: 'o1',
    code: 'ORD-1',
    status: 'Inactive',
    quantity: 3,
    shippingMode: 'sea',
    route: [],
    ...over,
  }) as unknown as productType;

describe('toMode', () => {
  it('normalizes the many spellings of mode', () => {
    expect(toMode('SEA')).toBe('SEA');
    expect(toMode('sea')).toBe('SEA');
    expect(toMode('maritime')).toBe('SEA');
    expect(toMode('AIR')).toBe('AIR');
    expect(toMode('air freight')).toBe('AIR');
  });

  it('returns UNKNOWN rather than guessing', () => {
    expect(toMode(undefined)).toBe('UNKNOWN');
    expect(toMode('')).toBe('UNKNOWN');
    expect(toMode('something')).toBe('UNKNOWN');
  });

  it('honors the explicit air flag over the raw string', () => {
    expect(toMode('SEA', true)).toBe('AIR');
  });
});

describe('fromContainer', () => {
  it('maps a sea container onto a shipment', () => {
    const s = fromContainer(container());
    expect(s.reference).toBe('LEXD-001');
    expect(s.mode).toBe('SEA');
    expect(s.stage).toBe('IN_TRANSIT');
    expect(s.origin).toBe('Guangzhou');
    expect(s.destination).toBe('Bamako');
    expect(s.carrier).toBe('Maersk');
    expect(s.source).toBe('container');
  });

  it('reads air status and carrier for an airway bill', () => {
    const s = fromContainer(
      container({
        trackingType: 'AIRWAY_BILL',
        awbNumber: 'AWB-9',
        airwayBillStatus: 'READY_FOR_DEPARTURE',
        airline: 'Ethiopian',
        flightNumber: 'ET900',
        status: 'BOOKED' as never, // sea status must be ignored for air
      }),
    );
    expect(s.mode).toBe('AIR');
    expect(s.stage).toBe('DEPARTED');
    expect(s.carrier).toBe('Ethiopian · ET900');
  });

  it('aggregates contents and totals', () => {
    const s = fromContainer({
      ...container(),
      myGoods: [goods(), goods({ _id: 'g2', goodsId: 'G-2', weight: 8, actualCBM: 0.25 })],
    } as CustomerContainer);
    expect(s.itemCount).toBe(2);
    expect(s.totalWeightKg).toBe(20);
    expect(s.totalCbm).toBe(0.75);
    expect(s.contents[0].reference).toBe('G-1');
  });

  it('takes the furthest signal when goods lead the container', () => {
    // Container still says loading, but the goods report arrival.
    const s = fromContainer({
      ...container({ status: 'LOADING' as never }),
      myGoods: [goods({ status: 'ARRIVED_DESTINATION' })],
    } as CustomerContainer);
    expect(s.stage).toBe('ARRIVED');
  });

  it('flags pickup as needing customer action', () => {
    const s = fromContainer(container({ status: 'READY_FOR_PICKUP' as never }));
    expect(s.needsAction).toBe(true);
    const t = fromContainer(container({ status: 'IN_TRANSIT' as never }));
    expect(t.needsAction).toBe(false);
  });

  it('survives a container with no goods and no totals', () => {
    const s = fromContainer(container({ myGoods: [] }));
    expect(s.itemCount).toBe(0);
    expect(s.totalWeightKg).toBeUndefined();
    expect(s.totalCbm).toBeUndefined();
  });
});

describe('fromOrder', () => {
  it('treats an unassigned order as a pre-shipment record', () => {
    const s = fromOrder(order());
    expect(s.stage).toBe('REGISTERED');
    expect(s.source).toBe('order');
    expect(s.reference).toBe('ORD-1');
    expect(s.progress).toBe(0);
  });

  it('surfaces a cancelled order as an exception', () => {
    const s = fromOrder(order({ status: 'Cancelled' }));
    expect(s.exception).toBe('CANCELLED');
  });

  it('prefers the finer-grained currentStatus when it leads', () => {
    const s = fromOrder(order({ status: 'Active', currentStatus: 'IN_TRANSIT' }));
    expect(s.stage).toBe('IN_TRANSIT');
  });

  it('derives endpoints from the first and last waypoint', () => {
    const s = fromOrder(
      order({
        route: [
          { id: '1', title: 'leg1', time: '', coordinates: [{ latitude: 0, longitude: 0, location: 'Yiwu' }] },
          { id: '2', title: 'leg2', time: '', coordinates: [{ latitude: 0, longitude: 0, location: 'Bamako' }] },
        ] as never,
      }),
    );
    expect(s.origin).toBe('Yiwu');
    expect(s.destination).toBe('Bamako');
  });

  it('leaves endpoints undefined when the route is empty', () => {
    const s = fromOrder(order({ route: [] as never }));
    expect(s.origin).toBeUndefined();
    expect(s.destination).toBeUndefined();
  });
});

describe('buildShipments', () => {
  it('drops an order already represented by a container', () => {
    // This is the regression that would otherwise show one shipment twice.
    const list = buildShipments(
      [container({ virtualContainerNumber: 'LEXD-001' })],
      [order({ contenairNumber: 'LEXD-001' })],
    );
    expect(list).toHaveLength(1);
    expect(list[0].source).toBe('container');
  });

  it('matches the container reference case- and whitespace-insensitively', () => {
    const list = buildShipments(
      [container({ virtualContainerNumber: 'LEXD-001' })],
      [order({ contenairNumber: '  lexd-001 ' })],
    );
    expect(list).toHaveLength(1);
  });

  it('keeps an order that has no container yet', () => {
    const list = buildShipments([], [order({ contenairNumber: undefined })]);
    expect(list).toHaveLength(1);
    expect(list[0].source).toBe('order');
    expect(list[0].stage).toBe('REGISTERED');
  });

  it('keeps an order whose container is not in the list', () => {
    const list = buildShipments(
      [container({ virtualContainerNumber: 'LEXD-001' })],
      [order({ contenairNumber: 'LEXD-999' })],
    );
    expect(list).toHaveLength(2);
  });

  it('discards orders with no usable id', () => {
    const list = buildShipments([], [order({ _id: undefined, orderId: undefined, code: undefined })]);
    expect(list).toHaveLength(0);
  });

  it('leads with shipments awaiting the customer', () => {
    const list = buildShipments(
      [
        container({ _id: 'a', virtualContainerNumber: 'A', status: 'IN_TRANSIT' as never }),
        container({ _id: 'b', virtualContainerNumber: 'B', status: 'READY_FOR_PICKUP' as never }),
      ],
      [],
    );
    expect(list[0].reference).toBe('B');
  });

  it('orders the rest by journey progress, furthest first', () => {
    const list = buildShipments(
      [
        container({ _id: 'a', virtualContainerNumber: 'A', status: 'LOADING' as never }),
        container({ _id: 'b', virtualContainerNumber: 'B', status: 'ARRIVED' as never }),
      ],
      [],
    );
    expect(list.map((s) => s.reference)).toEqual(['B', 'A']);
  });

  it('handles both sources being empty', () => {
    expect(buildShipments()).toEqual([]);
    expect(buildShipments([], [])).toEqual([]);
  });
});
