// Manual Order creation request
export interface CreateManualOrderRequest {
  clientName: string;
  clientPhone?: string;
  userId?: string;
  destinationCountry?: string; // default: "ML"
  shippingMode?: "air" | "sea"; // default: "sea"
  shipmentLine?: string;
  estimatedCbm?: number;
  manualOrderStatus?: "PREBOOKING" | "AWAITING_GOODS";
  notes?: string;
}

// Manual Order creation response (from API)
export interface CreateManualOrderResponse {
  message: string;
  order: {
    _id: string;
    code: string;
    clientName: string;
    status: string;
    manualOrderStatus: string;
    isManual: boolean;
  };
}

// Manual Order list item (for order selection UI)
export interface ManualOrderListItem {
  _id: string;
  code: string;
  clientName: string;
  clientPhone?: string;
  status: string;
  manualOrderStatus: "PREBOOKING" | "AWAITING_GOODS" | "LINKED" | "CONVERTED";
  estimatedCbm: number;
  shippingMode: "air" | "sea";
  createdAt: string;
}

// Form values for manual order creation
export interface ManualOrderFormValues {
  clientName: string;
  clientPhone: string;
  userId: string;
  shippingMode: "air" | "sea";
  shipmentLine?: string;
  estimatedCbm: string; // string for form input
  orderType: "standard" | "prebooking";
  notes: string;
}

// Convert Pre-booking to regular order request
export interface ConvertPrebookingRequest {
  orderId: string;
}

// Convert Pre-booking response (from API)
export interface ConvertPrebookingResponse {
  message: string;
  order: {
    _id: string;
    code: string;
    manualOrderStatus: string;
    status: string;
  };
}

// Default export of all types
export default {
  CreateManualOrderRequest: {} as CreateManualOrderRequest,
  CreateManualOrderResponse: {} as CreateManualOrderResponse,
  ManualOrderListItem: {} as ManualOrderListItem,
  ManualOrderFormValues: {} as ManualOrderFormValues,
  ConvertPrebookingRequest: {} as ConvertPrebookingRequest,
  ConvertPrebookingResponse: {} as ConvertPrebookingResponse,
};
