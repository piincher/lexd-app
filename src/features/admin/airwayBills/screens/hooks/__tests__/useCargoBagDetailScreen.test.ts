/**
 * useCargoBagDetailScreen Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({
    params: { cargoBagId: 'bag-123', airwayBillId: 'awb-456' },
  }),
}));

// Mock hooks
const mockRemoveMutation = { mutateAsync: jest.fn(), isPending: false };
const mockUpdateStatusMutation = { mutateAsync: jest.fn(), isPending: false };
const mockRefetch = jest.fn();

jest.mock('../../hooks/useCargoBags', () => ({
  useGetCargoBagById: () => ({
    data: {
      data: {
        cargoBag: {
          _id: 'bag-123',
          bagNumber: 'BAG-TEST-001',
          status: 'PACKED',
          totalPackages: 2,
          totalWeight: 15.5,
          goodsCount: 2,
          goodsIds: [
            { _id: 'g1', goodsId: 'G-001', description: 'Test goods 1', weight: 5, quantity: 1, status: 'PACKED' },
            { _id: 'g2', goodsId: 'G-002', description: 'Test goods 2', weight: 10.5, quantity: 1, status: 'PACKED' },
          ],
        },
      },
    },
    isLoading: false,
    isFetching: false,
    refetch: mockRefetch,
  }),
  useRemoveGoodsFromCargoBag: () => mockRemoveMutation,
  useUpdateCargoBagStatus: () => mockUpdateStatusMutation,
}));

import { useCargoBagDetailScreen } from '../useCargoBagDetailScreen';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useCargoBagDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load cargo bag data and goods list', () => {
    const { result } = renderHook(() => useCargoBagDetailScreen(), { wrapper });

    expect(result.current.cargoBag).toBeDefined();
    expect(result.current.cargoBag?.bagNumber).toBe('BAG-TEST-001');
    expect(result.current.goodsList).toHaveLength(2);
    expect(result.current.isLoading).toBe(false);
  });

  it('should toggle remove mode and manage selections', () => {
    const { result } = renderHook(() => useCargoBagDetailScreen(), { wrapper });

    expect(result.current.removeMode).toBe(false);

    act(() => {
      result.current.handleToggleRemoveMode();
    });

    expect(result.current.removeMode).toBe(true);

    act(() => {
      result.current.handleToggleRemoveSelection('g1');
    });

    expect(result.current.selectedRemoveIds).toContain('g1');

    act(() => {
      result.current.handleToggleRemoveSelection('g1');
    });

    expect(result.current.selectedRemoveIds).not.toContain('g1');
  });

  it('should clear selections when exiting remove mode', () => {
    const { result } = renderHook(() => useCargoBagDetailScreen(), { wrapper });

    act(() => {
      result.current.handleToggleRemoveMode();
    });

    act(() => {
      result.current.handleToggleRemoveSelection('g1');
    });

    expect(result.current.selectedRemoveIds).toHaveLength(1);

    act(() => {
      result.current.handleToggleRemoveMode();
    });

    expect(result.current.removeMode).toBe(false);
    expect(result.current.selectedRemoveIds).toHaveLength(0);
  });

  it('should call refetch on refresh', () => {
    const { result } = renderHook(() => useCargoBagDetailScreen(), { wrapper });

    act(() => {
      result.current.handleRefresh();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });
});
