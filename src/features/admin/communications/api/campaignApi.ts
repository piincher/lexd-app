import { apiV2 } from "@src/api/client";

const axios = apiV2;
const BASE_URL = "/campaigns";

// ── Types ─────────────────────────────────────────────────────────────────

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "cancelled";

export type TargetSegment =
  | "all"
  | "active_customers"
  | "inactive_customers"
  | "container_customers";

export interface CampaignRecord {
  _id: string;
  title: string;
  body: string;
  scheduledAt: string;
  status: CampaignStatus;
  targetSegment: TargetSegment;
  containerId?: string | null;
  sentCount: number;
  failedCount: number;
  batchId: string | null;
  createdBy:
    | { _id: string; firstName: string; lastName: string }
    | string;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignInput {
  title: string;
  body: string;
  scheduledAt: string; // ISO string
  targetSegment: TargetSegment;
  containerId?: string;
  status: "draft" | "scheduled";
}

export interface PaginatedCampaigns {
  campaigns: CampaignRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface SendNowResult {
  sentCount: number;
  failedCount: number;
  batchId: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// ── API ───────────────────────────────────────────────────────────────────

export const campaignApi = {
  create: (data: CreateCampaignInput): Promise<ApiResponse<CampaignRecord>> =>
    axios.post(BASE_URL, data),

  list: (params?: {
    page?: number;
    limit?: number;
    status?: CampaignStatus;
  }): Promise<ApiResponse<PaginatedCampaigns>> =>
    axios.get(BASE_URL, { params }),

  get: (id: string): Promise<ApiResponse<CampaignRecord>> =>
    axios.get(`${BASE_URL}/${id}`),

  cancel: (id: string): Promise<ApiResponse<CampaignRecord>> =>
    axios.post(`${BASE_URL}/${id}/cancel`),

  sendNow: (id: string): Promise<ApiResponse<SendNowResult>> =>
    axios.post(`${BASE_URL}/${id}/send`),
};
