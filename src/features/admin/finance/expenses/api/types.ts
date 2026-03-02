import type { Expense, ExpenseSummary, ExpenseFilters, CreateExpenseInput, UpdateExpenseInput } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetExpensesParams extends ExpenseFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ExpenseApi {
  getExpenses: (params?: GetExpensesParams) => Promise<PaginatedResponse<Expense>>;
  getExpenseById: (id: string) => Promise<Expense>;
  createExpense: (data: CreateExpenseInput) => Promise<Expense>;
  updateExpense: (id: string, data: UpdateExpenseInput) => Promise<Expense>;
  deleteExpense: (id: string) => Promise<void>;
  approveExpense: (id: string) => Promise<Expense>;
  rejectExpense: (id: string) => Promise<Expense>;
  uploadReceipt: (id: string, file: FormData) => Promise<{ receiptUrl: string }>;
  getExpenseSummary: (params?: { startDate?: string; endDate?: string }) => Promise<ExpenseSummary>;
}
