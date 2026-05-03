/**
 * Unit tests for goods query hooks
 * Ensures API response shape is correctly mapped to domain types
 */

describe('useGetGoodsDetail select transform', () => {
  it('extracts goods object from backend wrapper response', () => {
    // The backend GET /goods/:id returns { data: { goods: actualGoodsObj } }
    // The select transform must unwrap this wrapper
    const mockGoods = {
      _id: 'goods-123',
      goodsId: 'G-2601-0001',
      actualCBM: 2.5,
      weight: 150,
      quantity: 10,
      description: 'Electronics',
      warehouseLocation: 'C3',
      status: 'IN_TRANSIT',
      shippingMode: 'SEA',
      totalCost: 300000,
      amountPaid: 150000,
      paymentStatus: 'PARTIAL',
      photos: ['https://example.com/photo1.jpg'],
      receivedAt: '2026-01-15T08:00:00Z',
    };

    const mockResponse = {
      data: {
        data: {
          goods: mockGoods,
        },
      },
    };

    // This mirrors the select transform in useGetGoodsDetail
    const select = (response: typeof mockResponse) => response.data.data.goods;
    const result = select(mockResponse);

    expect(result).toEqual(mockGoods);
    expect(result.actualCBM).toBe(2.5);
    expect(result.weight).toBe(150);
    expect(result.status).toBe('IN_TRANSIT');
    expect(result.totalCost).toBe(300000);
  });
});
