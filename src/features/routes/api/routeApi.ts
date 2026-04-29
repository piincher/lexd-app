import api from '@src/api/client';

export interface CheckRouteRequest {
  code: string;
}

export interface CheckRouteResponse {
  route: string[];
  updatedAt: string;
}

export const checkRoute = async (data: CheckRouteRequest): Promise<CheckRouteResponse> => {
  const response = await api.post<CheckRouteResponse>('/order/search', data);
  return response.data;
};
