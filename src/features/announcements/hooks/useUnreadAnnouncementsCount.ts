import { useActiveAnnouncements } from "./useActiveAnnouncements";

/**
 * Count of active announcements the viewer hasn't read yet — for the inbox
 * badge. Reuses the app-wide active-announcements cache (no extra request).
 */
export const useUnreadAnnouncementsCount = (): number => {
  const { data } = useActiveAnnouncements();
  if (!data) return 0;
  return data.filter((item) => !item.viewerState?.readAt).length;
};
