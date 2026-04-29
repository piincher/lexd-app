import { apiClientV2 } from "@src/api/client";
import type { Announcement } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const announcementApi = {
  getActive: async (): Promise<Announcement[]> => {
    const response = await apiClientV2.get<ApiResponse<Announcement[]>>("/announcements/active");
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
