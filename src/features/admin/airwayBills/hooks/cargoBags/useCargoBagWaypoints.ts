import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { cargoBagService } from '../../services/CargoBagService';
import { UpdateAirwayBillWaypointInput } from '../../types';
import { ApiClientError } from '@src/api/client';
import { cargoBagQueryKeys } from './queryKeys';

type CargoBagWaypointQueryResponse = Awaited<ReturnType<typeof cargoBagService.getWaypoints>>;

export const useGetCargoBagWaypoints = (
  id: string | undefined,
  options?: UseQueryOptions<CargoBagWaypointQueryResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: cargoBagQueryKeys.waypoints(id || ''),
    queryFn: () => cargoBagService.getWaypoints(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useInitializeCargoBagWaypoints = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cargoBagService.initializeWaypoints(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.waypoints(id) });
    },
  });
};

export const useUpdateCargoBagWaypoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      waypointIndex,
      input,
    }: {
      id: string;
      waypointIndex: number;
      input: UpdateAirwayBillWaypointInput;
    }) => cargoBagService.updateWaypoint(id, waypointIndex, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.waypoints(variables.id) });
    },
  });
};
