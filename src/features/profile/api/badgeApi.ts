import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/badges";

// ============================================
// TYPES
// ============================================

export interface BadgeDefinition {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  category: "VOLUME" | "LOYALTY" | "ACHIEVEMENT";
  threshold: number;
  thresholdType: "CBM" | "SHIPMENT_COUNT" | "SPECIAL";
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  sortOrder: number;
}

export interface UserBadge {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  category: "VOLUME" | "LOYALTY" | "ACHIEVEMENT";
  threshold: number;
  thresholdType: "CBM" | "SHIPMENT_COUNT" | "SPECIAL";
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  sortOrder: number;
  earned: boolean;
  earnedAt: string | null;
  currentProgress: number;
  progressPercentage: number;
}

export interface BadgeSummary {
  totalBadges: number;
  earnedCount: number;
  totalCBM: number;
  shipmentCount: number;
  isCertified: boolean;
}

export interface MyBadgesResponse {
  badges: UserBadge[];
  summary: BadgeSummary;
}

export interface CheckBadgesResult {
  checked: boolean;
  totalCBM: number;
  shipmentCount: number;
  isCertified: boolean;
  newlyAwarded: {
    badgeId: string;
    name: string;
    description: string;
    icon: string;
    tier: string;
    earnedAt: string;
  }[];
  totalEarned: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

// ============================================
// API FUNCTIONS
// ============================================

export const badgeApi = {
  /**
   * Get current user's badges with progress
   */
  getMyBadges: (): Promise<ApiResponse<MyBadgesResponse>> =>
    axios.get(`${BASE_URL}/me`),

  /**
   * Get all available badge definitions
   */
  getAllBadges: (): Promise<ApiResponse<BadgeDefinition[]>> =>
    axios.get(`${BASE_URL}`),

  /**
   * Trigger badge evaluation for the current user
   */
  checkBadges: (): Promise<ApiResponse<CheckBadgesResult>> =>
    axios.post(`${BASE_URL}/check`),
};
