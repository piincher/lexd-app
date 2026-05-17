/**
 * Goods Types
 */

import { GoodsStatus } from '@src/shared/types';

/**
 * Customer's goods within a container
 */
export interface CustomerGoodsInContainer {
  _id: string;
  goodsId: string;
  description: string;
  actualCBM: number;
  weight: number;
  status: GoodsStatus;
  photos?: string[];
}
