import { apiClientV2 } from '@src/shared/api/client';
import { userData } from '@src/shared/types/user';

interface SearchClientsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface SearchClientsResponse {
  success: boolean;
  data: userData[];
  pagination: SearchClientsPagination;
}

interface SearchClientsParams {
  query: string;
  limit?: number;
}

export const searchReceiveGoodsClients = async ({
  query,
  limit = 50,
}: SearchClientsParams): Promise<userData[]> => {
  const params = new URLSearchParams();
  params.append('q', query);
  params.append('role', 'user');
  params.append('limit', String(limit));

  const response = await apiClientV2.get<SearchClientsResponse>(
    `/search/clients?${params.toString()}`,
  );

  return response.data.data;
};
