import type { Goods } from '@src/features/admin/shared/types';
import type { OutstandingPaymentItem } from '../../types';
import { buildAdminWorkQueue } from '../workQueue';

const NOW = new Date('2026-07-13T00:00:00.000Z').getTime();

const goods = (overrides: Partial<Goods>): Goods => ({
  _id: 'goods-1',
  goodsId: 'CLX-001',
  clientId: 'client-1',
  receivedBy: 'admin-1',
  receivedAt: '2026-07-10T00:00:00.000Z',
  warehouseLocation: 'A-1',
  actualCBM: 1,
  quantity: 1,
  photos: [],
  description: 'Carton test',
  status: 'RECEIVED_AT_WAREHOUSE',
  unitPrice: 1000,
  totalCost: 1000,
  amountPaid: 0,
  paymentStatus: 'UNPAID',
  qrCodeData: 'CLX-001',
  createdAt: '2026-07-10T00:00:00.000Z',
  updatedAt: '2026-07-10T00:00:00.000Z',
  ...overrides,
});

const payment = (overrides: Partial<OutstandingPaymentItem>): OutstandingPaymentItem => ({
  _id: 'payment-1',
  goodsId: 'CLX-002',
  description: 'Machine',
  clientId: 'client-2',
  clientName: 'Awa Traoré',
  phoneNumber: '22300000000',
  totalCost: 200000,
  amountPaid: 50000,
  balanceDue: 150000,
  paymentStatus: 'PARTIAL',
  shippingMode: 'SEA',
  createdAt: '2026-04-01T00:00:00.000Z',
  receivedAt: '2026-04-01T00:00:00.000Z',
  ...overrides,
});

describe('buildAdminWorkQueue', () => {
  it('creates separate owner, intake, and assignment tasks for a problematic receipt', () => {
    const result = buildAdminWorkQueue([
      goods({
        clientId: null,
        ownerStatus: 'UNIDENTIFIED',
        intakeException: { isException: true, reasons: ['DAMAGED'], notes: 'Coin écrasé' },
      }),
    ], [], NOW);

    expect(result.map((item) => item.kind)).toEqual(['owner', 'intake', 'assignment']);
    expect(result.filter((item) => item.severity === 'critical')).toHaveLength(2);
  });

  it('puts old critical payments before newer assignment work', () => {
    const result = buildAdminWorkQueue([goods({})], [payment({})], NOW);

    expect(result[0]).toMatchObject({ kind: 'payment', severity: 'critical', amountDue: 150000 });
    expect(result[1]).toMatchObject({ kind: 'assignment', severity: 'info' });
  });

  it('escalates unassigned goods after eight days', () => {
    const result = buildAdminWorkQueue([
      goods({ receivedAt: '2026-07-01T00:00:00.000Z' }),
    ], [], NOW);

    expect(result[0]).toMatchObject({ kind: 'assignment', severity: 'critical', ageDays: 12 });
  });
});
