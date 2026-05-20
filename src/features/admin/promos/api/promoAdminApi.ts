import { apiV2 } from "@src/api/client";

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
  totalUses: number;
  totalDiscountGiven: number;
  uniqueUsers: number;
  usageOverTime: {
    _id: string;
    count: number;
    discountGiven: number;
  }[];
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
  createPromo: (data: CreatePromoInput): Promise<PromoRecord> =>
    apiV2.post<ApiResponse<PromoRecord>>(`${BASE_URL}/admin`, data).then((res) => res.data.data),

  getPromos: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    search?: string;
  }): Promise<PaginatedPromos> =>
    apiV2.get<ApiResponse<PaginatedPromos>>(`${BASE_URL}/admin`, { params }).then((res) => res.data.data),

  updatePromo: (id: string, data: UpdatePromoInput): Promise<PromoRecord> =>
    apiV2.put<ApiResponse<PromoRecord>>(`${BASE_URL}/admin/${id}`, data).then((res) => res.data.data),

  deactivatePromo: (id: string): Promise<PromoRecord> =>
    apiV2.delete<ApiResponse<PromoRecord>>(`${BASE_URL}/admin/${id}`).then((res) => res.data.data),

  getPromoStats: (id: string): Promise<PromoStats> =>
    apiV2.get<ApiResponse<PromoStats>>(`${BASE_URL}/admin/${id}/stats`).then((res) => res.data.data),

  clonePromo: (id: string): Promise<PromoRecord> =>
    apiV2.post<ApiResponse<PromoRecord>>(`${BASE_URL}/admin/${id}/clone`).then((res) => res.data.data),

  // Banners
  createBanner: (data: CreateBannerInput): Promise<BannerRecord> =>
    apiV2.post<ApiResponse<BannerRecord>>(`${BASE_URL}/admin/banners`, data).then((res) => res.data.data),

  getBanners: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedBanners> =>
    apiV2.get<ApiResponse<PaginatedBanners>>(`${BASE_URL}/admin/banners`, { params }).then((res) => res.data.data),

  updateBanner: (id: string, data: UpdateBannerInput): Promise<BannerRecord> =>
    apiV2.put<ApiResponse<BannerRecord>>(`${BASE_URL}/admin/banners/${id}`, data).then((res) => res.data.data),

  deactivateBanner: (id: string): Promise<BannerRecord> =>
    apiV2.delete<ApiResponse<BannerRecord>>(`${BASE_URL}/admin/banners/${id}`).then((res) => res.data.data),
};
