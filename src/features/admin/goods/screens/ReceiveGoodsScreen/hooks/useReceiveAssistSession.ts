import { useCallback, useMemo, useState } from 'react';
import type { userData } from '@src/shared/types/user';
import type { Goods, ReceiveGoodsInput } from '../../../types';
import { unwrapReceiveGoods } from './unwrapReceiveGoods';

export interface ReceiveSessionItem {
  id: string;
  goodsId: string;
  description: string;
  clientName: string;
  tracking?: string;
  weight: number;
  cbm: number;
  totalCost: number;
  isException: boolean;
  createdAt: string;
  goods?: Goods;
}

const getClientName = (client: userData | null, input: ReceiveGoodsInput) => {
  if (!client || input.exceptionReasons?.includes('CLIENT_UNKNOWN')) return 'Client inconnu';
  return `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.phoneNumber || 'Client';
};

export const useReceiveAssistSession = () => {
  const [items, setItems] = useState<ReceiveSessionItem[]>([]);
  const [recentClients, setRecentClients] = useState<userData[]>([]);

  const addSavedGoods = useCallback((
    result: unknown,
    input: ReceiveGoodsInput,
    client: userData | null,
  ) => {
    const goods = unwrapReceiveGoods(result);
    const item: ReceiveSessionItem = {
      id: goods?._id || `${Date.now()}`,
      goodsId: goods?.goodsId || 'Enregistré',
      description: goods?.description || input.description,
      clientName: getClientName(client, input),
      tracking: goods?.expressTrackingNumber || input.expressTrackingNumber,
      weight: goods?.weight ?? input.weight,
      cbm: goods?.actualCBM ?? input.actualCBM ?? 0,
      totalCost: goods?.totalCost ?? (
        input.shippingMode === 'AIR'
          ? input.weight * input.unitPrice
          : (input.actualCBM || 0) * input.unitPrice
      ),
      isException: !!input.exceptionReasons?.length,
      createdAt: new Date().toISOString(),
      goods,
    };

    setItems((current) => [item, ...current].slice(0, 20));
    if (client) {
      setRecentClients((current) => {
        const next = [client, ...current.filter((c) => c._id !== client._id)];
        return next.slice(0, 8);
      });
    }
    return item;
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const resetSession = useCallback(() => {
    setItems([]);
  }, []);

  const stats = useMemo(() => ({
    count: items.length,
    totalCBM: items.reduce((sum, item) => sum + item.cbm, 0),
    totalWeight: items.reduce((sum, item) => sum + item.weight, 0),
    totalValue: items.reduce((sum, item) => sum + item.totalCost, 0),
    exceptionCount: items.filter((item) => item.isException).length,
  }), [items]);

  return { items, recentClients, stats, addSavedGoods, removeItem, resetSession };
};
