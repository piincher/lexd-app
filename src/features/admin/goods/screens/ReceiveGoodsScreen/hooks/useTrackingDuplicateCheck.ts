/**
 * useTrackingDuplicateCheck - Guards against receiving the same parcel twice.
 * Looks up existing goods by express tracking number and reports an exact match so the
 * operator can be warned before a duplicate intake is created. Fails open (never blocks
 * a save) if the lookup itself errors.
 */

import { useCallback } from 'react';
import { goodsService } from '@src/features/admin/goods/services/GoodsService';
import type { Goods } from '../../../types';

export type TrackingDuplicate =
  | { exists: false }
  | { exists: true; goodsId?: string; id?: string };

type GoodsListEnvelope = {
  data?: Goods[] | { data?: Goods[]; goods?: Goods[]; items?: Goods[] };
  goods?: Goods[];
  items?: Goods[];
};

const extractList = (res: unknown): Goods[] => {
  const payload = (res as GoodsListEnvelope)?.data ?? res;
  if (Array.isArray(payload)) return payload;
  const envelope = payload as GoodsListEnvelope;
  if (Array.isArray(envelope.data)) return envelope.data;
  if (Array.isArray(envelope.goods)) return envelope.goods;
  if (Array.isArray(envelope.items)) return envelope.items;
  return [];
};

export const useTrackingDuplicateCheck = () => {
  const checkDuplicate = useCallback(async (tracking?: string): Promise<TrackingDuplicate> => {
    const query = (tracking || '').trim();
    if (query.length < 3) return { exists: false };

    try {
      const res = await goodsService.getAll({ search: query });
      const list = extractList(res);
      const match = list.find(
        (g) => String(g?.expressTrackingNumber || '').trim().toLowerCase() === query.toLowerCase(),
      );
      if (match) return { exists: true, goodsId: match.goodsId, id: match._id };
      return { exists: false };
    } catch {
      return { exists: false }; // fail open — never block intake on a lookup error
    }
  }, []);

  return { checkDuplicate };
};
