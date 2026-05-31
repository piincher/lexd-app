/**
 * useContainerOptions
 *
 * Normalises the admin container list into pickable filter options for the
 * AllOrders advanced filters. Powers the "filter by container without typing"
 * feature: the picker sends the container `_id` (an exact backend match) rather
 * than a regex on a typed number.
 *
 * At scale: piggybacks on the shared `useGetAllContainers` React Query cache
 * (5-min staleTime) so opening the picker on the orders screen reuses any list
 * already fetched by the containers feature — no extra round-trip in the common
 * case. The heavy mapping + search index is memoised once per data change.
 */
import { useMemo } from 'react';
import { useGetAllContainers } from '@src/features/admin/containers/hooks';
import {
  CONTAINER_STATUS_LABELS,
  type Container,
  type ContainerStatus,
} from '@src/features/admin/containers/types';

export interface ContainerOption {
  /** Container `_id` — sent to the backend as the exact `container` filter value. */
  id: string;
  /** Virtual container number — always present, the primary human label. */
  virtualNumber: string;
  /** Real carrier container number, when assigned. */
  actualNumber?: string;
  status: ContainerStatus;
  statusLabel: string;
  shippingMode?: string;
  goodsCount?: number;
  /** Pre-lowercased haystack for fast client-side search inside the picker. */
  searchText: string;
}

const extractContainers = (responseData: unknown): Container[] => {
  if (Array.isArray(responseData)) return responseData as Container[];
  const nested = (responseData as { containers?: Container[] } | undefined)?.containers;
  return Array.isArray(nested) ? nested : [];
};

export const useContainerOptions = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useGetAllContainers();

  const options = useMemo<ContainerOption[]>(() => {
    const list = extractContainers((data as { data?: unknown } | undefined)?.data);

    return list
      .filter((container) => Boolean(container?._id))
      .map((container) => {
        const actualNumber = container.actualContainerNumber || container.containerNumber || undefined;
        const statusLabel = CONTAINER_STATUS_LABELS[container.status] ?? container.status;

        return {
          id: container._id,
          virtualNumber: container.virtualContainerNumber,
          actualNumber,
          status: container.status,
          statusLabel,
          shippingMode: container.shippingMode,
          goodsCount: container.goodsCount,
          searchText: [
            container.virtualContainerNumber,
            actualNumber,
            statusLabel,
            container.shippingMode,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase(),
        };
      });
  }, [data]);

  const optionsById = useMemo(() => {
    const map = new Map<string, ContainerOption>();
    options.forEach((option) => map.set(option.id, option));
    return map;
  }, [options]);

  return { options, optionsById, isLoading, isError, error, isFetching, refetch };
};

export default useContainerOptions;
