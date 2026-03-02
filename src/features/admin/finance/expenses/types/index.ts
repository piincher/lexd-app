export type ExpenseType = 
  | 'FUEL' 
  | 'CUSTOMS' 
  | 'WAREHOUSE' 
  | 'TRANSPORT' 
  | 'INSURANCE' 
  | 'MAINTENANCE' 
  | 'SALARIES' 
  | 'UTILITIES' 
  | 'OTHER';

export type ExpenseStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type PaymentMethod = 'CASH' | 'BANK_TRANSFER' | 'MOBILE_MONEY' | 'CARD' | 'CHECK';

export interface Expense {
  _id: string;
  expenseId: string;
  type: ExpenseType;
  category?: string;
  description: string;
  amount: number;
  date: string;
  receiptUrl?: string;
  containerId?: string;
  container?: { virtualContainerNumber: string };
  vendor: string;
  paymentMethod: PaymentMethod;
  status: ExpenseStatus;
  approvedBy?: { firstName: string; lastName: string };
  approvedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  byType: Record<ExpenseType, number>;
  byContainer: Array<{ containerId: string; total: number }>;
  recentExpenses: Expense[];
}

export interface ExpenseFilters {
  type?: ExpenseType;
  status?: ExpenseStatus;
  startDate?: string;
  endDate?: string;
  containerId?: string;
  vendor?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface CreateExpenseInput {
  type: ExpenseType;
  category?: string;
  description: string;
  amount: number;
  date: string;
  vendor: string;
  paymentMethod: PaymentMethod;
  containerId?: string;
  notes?: string;
}

export interface UpdateExpenseInput extends Partial<CreateExpenseInput> {
  status?: ExpenseStatus;
}

export const EXPENSE_TYPE_CONFIG: Record<ExpenseType, { label: string; color: string; icon: string }> = {
  FUEL: { label: 'Carburant', color: '#EF4444', icon: 'gas-station' },
  CUSTOMS: { label: 'Douane', color: '#F59E0B', icon: 'office-building' },
  WAREHOUSE: { label: 'Entrepôt', color: '#3B82F6', icon: 'warehouse' },
  TRANSPORT: { label: 'Transport', color: '#10B981', icon: 'truck' },
  INSURANCE: { label: 'Assurance', color: '#8B5CF6', icon: 'shield' },
  MAINTENANCE: { label: 'Maintenance', color: '#EC4899', icon: 'wrench' },
  SALARIES: { label: 'Salaires', color: '#06B6D4', icon: 'account-group' },
  UTILITIES: { label: 'Services', color: '#84CC16', icon: 'lightning-bolt' },
  OTHER: { label: 'Autre', color: '#6B7280', icon: 'dots-horizontal' }
};

export const EXPENSE_STATUS_CONFIG: Record<ExpenseStatus, { label: string; color: string }> = {
  PENDING: { label: 'En attente', color: '#F59E0B' },
  APPROVED: { label: 'Approuvé', color: '#10B981' },
  REJECTED: { label: 'Rejeté', color: '#EF4444' }
};

export const PAYMENT_METHOD_CONFIG: Record<PaymentMethod, { label: string; icon: string }> = {
  CASH: { label: 'Espèces', icon: 'cash' },
  BANK_TRANSFER: { label: 'Virement bancaire', icon: 'bank' },
  MOBILE_MONEY: { label: 'Mobile Money', icon: 'cellphone' },
  CARD: { label: 'Carte', icon: 'credit-card' },
  CHECK: { label: 'Chèque', icon: 'checkbook' }
};
