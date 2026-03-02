import type { InAppNotification, PaginatedNotifications, UnreadCountResponse } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

export type { InAppNotification, PaginatedNotifications, UnreadCountResponse };

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  filter?: 'all' | 'unread' | 'system';
}
