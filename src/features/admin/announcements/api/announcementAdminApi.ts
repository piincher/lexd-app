import axiosInstance from "@src/api/client";
import type { Announcement, CreateAnnouncementInput } from "../types/announcement.types";

const BASE_URL = "/announcement";

export const announcementAdminApi = {
  getActive: async (): Promise<Announcement | null> => {
    const response = await axiosInstance.get<Announcement>(`${BASE_URL}/active`);
    return response.data || null;
  },

  create: async (data: CreateAnnouncementInput): Promise<Announcement> => {
    const response = await axiosInstance.post<Announcement>(`${BASE_URL}/add`, data);
    return response.data;
  },
};
