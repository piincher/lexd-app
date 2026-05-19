import React from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waypointQueryKeys } from '@src/shared/hooks/useWaypoints';
import { containerQueryKeys } from '../containerQueryKeys';
import { useDeleteContainer } from '../useContainerMutations';

const mockDelete = jest.fn();

jest.mock('../../../services/ContainerService', () => ({
  containerService: {
    delete: mockDelete,
  },
}));

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe('useDeleteContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('invalidates container and unassigned goods queries and clears deleted detail/waypoint queries', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    const invalidateQueries = jest.spyOn(queryClient, 'invalidateQueries');
    const removeQueries = jest.spyOn(queryClient, 'removeQueries');

    mockDelete.mockResolvedValue({
      success: true,
      data: {
        containerId: 'container-123',
        releasedGoodsCount: 2,
        deletedWaypointTrackingCount: 1,
      },
    });

    const { result } = renderHook(() => useDeleteContainer(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync('container-123');
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: containerQueryKeys.lists(),
    });
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: [...containerQueryKeys.all, 'unassigned-goods'],
    });
    expect(removeQueries).toHaveBeenCalledWith({
      queryKey: containerQueryKeys.detail('container-123'),
    });
    expect(removeQueries).toHaveBeenCalledWith({
      queryKey: waypointQueryKeys.list('container-123'),
    });
    expect(removeQueries).toHaveBeenCalledWith({
      queryKey: waypointQueryKeys.status('container-123'),
    });
  });
});
