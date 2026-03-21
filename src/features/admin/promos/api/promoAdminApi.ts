import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/promos";

// ── Promo Types ──────────────────────────────────────────────────────────

export type PromoType = "PERCENTAGE" | "FIXED_AMOUNT";
export type PromoStatus = "ACTIVE" | "INACTIVE" | "EXPIRED";
export type PromoApplicableTo = "ALL" | "MARITIME" | "AERIEN" | "FIRST_ORDER";
export type PromoTargetAudience = "ALL" | "NEW" | "CERTIFIED" | "LOYAL";

export interface PromoRecord {
  _id: string;
  code: string;
  name: string;
  description: string | null;
  type: PromoType;
  value: number;
  maxDiscount: number | null;
  minOrderAmount: number | null;
  validFrom: string;
  validUntil: string;
  maxUsages: number | null;
  maxPerUser: number;
  currentUsages: number;
  applicableTo: PromoApplicableTo;
  targetAudience: PromoTargetAudience;
  status: PromoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePromoInput {
  code: string;
  name: string;
  description?: string;
  type: PromoType;
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  validFrom: string;
  validUntil: string;
  maxUsages?: number;
  maxPerUser?: number;
  applicableTo: PromoApplicableTo;
  targetAudience: PromoTargetAudience;
}

export interface UpdatePromoInput extends Partial<CreatePromoInput> {}

export interface PromoStats {
  totalUsages: number;
  totalDiscount: number;
  uniqueUsers: number;
}

export interface PaginatedPromos {
  promos: PromoRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── Banner Types ─────────────────────────────────────────────────────────

export type BannerLinkType = "NONE" | "PROMO_CODE" | "EXTERNAL" | "SCREEN";
export type BannerStatus = "ACTIVE" | "INACTIVE" | "EXPIRED";

export interface BannerRecord {
  _id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  linkType: BannerLinkType;
  linkValue: string | null;
  validFrom: string;
  validUntil: string;
  sortOrder: number;
  targetAudience: PromoTargetAudience;
  clickCount: number;
  status: BannerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerInput {
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkType: BannerLinkType;
  linkValue?: string;
  validFrom: string;
  validUntil: string;
  sortOrder?: number;
  targetAudience: PromoTargetAudience;
}

export interface UpdateBannerInput extends Partial<CreateBannerInput> {}

export interface PaginatedBanners {
  banners: BannerRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── API Response ─────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

// ── API ──────────────────────────────────────────────────────────────────

export const promoAdminApi = {
  // Promos
  createPromo: (data: CreatePromoInput): Promise<ApiResponse<PromoRecord>> =>
    axios.post(`${BASE_URL}/admin`, data),

  getPromos: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<PaginatedPromos>> =>
    axios.get(`${BASE_URL}/admin`, { params }),

  updatePromo: (id: string, data: UpdatePromoInput): Promise<ApiResponse<PromoRecord>> =>
    axios.put(`${BASE_URL}/admin/${id}`, data),

  deactivatePromo: (id: string): Promise<ApiResponse<PromoRecord>> =>
    axios.delete(`${BASE_URL}/admin/${id}`),

  getPromoStats: (id: string): Promise<ApiResponse<PromoStats>> =>
    axios.get(`${BASE_URL}/admin/${id}/stats`),

  // Banners
  createBanner: (data: CreateBannerInput): Promise<ApiResponse<BannerRecord>> =>
    axios.post(`${BASE_URL}/admin/banners`, data),

  getBanners: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<PaginatedBanners>> =>
    axios.get(`${BASE_URL}/admin/banners`, { params }),

  updateBanner: (id: string, data: UpdateBannerInput): Promise<ApiResponse<BannerRecord>> =>
    axios.put(`${BASE_URL}/admin/banners/${id}`, data),

  deactivateBanner: (id: string): Promise<ApiResponse<BannerRecord>> =>
    axios.delete(`${BASE_URL}/admin/banners/${id}`),
};
