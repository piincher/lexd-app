import { useQuery } from '@tanstack/react-query';
import { apiClientV2 } from '@src/api/client';

export interface ClientContainer {
  _id: string;
  virtualContainerNumber: string;
  status: string;
  shippingMode: string;
  shippingLine: string;
  origin?: string;
  destination?: string;
  createdAt: string;
}

interface ContainersResponse {
  containers: ClientContainer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const clientContainersKeys = {
  all: (userId: string) => ['clientContainers', userId] as const,
};

export const useClientContainers = (userId: string) =>
  useQuery<ContainersResponse, Error>({
    queryKey: clientContainersKeys.all(userId),
    queryFn: async () => {
      const response = await apiClientV2.get('/containers', {
        params: { userId, limit: 10 },
      });
      return response.data.data;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
