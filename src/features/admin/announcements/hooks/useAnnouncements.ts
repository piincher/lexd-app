import { useQuery } from "@tanstack/react-query";
import { announcementAdminApi } from "../api/announcementAdminApi";
import type { Announcement } from "../types/announcement.types";

export const ANNOUNCEMENT_KEY = "admin_announcements";

export const useActiveAnnouncement = () => {
  return useQuery<Announcement | null, Error>({
    queryKey: [ANNOUNCEMENT_KEY, "active"],
    queryFn: () => announcementAdminApi.getActive(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAdminAnnouncements = () => {
  return useQuery({
    queryKey: [ANNOUNCEMENT_KEY, "list"],
    queryFn: announcementAdminApi.list,
    staleTime: 60 * 1000,
  });
};
