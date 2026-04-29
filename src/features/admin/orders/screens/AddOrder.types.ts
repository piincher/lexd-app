import { imagesType } from "@src/shared/types/order";

export interface AddOrderValues {
  clientName: string;
  clientPhone: string;
  packageWeight?: number;
  priceTotal?: number;
  partenaire: string;
  images?: imagesType;
  status?: string;
  quantity?: number;
  shippingMode?: string;
  createdAt?: string;
  typeOfPackage?: string;
  currentPosition?: { id: string; title: string };
  orderId?: string;
  packageCBM?: string;
  contenairNumber?: string;
  unitPrice: number;
}
