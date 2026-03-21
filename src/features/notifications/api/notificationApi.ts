/**
 * Notification API - In-App Notification Service
 * Maps between backend response shapes and frontend interfaces
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

/**
 * Map frontend filter to backend query params
 * Backend expects: isRead, type (not a "filter" param)
 */
const mapFilterToParams = (params?: GetNotificationsParams) => {
  const { filter, page, limit } = params || {};
  const mapped: Record<string, any> = { page: page || 1, limit: limit || 20 };

  if (filter === 'unread') {
    mapped.isRead = false;
  } else if (filter === 'system') {
    mapped.type = 'SYSTEM';
  }
  // 'all' → no extra filter

  return mapped;
};

export const notificationApi = {
  /**
   * Get paginated notifications
   * Backend returns: { notifications, pagination: { pages }, unreadCount }
   * Frontend expects: { data, pagination: { totalPages } }
   */
  getNotifications: async (params?: GetNotificationsParams): Promise<PaginatedNotifications> => {
    const response = await apiClientV2.get<ApiResponse<any>>(BASE_URL, {
      params: mapFilterToParams(params),
    });
    const result = response.data.data;
    return {
      data: result.notifications || [],
      pagination: {
        page: result.pagination?.page || 1,
        limit: result.pagination?.limit || 20,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.pages || 1,
      },
    };
  },

  /**
   * Get unread notification count
   * Backend returns: { unreadCount }
   * Frontend expects: { count, hasNew }
   */
  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await apiClientV2.get<ApiResponse<any>>(`${BASE_URL}/unread-count`);
    const result = response.data.data;
    return {
      count: result.unreadCount ?? result.count ?? 0,
      hasNew: (result.unreadCount ?? result.count ?? 0) > 0,
    };
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
   * Backend returns: { modifiedCount }
   * Frontend expects: { updatedCount }
   */
  markAllAsRead: async (): Promise<{ updatedCount: number }> => {
    const response = await apiClientV2.put<ApiResponse<any>>(`${BASE_URL}/read-all`);
    const result = response.data.data;
    return { updatedCount: result.modifiedCount ?? result.updatedCount ?? 0 };
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
