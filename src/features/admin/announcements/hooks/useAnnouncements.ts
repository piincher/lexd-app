import { useQuery } from "@tanstack/react-query";
import { announcementAdminApi } from "../api/announcementAdminApi";
import type { Announcement } from "../types/announcement.types";
import { DEFAULT_STALE_TIME } from "@src/shared/constants/queryConfig";

export const ANNOUNCEMENT_KEY = "admin_announcements";

export const useActiveAnnouncement = () => {
  return useQuery<Announcement | null, Error>({
    queryKey: [ANNOUNCEMENT_KEY, "active"],
    queryFn: () => announcementAdminApi.getActive(),
    staleTime: DEFAULT_STALE_TIME,
  });
};

export const useAdminAnnouncements = (filters?: {
  page?: number;
  limit?: number;
  status?: Announcement["status"];
  placement?: Announcement["placement"];
  type?: Announcement["type"];
  search?: string;
}) => {
  return useQuery({
    queryKey: [ANNOUNCEMENT_KEY, "list", filters],
    queryFn: () => announcementAdminApi.list(filters),
    staleTime: 60 * 1000,
  });
};

export const useAdminAnnouncement = (id?: string) => {
  return useQuery({
    queryKey: [ANNOUNCEMENT_KEY, "detail", id],
    queryFn: () => announcementAdminApi.get(id as string),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
};

export const useAnnouncementStats = () => {
  return useQuery({
    queryKey: [ANNOUNCEMENT_KEY, "stats"],
    queryFn: () => announcementAdminApi.getStats(),
    staleTime: 60 * 1000,
  });
};

export const useAnnouncementReceiptStats = (id: string, enabled = true) => {
  return useQuery({
    queryKey: [ANNOUNCEMENT_KEY, "receipts", id],
    queryFn: () => announcementAdminApi.getReceiptStats(id),
    enabled: enabled && !!id,
  });
};
