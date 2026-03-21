import { apiV2 } from "@src/api/client";

const axios = apiV2;

const BASE_URL = "/reviews";

export interface AdminReview {
  _id: string;
  reviewId: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  goodsId: {
    _id: string;
    goodsId: string;
    shippingMode: string;
  };
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

export interface AdminReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: { [key: number]: number };
}

export interface AdminPaginatedReviews {
  reviews: AdminReview[];
  total: number;
  page: number;
  totalPages: number;
}

export interface RespondToReviewInput {
  reviewId: string;
  response: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export const reviewAdminApi = {
  getReviews: (params?: {
    page?: number;
    limit?: number;
    rating?: number;
    hasResponse?: boolean;
  }): Promise<ApiResponse<AdminPaginatedReviews>> =>
    axios.get(`${BASE_URL}/admin/list`, { params }),

  getStats: (): Promise<ApiResponse<AdminReviewStats>> =>
    axios.get(`${BASE_URL}/admin/stats`),

  respondToReview: (data: RespondToReviewInput): Promise<ApiResponse<AdminReview>> =>
    axios.post(`${BASE_URL}/admin/respond`, data),
};
