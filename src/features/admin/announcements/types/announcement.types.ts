/**
 * Announcement Types
 */

export interface AnnouncementBlockInput {
  heading?: string;
  body?: string;
  imageUrl?: string | null;
  imageKey?: string | null;
}

export interface Announcement {
  _id: string;
  title: string;
  message: string;
  imageUrl?: string | null;
  imageKey?: string | null;
  blocks?: AnnouncementBlockInput[];
  type: "INFO" | "WARNING" | "SUCCESS" | "URGENT" | "PROMOTION" | "MAINTENANCE";
  placement: "TOP_BANNER" | "HOME_CARD" | "MODAL" | "INBOX";
  audience: "ALL" | "CLIENTS" | "ADMINS" | "SPECIFIC_USERS" | "SEGMENT";
  priority: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  startAt: string;
  endAt?: string | null;
  dismissible: boolean;
  requiresAcknowledgement: boolean;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  ctaScreen?: string | null;
  ctaParams?: Record<string, unknown>;
  targeting?: AnnouncementTargeting;
  createdAt?: string;
}

export interface AnnouncementTargeting {
  userIds?: string[];
  roles?: string[];
  shippingModes?: string[];
  goodsStatuses?: string[];
  destinationCountries?: string[];
  destinationCities?: string[];
  routeIds?: string[];
}

export interface CreateAnnouncementInput {
  title: string;
  message: string;
  imageUrl?: string | null;
  blocks?: AnnouncementBlockInput[];
  type: Announcement["type"];
  placement: Announcement["placement"];
  audience: Announcement["audience"];
  priority: number;
  status: Announcement["status"];
  startAt: string;
  endAt?: string | null;
  dismissible: boolean;
  requiresAcknowledgement: boolean;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  ctaScreen?: string | null;
  targeting?: AnnouncementTargeting;
}

export type UpdateAnnouncementInput = Partial<CreateAnnouncementInput>;

export interface AnnouncementListResult {
  items: Announcement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AnnouncementStats {
  total: number;
  byStatus: {
    draft: number;
    published: number;
    archived: number;
  };
  currentlyActive: number;
  totalPublished: number;
  engagement: {
    totalRead: number;
    totalDismissed: number;
    totalAcknowledged: number;
  };
}

export interface AnnouncementReceiptAnalytics {
  announcementId: string;
  title: string;
  status: string;
  totalDelivered: number;
  read: number;
  dismissed: number;
  acknowledged: number;
  readRate: number;
  dismissRate: number;
  ackRate: number;
}
