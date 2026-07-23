import axiosInstance, { apiClientV2 } from "@src/api/client";
import type { ApiResponse } from "@src/shared/api/types";
import type {
  Announcement,
  AnnouncementListResult,
  CreateAnnouncementInput,
  UpdateAnnouncementInput,
  AnnouncementStats,
  AnnouncementReceiptAnalytics,
} from "../types/announcement.types";

const LEGACY_URL = "/announcement";
const BASE_URL = "/announcements/admin";

export const announcementAdminApi = {
  getActive: async (): Promise<Announcement | null> => {
    const response = await axiosInstance.get<Announcement>(`${LEGACY_URL}/active`);
    return response.data || null;
  },

  list: async (params?: {
    page?: number;
    limit?: number;
    status?: Announcement["status"];
    placement?: Announcement["placement"];
    type?: Announcement["type"];
    search?: string;
  }): Promise<AnnouncementListResult> => {
    const response = await apiClientV2.get<ApiResponse<AnnouncementListResult>>(BASE_URL, {
      params,
    });
    return response.data.data;
  },

  get: async (id: string): Promise<Announcement> => {
    const response = await apiClientV2.get<ApiResponse<Announcement>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  create: async (data: CreateAnnouncementInput): Promise<Announcement> => {
    const response = await apiClientV2.post<ApiResponse<Announcement>>(BASE_URL, data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateAnnouncementInput): Promise<Announcement> => {
    const response = await apiClientV2.patch<ApiResponse<Announcement>>(`${BASE_URL}/${id}`, data);
    return response.data.data;
  },

  archive: async (id: string): Promise<Announcement> => {
    const response = await apiClientV2.post<ApiResponse<Announcement>>(`${BASE_URL}/${id}/archive`);
    return response.data.data;
  },

  getStats: async (): Promise<AnnouncementStats> => {
    const response = await apiClientV2.get<ApiResponse<AnnouncementStats>>(`${BASE_URL}/stats`);
    return response.data.data;
  },

  getReceiptStats: async (id: string): Promise<AnnouncementReceiptAnalytics> => {
    const response = await apiClientV2.get<ApiResponse<AnnouncementReceiptAnalytics>>(`${BASE_URL}/${id}/receipts`);
    return response.data.data;
  },
};
