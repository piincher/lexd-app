import { useQuery } from "@tanstack/react-query";
import { announcementAdminApi } from "../api/announcementAdminApi";
import type { Announcement } from "../types/announcement.types";

const ANNOUNCEMENT_KEY = "admin_announcements";

export const useActiveAnnouncement = () => {
  return useQuery<Announcement | null, Error>({
    queryKey: [ANNOUNCEMENT_KEY, "active"],
    queryFn: () => announcementAdminApi.getActive(),
    staleTime: 5 * 60 * 1000,
  });
};
