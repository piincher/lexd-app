/**
 * useContainerLoadPlan — wires the pure {@link buildLoadPlan} optimiser to the
 * unassigned-goods query and the assign mutation so the detail screen can offer
 * a one-tap "fill this container" action.
 *
 * Only meaningful while the container can still receive goods (pre-departure),
 * so callers should gate rendering on `isLoadable`.
 */
import { useMemo } from 'react';
import { useGetUnassignedGoods, useAssignGoodsToContainer } from '../../hooks';
import type { Container, ContainerStatus } from '../../types';
import type { Goods } from '../../../goods/types';
import { buildLoadPlan, type LoadPlan } from './containerLoadPlan';

const LOADABLE_STATUSES = new Set<ContainerStatus>([
  'BOOKED',
  'EMPTY_TO_WAREHOUSE',
  'LOADING',
]);

/** Normalise the various response shapes the unassigned-goods query may return. */
const extractGoods = (response: unknown): Goods[] => {
  if (Array.isArray(response)) return response as Goods[];
  const data = (response as { data?: unknown })?.data;
  if (Array.isArray(data)) return data as Goods[];
  const nested = (data as { goods?: unknown })?.goods;
  if (Array.isArray(nested)) return nested as Goods[];
  return [];
};

export const useContainerLoadPlan = (container: Container | undefined) => {
  const isLoadable = !!container && LOADABLE_STATUSES.has(container.status);

  const { data, isLoading } = useGetUnassignedGoods(container?.shippingMode, {
    enabled: isLoadable,
  });
  const assignMutation = useAssignGoodsToContainer();

  const unassignedGoods = useMemo(() => extractGoods(data), [data]);

  const plan: LoadPlan | null = useMemo(
    () => (container ? buildLoadPlan(container, unassignedGoods) : null),
    [container, unassignedGoods],
  );

  const applyPlan = () => {
    if (!container || !plan || plan.suggested.length === 0) return;
    assignMutation.mutate({
      containerId: container._id,
      data: { goodsIds: plan.suggested.map((item) => item.goods._id) },
    });
  };

  return {
    isLoadable,
    isLoading,
    plan,
    applyPlan,
    isApplying: assignMutation.isPending,
  };
};
