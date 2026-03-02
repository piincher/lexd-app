export type InvoiceType = 'GOODS' | 'SHIPPING' | 'CUSTOMS' | 'STORAGE' | 'INSURANCE' | 'OTHER';
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface InvoiceUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

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
  user?: InvoiceUser;
  goodsIds?: string[];
  containerId?: string;
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

export interface CreateInvoiceInput {
  type: InvoiceType;
  userId: string;
  goodsIds?: string[];
  containerId?: string;
  items: Omit<InvoiceItem, 'total'>[];
  taxRate?: number;
  discountAmount?: number;
  dueDate: string;
  notes?: string;
  terms?: string;
}

export interface UpdateInvoiceInput {
  items?: Omit<InvoiceItem, 'total'>[];
  taxRate?: number;
  discountAmount?: number;
  dueDate?: string;
  notes?: string;
  terms?: string;
}

export interface MarkPaidInput {
  paidAmount: number;
  paymentMethod: string;
  paymentReference?: string;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
  type?: InvoiceType;
  userId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
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

export interface InvoiceStats {
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  byStatus: Record<InvoiceStatus, { count: number; amount: number }>;
  byType: Record<InvoiceType, { count: number; amount: number }>;
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
  SENT: 'Envoyée',
  PAID: 'Payée',
  OVERDUE: 'En retard',
  CANCELLED: 'Annulée',
};

export const INVOICE_TYPE_COLORS: Record<InvoiceType, string> = {
  GOODS: '#4CAF50',
  SHIPPING: '#2196F3',
  CUSTOMS: '#FF9800',
  STORAGE: '#9C27B0',
  INSURANCE: '#F44336',
  OTHER: '#757575',
};

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT: '#9E9E9E',
  SENT: '#2196F3',
  PAID: '#4CAF50',
  OVERDUE: '#F44336',
  CANCELLED: '#757575',
};
