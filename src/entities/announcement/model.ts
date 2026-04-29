/**
 * Announcement Entity Model
 * Core domain types for the Announcement entity
 */

// ============================================
// STATUS & ENUMS
// ============================================

export type AnnouncementType =
  | "INFO"
  | "WARNING"
  | "SUCCESS"
  | "URGENT"
  | "PROMOTION"
  | "MAINTENANCE";

export type AnnouncementPlacement =
  | "TOP_BANNER"
  | "HOME_CARD"
  | "MODAL"
  | "INBOX";

export type AnnouncementAudience =
  | "ALL"
  | "CLIENTS"
  | "ADMINS"
  | "SPECIFIC_USERS"
  | "SEGMENT";

export type AnnouncementStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// ============================================
// VIEWER STATE
// ============================================

export interface AnnouncementViewerState {
  readAt?: string | null;
  dismissedAt?: string | null;
  acknowledgedAt?: string | null;
}

// ============================================
// CORE ANNOUNCEMENT ENTITY
// ============================================

export interface Announcement {
  _id: string;
  title: string;
  message: string;
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
  createdAt?: string;
}

// ============================================
// DTOs
// ============================================

export interface CreateAnnouncementInput {
  title: string;
  message: string;
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
  targeting?: {
    shippingModes?: string[];
    goodsStatuses?: string[];
    destinationCountries?: string[];
    destinationCities?: string[];
    routeIds?: string[];
  };
}

// ============================================
// LIST RESPONSES
// ============================================

export interface AnnouncementListResponse {
  items: Announcement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AnnouncementListResult {
  items: Announcement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
