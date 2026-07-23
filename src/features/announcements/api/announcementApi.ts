import { apiClientV2 } from "@src/api/client";
import type { ApiResponse } from "@src/shared/api/types";
import type { Announcement } from "../types";

export interface AnnouncementInboxPage {
  items: Announcement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
    pages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}

export const announcementApi = {
  getActive: async (): Promise<Announcement[]> => {
    const response = await apiClientV2.get<ApiResponse<Announcement[]>>("/announcements/active");
    return response.data.data;
  },

  getInbox: async (page = 1): Promise<AnnouncementInboxPage> => {
    const response = await apiClientV2.get<ApiResponse<AnnouncementInboxPage>>(
      "/announcements/inbox",
      { params: { page } },
    );
    return response.data.data;
  },

  markRead: async (id: string) => {
    await apiClientV2.post(`/announcements/${id}/read`);
  },

  dismiss: async (id: string) => {
    await apiClientV2.post(`/announcements/${id}/dismiss`);
  },

  acknowledge: async (id: string) => {
    await apiClientV2.post(`/announcements/${id}/acknowledge`);
  },
};
