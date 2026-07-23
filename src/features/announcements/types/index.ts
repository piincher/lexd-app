export type AnnouncementType =
  | "INFO"
  | "WARNING"
  | "SUCCESS"
  | "URGENT"
  | "PROMOTION"
  | "MAINTENANCE";

export type AnnouncementPlacement = "TOP_BANNER" | "HOME_CARD" | "MODAL" | "INBOX";

export type AnnouncementAudience = "ALL" | "CLIENTS" | "ADMINS" | "SPECIFIC_USERS" | "SEGMENT";

export type AnnouncementStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface AnnouncementViewerState {
  readAt?: string | null;
  dismissedAt?: string | null;
  acknowledgedAt?: string | null;
}

export interface AnnouncementBlock {
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
  blocks?: AnnouncementBlock[];
  type: AnnouncementType;
  placement: AnnouncementPlacement;
  audience: AnnouncementAudience;
  priority: number;
  status: AnnouncementStatus;
  startAt: string;
  endAt?: string | null;
  dismissible: boolean;
  requiresAcknowledgement: boolean;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  ctaScreen?: string | null;
  ctaParams?: Record<string, unknown>;
  viewerState?: AnnouncementViewerState | null;
}

export interface AnnouncementListResponse {
  items: Announcement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
