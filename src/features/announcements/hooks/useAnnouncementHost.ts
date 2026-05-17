import { useState, useMemo, useEffect, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "@src/navigations/navigationRef";
import { useAuth } from "@src/store/Auth";
import { useActiveAnnouncements } from "./useActiveAnnouncements";
import { useAnnouncementActions } from "./useAnnouncementActions";
import type { Announcement } from "../types";

const canUseNetworkActions = () => Boolean(useAuth.getState().token?.trim());

export const useAnnouncementHost = () => {
  const { data = [] } = useActiveAnnouncements();
  const { markRead, dismiss, acknowledge } = useAnnouncementActions();
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());

  const visibleAnnouncements = useMemo(
    () => data.filter((item) => !hiddenIds.has(item._id)),
    [data, hiddenIds]
  );

  const forcedModal = useMemo(
    () =>
      visibleAnnouncements.find(
        (item) => item.requiresAcknowledgement && !item.viewerState?.acknowledgedAt
      ),
    [visibleAnnouncements]
  );

  const banner = useMemo(
    () =>
      visibleAnnouncements.find(
        (item) => item.placement === "TOP_BANNER" && !item.requiresAcknowledgement
      ),
    [visibleAnnouncements]
  );

  useEffect(() => {
    if (forcedModal) setSelected(forcedModal);
  }, [forcedModal]);

  const handleOpen = useCallback(
    (announcement: Announcement) => {
      setSelected(announcement);
      if (canUseNetworkActions()) markRead.mutate(announcement._id);
    },
    [markRead]
  );

  const handleDismiss = useCallback(
    (announcement: Announcement) => {
      setHiddenIds((current) => new Set(current).add(announcement._id));
      if (selected?._id === announcement._id) setSelected(null);
      if (canUseNetworkActions()) dismiss.mutate(announcement._id);
    },
    [selected, dismiss]
  );

  const handleAction = useCallback(async () => {
    if (!selected) return;
    if (selected.ctaScreen) {
      navigationRef.dispatch(
        CommonActions.navigate({
          name: selected.ctaScreen,
          params: selected.ctaParams,
        })
      );
      return;
    }
    if (selected.ctaUrl) {
      await WebBrowser.openBrowserAsync(selected.ctaUrl);
    }
  }, [selected]);

  const closeModal = useCallback(() => {
    if (!selected?.requiresAcknowledgement) setSelected(null);
  }, [selected]);

  const acknowledgeSelected = useCallback(() => {
    if (!selected) return;
    if (!canUseNetworkActions()) {
      setSelected(null);
      return;
    }
    acknowledge.mutate(selected._id, { onSuccess: () => setSelected(null) });
  }, [selected, acknowledge]);

  return {
    banner,
    selected,
    isAcknowledging: acknowledge.isPending,
    handleOpen,
    handleDismiss,
    handleAction,
    closeModal,
    acknowledgeSelected,
  };
};
