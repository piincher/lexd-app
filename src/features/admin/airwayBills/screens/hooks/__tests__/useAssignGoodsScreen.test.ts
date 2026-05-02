/**
 * useAssignGoodsScreen Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({
    params: { airwayBillId: 'awb-456' },
  }),
}));

const mockAssignToBag = jest.fn();
const mockAssignToAwb = jest.fn();

jest.mock('../../hooks/useAirwayBills', () => ({
  useGetAirwayBillById: () => ({
    data: {
      data: {
        airwayBill: {
          _id: 'awb-456',
          awbNumber: 'TEST-001',
          capacityWeight: 28000,
          totalWeight: 10,
          goodsIds: [
            { _id: 'g1', goodsId: 'G-001', description: 'On AWB no bag', weight: 5, quantity: 1, cargoBagId: null },
            { _id: 'g2', goodsId: 'G-002', description: 'On AWB in bag', weight: 5, quantity: 1, cargoBagId: 'bag-123' },
          ],
        },
      },
    },
    isLoading: false,
  }),
  useGetUnassignedAirGoods: () => ({
    data: {
      data: {
        goods: [
          { _id: 'g3', goodsId: 'G-003', description: 'Unassigned', weight: 3, quantity: 1 },
        ],
      },
    },
    isLoading: false,
  }),
  useAssignGoodsToAirwayBill: () => ({
    mutateAsync: mockAssignToAwb,
    isPending: false,
  }),
}));

jest.mock('../../hooks/useCargoBags', () => ({
  useGetCargoBagsByAwb: () => ({
    data: {
      data: {
        cargoBags: [
          { _id: 'bag-123', bagNumber: 'BAG-001' },
        ],
      },
    },
    isLoading: false,
  }),
  useGetCargoBagEligibleGoods: () => ({
    data: {
      data: {
        goods: [
          { _id: 'g1', goodsId: 'G-001', description: 'On AWB no bag', weight: 5, quantity: 1, cargoBagId: null },
          { _id: 'g3', goodsId: 'G-003', description: 'Unassigned', weight: 3, quantity: 1 },
        ],
      },
    },
    isLoading: false,
  }),
  useCreateCargoBag: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
  useAddGoodsToCargoBag: () => ({
    mutateAsync: mockAssignToBag,
    isPending: false,
  }),
}));

import { useAssignGoodsScreen } from '../useAssignGoodsScreen';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useAssignGoodsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show unassigned goods when no bag is selected (AWB direct)', () => {
    const { result } = renderHook(() => useAssignGoodsScreen(), { wrapper });

    expect(result.current.selectedBagId).toBeNull();
    expect(result.current.goodsList).toHaveLength(1);
    expect(result.current.goodsList[0]._id).toBe('g3');
  });

  it('should show eligible bag goods when a bag is selected', () => {
    const { result } = renderHook(() => useAssignGoodsScreen(), { wrapper });

    act(() => {
      result.current.setSelectedBagId('bag-123');
    });

    expect(result.current.selectedBagId).toBe('bag-123');
    expect(result.current.goodsList.map((goods) => goods._id)).toEqual(['g1', 'g3']);
  });

  it('should clear selected IDs when switching bags', () => {
    const { result } = renderHook(() => useAssignGoodsScreen(), { wrapper });

    act(() => {
      result.current.toggleSelection('g3');
    });

    expect(result.current.selectedIds).toContain('g3');

    act(() => {
      result.current.setSelectedBagId('bag-123');
    });

    expect(result.current.selectedIds).toHaveLength(0);
  });

  it('should call AWB direct assignment when no bag selected', async () => {
    const { result } = renderHook(() => useAssignGoodsScreen(), { wrapper });

    act(() => {
      result.current.toggleSelection('g3');
    });

    await act(async () => {
      await result.current.handleAssign();
    });

    expect(mockAssignToAwb).toHaveBeenCalledWith({
      id: 'awb-456',
      input: { goodsIds: ['g3'] },
    });
  });

  it('should call bag assignment with awbId when bag is selected', async () => {
    const { result } = renderHook(() => useAssignGoodsScreen(), { wrapper });

    act(() => {
      result.current.setSelectedBagId('bag-123');
    });

    act(() => {
      result.current.toggleSelection('g1');
    });

    mockAssignToBag.mockResolvedValueOnce({
      data: { results: { success: ['g1'], failed: [] } },
    });

    await act(async () => {
      await result.current.handleAssign();
    });

    expect(mockAssignToBag).toHaveBeenCalledWith({
      id: 'bag-123',
      input: { goodsIds: ['g1'] },
      awbId: 'awb-456',
    });
  });
});
