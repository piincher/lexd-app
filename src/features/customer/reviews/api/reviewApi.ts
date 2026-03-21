import { apiV2 } from "@src/api/client";

const BASE_URL = "/reviews";

// TypeScript interfaces (keep non-exported to avoid naming conflicts):
interface Review {
  _id: string;
  reviewId: string;
  userId:
    | { _id: string; firstName: string; lastName: string; phoneNumber: string }
    | string;
  goodsId:
    | { _id: string; goodsId: string; shippingMode: string }
    | string;
  rating: number;
  comment: string | null;
  adminResponse: string | null;
  respondedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  } | null;
  respondedAt: string | null;
  status: string;
  createdAt: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: { [key: number]: number };
}

interface PaginatedReviews {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
}

// Export the types that other files need
export type { Review, ReviewStats, PaginatedReviews };

export const reviewApi = {
  submitReview: (data: { goodsId: string; rating: number; comment?: string }) =>
    apiV2.post(BASE_URL, data),

  getMyReviews: (page = 1, limit = 20) =>
    apiV2.get(`${BASE_URL}/me`, { params: { page, limit } }),

  getGoodsReview: (goodsId: string) =>
    apiV2.get(`${BASE_URL}/goods/${goodsId}`),

  getStats: () =>
    apiV2.get(`${BASE_URL}/stats`),
};
