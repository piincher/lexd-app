import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../api';

export const useRoutes = () => {
  return useQuery({
    queryKey: ['admin-routes'],
    queryFn: () => orderApi.getRoutes(),
  });
};
