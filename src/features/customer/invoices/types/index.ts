export type InvoiceType = 'GOODS' | 'SHIPPING' | 'CUSTOMS' | 'STORAGE' | 'INSURANCE' | 'OTHER';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  type: InvoiceType;
  status: InvoiceStatus;
  userId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
  dueDate: string;
  paidAmount: number;
  paidAt?: string;
  paymentMethod?: string;
  paymentReference?: string;
  notes?: string;
  terms?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceFilters {
  status?: Exclude<InvoiceStatus, 'DRAFT'>;
  search?: string;
  page?: number;
  limit?: number;
}

export interface InvoicesListResponse {
  data: Invoice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const INVOICE_TYPE_LABELS: Record<InvoiceType, string> = {
  GOODS: 'Marchandises',
  SHIPPING: 'Expédition',
  CUSTOMS: 'Douane',
  STORAGE: 'Stockage',
  INSURANCE: 'Assurance',
  OTHER: 'Autre',
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  DRAFT: 'Brouillon',
  SENT: 'À payer',
  PAID: 'Payée',
  OVERDUE: 'En retard',
  CANCELLED: 'Annulée',
};

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT: '#9E9E9E',
  SENT: '#2196F3',
  PAID: '#4CAF50',
  OVERDUE: '#F44336',
  CANCELLED: '#757575',
};
