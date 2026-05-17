/**
 * Final destination information with consignee details
 */
export interface FinalDestination {
  city: string;
  country: string;
  warehouse: string;
  consignee: {
    name: string;
    phone: string;
    email?: string;
  };
}

/**
 * Consignee information (populated)
 */
export interface ConsigneeInfo {
  _id: string;
  name: string;
  phone: string;
  warehouseAddress: string;
  email?: string;
  businessHours?: string;
}
