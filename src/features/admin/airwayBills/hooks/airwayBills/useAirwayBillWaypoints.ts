import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { airwayBillService } from '../../services/AirwayBillService';
import { UpdateAirwayBillWaypointInput } from '../../types';
import { ApiClientError } from '@src/api/client';
import { cargoBagQueryKeys } from '../cargoBags/queryKeys';
import { airwayBillQueryKeys } from './queryKeys';

type AirwayBillWaypointResponse = Awaited<ReturnType<typeof airwayBillService.getWaypoints>>;

export const useGetAirwayBillWaypoints = (
  id: string | undefined,
  options?: UseQueryOptions<AirwayBillWaypointResponse, ApiClientError>
) => {
  return useQuery({
    queryKey: airwayBillQueryKeys.waypoints(id || ''),
    queryFn: () => airwayBillService.getWaypoints(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useInitializeAirwayBillWaypoints = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => airwayBillService.initializeWaypoints(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.waypoints(id) });
    },
  });
};

export const useUpdateAirwayBillWaypoint = () => {
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
    }) => airwayBillService.updateWaypoint(id, waypointIndex, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: airwayBillQueryKeys.waypoints(variables.id) });
      queryClient.invalidateQueries({ queryKey: cargoBagQueryKeys.all });
    },
  });
};
