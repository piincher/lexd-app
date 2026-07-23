import { useState, useMemo, useEffect, useCallback, useRef } from "react";
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
  const autoOpenedIds = useRef<Set<string>>(new Set());

  const visibleAnnouncements = useMemo(
    () => data.filter((item) => !hiddenIds.has(item._id)),
    [data, hiddenIds]
  );

  // Blocking modal: an acknowledgement is required and not yet given.
  const forcedModal = useMemo(
    () =>
      visibleAnnouncements.find(
        (item) => item.requiresAcknowledgement && !item.viewerState?.acknowledgedAt
      ),
    [visibleAnnouncements]
  );

  // Auto-opening modal: admin chose the MODAL placement (a pop-up on open) but
  // did not require an acknowledgement. Without this, MODAL-placed announcements
  // never rendered at all.
  const autoModal = useMemo(
    () =>
      visibleAnnouncements.find(
        (item) => item.placement === "MODAL" && !item.requiresAcknowledgement
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

  // Auto-present the highest-intent pop-up: a blocking ack modal wins over a
  // plain MODAL. `hiddenIds` keeps a closed auto-modal from immediately
  // re-opening while it is still in the active list.
  useEffect(() => {
    const next = forcedModal ?? autoModal;
    if (!next || selected || autoOpenedIds.current.has(next._id)) return;

    autoOpenedIds.current.add(next._id);
    setSelected(next);
    if (autoModal && !forcedModal && canUseNetworkActions()) {
      markRead.mutate(next._id);
    }
  }, [forcedModal, autoModal, selected, markRead.mutate]);

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
    if (selected?.requiresAcknowledgement) return;
    const closing = selected;
    setSelected(null);
    // A MODAL-placed pop-up would re-trigger the auto-open effect while it is
    // still active — hide it locally, and dismiss it server-side when allowed
    // so it does not reappear on the next launch.
    if (closing?.placement === "MODAL") {
      setHiddenIds((current) => new Set(current).add(closing._id));
      if (closing.dismissible && canUseNetworkActions()) dismiss.mutate(closing._id);
    }
  }, [selected, dismiss]);

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
