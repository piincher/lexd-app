/**
 * Notification API - In-App Notification Service
 */

import { apiClientV2 } from '@src/api/client';
import type { 
  ApiResponse, 
  PaginatedNotifications, 
  UnreadCountResponse,
  GetNotificationsParams,
  InAppNotification 
} from './types';

const BASE_URL = '/notifications/in-app';

export const notificationApi = {
  /**
   * Get paginated notifications
   */
  getNotifications: async (params?: GetNotificationsParams): Promise<PaginatedNotifications> => {
    const response = await apiClientV2.get<ApiResponse<PaginatedNotifications>>(BASE_URL, {
      params: {
        page: 1,
        limit: 20,
        ...params
      }
    });
    return response.data.data;
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await apiClientV2.get<ApiResponse<UnreadCountResponse>>(`${BASE_URL}/unread-count`);
    return response.data.data;
  },

  /**
   * Mark a single notification as read
   */
  markAsRead: async (id: string): Promise<InAppNotification> => {
    const response = await apiClientV2.put<ApiResponse<InAppNotification>>(`${BASE_URL}/${id}/read`);
    return response.data.data;
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<{ updatedCount: number }> => {
    const response = await apiClientV2.put<ApiResponse<{ updatedCount: number }>>(`${BASE_URL}/read-all`);
    return response.data.data;
  },

  /**
   * Dismiss a notification (hide but keep in database)
   */
  dismissNotification: async (id: string): Promise<InAppNotification> => {
    const response = await apiClientV2.put<ApiResponse<InAppNotification>>(`${BASE_URL}/${id}/dismiss`);
    return response.data.data;
  },

  /**
   * Permanently delete a notification
   */
  deleteNotification: async (id: string): Promise<void> => {
    await apiClientV2.delete<ApiResponse<void>>(`${BASE_URL}/${id}`);
  },
};
