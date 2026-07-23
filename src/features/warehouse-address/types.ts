export type WarehouseMode = 'AIR' | 'SEA';

export interface WarehouseAddress {
  mode: WarehouseMode;
  companyName: string;
  warehouseCode: string;
  recipientName: string;
  phone: string;
  addressDetail: string;
  addressDetailFr: string;
  city: string;
  province: string;
  postalCode: string;
  contactWhatsApp: string;
  contactWeChat: string;
  note: string;
  active: boolean;
  updatedAt: string | null;
}
