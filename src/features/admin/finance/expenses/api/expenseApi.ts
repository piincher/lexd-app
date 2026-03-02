import { apiClientV2 } from '@src/api/client';
import type { 
  ApiResponse, 
  PaginatedResponse, 
  GetExpensesParams 
} from './types';
import type { Expense, ExpenseSummary, CreateExpenseInput, UpdateExpenseInput } from '../types';

const BASE_URL = '/api/v2/expenses';

export const expenseApi = {
  getExpenses: async (params?: GetExpensesParams): Promise<PaginatedResponse<Expense>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Expense>>>(BASE_URL, {
      params: {
        page: 1,
        limit: 20,
        ...params
      }
    });
    return response.data.data;
  },

  getExpenseById: async (id: string): Promise<Expense> => {
    const response = await apiClient.get<ApiResponse<Expense>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  createExpense: async (data: CreateExpenseInput): Promise<Expense> => {
    const response = await apiClient.post<ApiResponse<Expense>>(BASE_URL, data);
    return response.data.data;
  },

  updateExpense: async (id: string, data: UpdateExpenseInput): Promise<Expense> => {
    const response = await apiClient.put<ApiResponse<Expense>>(`${BASE_URL}/${id}`, data);
    return response.data.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },

  approveExpense: async (id: string): Promise<Expense> => {
    const response = await apiClient.post<ApiResponse<Expense>>(`${BASE_URL}/${id}/approve`);
    return response.data.data;
  },

  rejectExpense: async (id: string): Promise<Expense> => {
    const response = await apiClient.post<ApiResponse<Expense>>(`${BASE_URL}/${id}/reject`);
    return response.data.data;
  },

  uploadReceipt: async (id: string, formData: FormData): Promise<{ receiptUrl: string }> => {
    const response = await apiClient.post<ApiResponse<{ receiptUrl: string }>>(
      `${BASE_URL}/${id}/receipt`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  getExpenseSummary: async (params?: { startDate?: string; endDate?: string }): Promise<ExpenseSummary> => {
    const response = await apiClient.get<ApiResponse<ExpenseSummary>>(`${BASE_URL}/summary`, {
      params
    });
    return response.data.data;
  },
};
