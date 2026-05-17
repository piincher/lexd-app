import { apiClientV2 } from '@src/api/client';
import type { PaginatedPublicNotifications, PublicNotificationType } from '../types';

export interface GetPublicNotificationsParams {
  page?: number;
  limit?: number;
  type?: PublicNotificationType;
}

const BASE_URL = '/public/notifications';

export const getPublicNotifications = async (
  params?: GetPublicNotificationsParams
): Promise<PaginatedPublicNotifications> => {
  const response = await apiClientV2.get(BASE_URL, {
    params: {
      page: 1,
      limit: 20,
      ...params,
    },
  });
  return response.data.data;
};

export const getPublicNotificationStats = async () => {
  const response = await apiClientV2.get(`${BASE_URL}/stats`);
  return response.data.data;
};
