import type { QueryClient } from '@tanstack/react-query';

export const createListOptimisticUpdate = <T extends { id: string }>(
  queryKey: string[],
  operation: 'add' | 'update' | 'delete',
  getNewItem?: (variables: any) => T
) => {
  return async (variables: any, queryClient: QueryClient) => {
    await queryClient.cancelQueries({ queryKey });

    const previousData = queryClient.getQueryData<T[]>(queryKey);

    queryClient.setQueryData<T[]>(queryKey, (old) => {
      if (!old) return old;

      switch (operation) {
        case 'add':
          const newItem = getNewItem?.(variables);
          return newItem ? [newItem, ...old] : old;
        case 'update':
          return old.map((item) =>
            item.id === variables.id ? { ...item, ...variables } : item
          );
        case 'delete':
          return old.filter((item) => item.id !== variables.id);
        default:
          return old;
      }
    });

    return { previousData };
  };
};

export const createListRollback = <T>(queryKey: string[]) => {
  return async (_variables: any, context: { previousData?: T[] }, queryClient: QueryClient) => {
    if (context?.previousData) {
      queryClient.setQueryData(queryKey, context.previousData);
    }
  };
};
