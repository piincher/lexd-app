/**
 * User Entity Model
 * Core domain types for the User entity
 */

// ============================================
// BASE USER TYPES
// ============================================

export type UserRole = string;

export interface UserAvatar {
  url: string;
  public_id: string;
}

export interface UserBlockInfo {
  isBlocked: boolean;
  blockedAt?: string;
  blockedBy?: string;
  blockedReason?: string;
  blockedType?: "MANUAL" | "AUTO_BRUTE_FORCE" | null;
  unblockInstructions?: string;
}

/**
 * Core user data (minimal)
 */
export interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  _id: string;
  avatar: UserAvatar;
  blocked?: UserBlockInfo;
  isActive?: boolean;
  deletedAt?: string | null;
  email?: string;
  balance?: number;
  rewardPoints?: number;
  staffType?: string | null;
  pushTokens?: string[];
}

/**
 * Auth response type
 */
export interface UserAuth {
  user: UserData;
  token: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

/**
 * User registration input
 */
export interface UserRegistrationInput {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: string;
}

/**
 * Public user profile (client reference on goods/orders)
 */
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

// ============================================
// ADMIN USER MANAGEMENT TYPES
// ============================================

export interface UserListFilters {
  role?: string;
  isActive?: boolean;
  search?: string;
  showDeleted?: boolean;
  page?: number;
  limit?: number;
}

export interface UserListResponse {
  success: boolean;
  data: UserData[];
  meta: {
    total: number;
    totalActive: number;
    totalBlocked: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserRegistrationRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface SearchUsersParams {
  query: string;
  limit?: number;
}

export interface SearchUsersResponse {
  success: boolean;
  data: UserProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// ============================================
// SMS SERVICE TYPE
// ============================================

export interface SmsService {
  id: string;
  type: string;
  developerId: string;
  applicationId: string;
  country: string;
  offerName: string;
  availableUnits: number;
  requestedUnits: number;
  status: string;
  expirationDate: string;
  creationDate: string;
  lastUpdateDate: string;
  countryName: string;
  countryFlag: string;
  daysRemaining: number;
  totalDays: number;
  daysElapsed: number;
  progressPercentage: number;
  isExpired: boolean;
  isExpiringSoon: boolean;
  isPending: boolean;
  isActive: boolean;
  expirationDateFormatted: string;
  expirationDateShort: string;
}
