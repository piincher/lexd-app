export type NotificationEventStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'SKIPPED' | 'PARTIAL';
export type ChannelStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'SKIPPED';

export interface NotificationEventUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface NotificationEventLog {
  _id: string;
  userId?: string | NotificationEventUser;
  type: string;
  eventName?: string;
  templateKey?: string;
  dispatchId?: string;
  title: string;
  body: string;
  status: NotificationEventStatus;
  priority?: 'LOW' | 'NORMAL' | 'HIGH';
  sentVia?: string;
  pushStatus?: ChannelStatus;
  inAppStatus?: ChannelStatus;
  whatsappStatus?: ChannelStatus;
  failureReason?: string;
  whatsappFailureReason?: string;
  retryCount?: number;
  scheduledFor?: string | null;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface NotificationEventFilters {
  q?: string;
  type?: string;
  status?: NotificationEventStatus | 'ALL';
  pushStatus?: ChannelStatus | 'ALL';
  inAppStatus?: ChannelStatus | 'ALL';
  whatsappStatus?: ChannelStatus | 'ALL';
  page?: number;
  limit?: number;
}

export interface NotificationEventListResult {
  items: NotificationEventLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
