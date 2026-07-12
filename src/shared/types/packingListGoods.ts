export interface PackingListGoods {
  _id?: string;
  goodsId: string;
  description?: string;
  actualCBM?: number;
  weight?: number;
  quantity?: number;
  photos?: string[];
  images?: string[];
  status?: string;
  expressTrackingNumber?: string;
  warehouseLocation?: string;
}
