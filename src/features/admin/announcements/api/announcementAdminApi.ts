import axiosInstance, { apiClientV2 } from "@src/api/client";
import type { Announcement, AnnouncementListResult, CreateAnnouncementInput } from "../types/announcement.types";

const LEGACY_URL = "/announcement";
const BASE_URL = "/announcements/admin";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const announcementAdminApi = {
  getActive: async (): Promise<Announcement | null> => {
    const response = await axiosInstance.get<Announcement>(`${LEGACY_URL}/active`);
    return response.data || null;
  },

  list: async (): Promise<AnnouncementListResult> => {
    const response = await apiClientV2.get<ApiResponse<AnnouncementListResult>>(BASE_URL);
    return response.data.data;
  },

  create: async (data: CreateAnnouncementInput): Promise<Announcement> => {
    const response = await apiClientV2.post<ApiResponse<Announcement>>(BASE_URL, data);
    return response.data.data;
  },

  archive: async (id: string): Promise<Announcement> => {
    const response = await apiClientV2.post<ApiResponse<Announcement>>(`${BASE_URL}/${id}/archive`);
    return response.data.data;
  },
};
