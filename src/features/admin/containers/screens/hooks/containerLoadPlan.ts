/**
 * Smart load planning — pure, client-side.
 *
 * Given a container's remaining capacity and the pool of unassigned goods, we
 * greedily pick the goods that best fill the container (CBM for SEA, weight for
 * AIR) without overflowing — a classic knapsack-style fill optimisation. The
 * operator sees a one-tap "load these N items to reach X% fill" suggestion
 * instead of hand-picking from a long list.
 */
import type { Container } from '../../types';
import type { Goods } from '../../../goods/types';

export interface LoadPlanItem {
  goods: Goods;
  /** The capacity this item consumes in the container's unit. */
  size: number;
}

export interface LoadPlan {
  unit: 'CBM' | 'kg';
  capacity: number;
  usedBefore: number;
  remainingBefore: number;
  /** Goods recommended for loading, ordered by best fit. */
  suggested: LoadPlanItem[];
  /** Unassigned goods that don't fit the remaining space. */
  skipped: LoadPlanItem[];
  projectedUsed: number;
  projectedFillPercentage: number;
  addedSize: number;
}

const goodsSize = (goods: Goods, unit: 'CBM' | 'kg'): number => {
  if (unit === 'kg') return Math.max(goods.weight ?? 0, 0);
  return Math.max(goods.actualCBM ?? 0, 0);
};

/**
 * Build a load-plan suggestion for a container.
 *
 * @param container Target container (uses status capacity + current fill).
 * @param unassignedGoods Candidate goods not yet assigned to any container.
 */
export const buildLoadPlan = (container: Container, unassignedGoods: Goods[]): LoadPlan => {
  const isAir = container.shippingMode === 'AIR';
  const unit: 'CBM' | 'kg' = isAir ? 'kg' : 'CBM';

  const capacity = (isAir ? container.capacityWeight : container.capacityCBM) ?? 0;
  const usedBefore = isAir
    ? (container.goods ?? []).reduce((sum, g) => sum + (g.weight ?? 0), 0)
    : container.totalCBM ?? 0;
  const remainingBefore = Math.max(capacity - usedBefore, 0);

  // Only consider goods matching the container's shipping mode (or unspecified).
  const candidates = unassignedGoods
    .filter((g) => !g.shippingMode || g.shippingMode === container.shippingMode)
    .map<LoadPlanItem>((g) => ({ goods: g, size: goodsSize(g, unit) }))
    .filter((item) => item.size > 0)
    // Largest-first greedy: packs big items before they're crowded out.
    .sort((a, b) => b.size - a.size);

  const suggested: LoadPlanItem[] = [];
  const skipped: LoadPlanItem[] = [];
  let addedSize = 0;

  // No declared capacity → can't optimise; suggest nothing, surface all as skipped.
  if (capacity <= 0) {
    return {
      unit,
      capacity,
      usedBefore,
      remainingBefore,
      suggested: [],
      skipped: candidates,
      projectedUsed: usedBefore,
      projectedFillPercentage: 0,
      addedSize: 0,
    };
  }

  for (const item of candidates) {
    if (addedSize + item.size <= remainingBefore + 1e-6) {
      suggested.push(item);
      addedSize += item.size;
    } else {
      skipped.push(item);
    }
  }

  const projectedUsed = usedBefore + addedSize;
  const projectedFillPercentage = Math.min((projectedUsed / capacity) * 100, 100);

  return {
    unit,
    capacity,
    usedBefore,
    remainingBefore,
    suggested,
    skipped,
    projectedUsed,
    projectedFillPercentage,
    addedSize,
  };
};
