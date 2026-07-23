import { useCallback, useMemo, useState } from "react";
import { useActiveAnnouncements } from "./useActiveAnnouncements";
import { useAnnouncementActions } from "./useAnnouncementActions";
import type { Announcement } from "../types";

const MAX_HOME_CARDS = 3;

const canUseNetwork = () => true;

/**
 * Announcements the admin placed as HOME_CARD — rendered inline on the Home
 * screen. Dismissible when configured; capped so the home never floods.
 */
export const useHomeCardAnnouncements = () => {
  const { data = [] } = useActiveAnnouncements();
  const { markRead, dismiss } = useAnnouncementActions();
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());

  const cards = useMemo(
    () =>
      data
        .filter((item) => item.placement === "HOME_CARD" && !hiddenIds.has(item._id))
        .slice(0, MAX_HOME_CARDS),
    [data, hiddenIds],
  );

  const dismissCard = useCallback(
    (announcement: Announcement) => {
      setHiddenIds((current) => new Set(current).add(announcement._id));
      if (canUseNetwork()) dismiss.mutate(announcement._id);
    },
    [dismiss],
  );

  const markCardRead = useCallback(
    (announcement: Announcement) => {
      if (!announcement.viewerState?.readAt && canUseNetwork()) markRead.mutate(announcement._id);
    },
    [markRead],
  );

  return { cards, dismissCard, markCardRead };
};
