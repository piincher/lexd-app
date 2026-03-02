import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { expenseApi } from '../api/expenseApi';
import type { ExpenseFilters, CreateExpenseInput, UpdateExpenseInput, GetExpensesParams } from '../types';
import { showMessage } from 'react-native-flash-message';

// Query keys
export const expenseQueryKeys = {
  all: ['expenses'] as const,
  lists: () => [...expenseQueryKeys.all, 'list'] as const,
  list: (filters: ExpenseFilters | undefined) => [...expenseQueryKeys.lists(), filters] as const,
  infinite: (filters: ExpenseFilters | undefined) => [...expenseQueryKeys.lists(), 'infinite', filters] as const,
  details: () => [...expenseQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...expenseQueryKeys.details(), id] as const,
  summary: (params?: { startDate?: string; endDate?: string }) => [...expenseQueryKeys.all, 'summary', params] as const,
};

// Hooks
export const useGetExpenses = (params?: GetExpensesParams) => {
  return useQuery({
    queryKey: expenseQueryKeys.list(params),
    queryFn: () => expenseApi.getExpenses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetExpensesInfinite = (filters?: ExpenseFilters) => {
  return useInfiniteQuery({
    queryKey: expenseQueryKeys.infinite(filters),
    queryFn: ({ pageParam = 1 }) => 
      expenseApi.getExpenses({ ...filters, page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetExpense = (id: string) => {
  return useQuery({
    queryKey: expenseQueryKeys.detail(id),
    queryFn: () => expenseApi.getExpenseById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetExpenseSummary = (params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: expenseQueryKeys.summary(params),
    queryFn: () => expenseApi.getExpenseSummary(params),
    staleTime: 5 * 60 * 1000,
  });
};

// Mutations
export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExpenseInput) => expenseApi.createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.summary() });
      showMessage({
        message: 'Dépense créée avec succès',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors de la création de la dépense',
        type: 'danger',
      });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseInput }) => 
      expenseApi.updateExpense(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.summary() });
      showMessage({
        message: 'Dépense mise à jour avec succès',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors de la mise à jour de la dépense',
        type: 'danger',
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expenseApi.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.summary() });
      showMessage({
        message: 'Dépense supprimée avec succès',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors de la suppression de la dépense',
        type: 'danger',
      });
    },
  });
};

export const useApproveExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expenseApi.approveExpense(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.summary() });
      showMessage({
        message: 'Dépense approuvée avec succès',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors de l\'approbation de la dépense',
        type: 'danger',
      });
    },
  });
};

export const useRejectExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expenseApi.rejectExpense(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.lists() });
      showMessage({
        message: 'Dépense rejetée',
        type: 'info',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors du rejet de la dépense',
        type: 'danger',
      });
    },
  });
};

export const useUploadReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => 
      expenseApi.uploadReceipt(id, formData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: expenseQueryKeys.detail(variables.id) });
      showMessage({
        message: 'Reçu téléchargé avec succès',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erreur lors du téléchargement du reçu',
        type: 'danger',
      });
    },
  });
};
