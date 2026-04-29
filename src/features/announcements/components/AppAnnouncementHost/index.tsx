import React, { useEffect, useMemo, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "@src/navigations/navigationRef";
import { useAuth } from "@src/store/Auth";
import { AnnouncementBanner } from "../AnnouncementBanner";
import { AnnouncementModal } from "../AnnouncementModal";
import { useActiveAnnouncements } from "../../hooks/useActiveAnnouncements";
import { useAnnouncementActions } from "../../hooks/useAnnouncementActions";
import type { Announcement } from "../../types";

const canUseNetworkActions = () => Boolean(useAuth.getState().token?.trim());

export const AppAnnouncementHost: React.FC = () => {
  const { data = [] } = useActiveAnnouncements();
  const { markRead, dismiss, acknowledge } = useAnnouncementActions();
  const [selected, setSelected] = useState<Announcement | null>(null);

  const forcedModal = useMemo(
    () => data.find((item) => item.requiresAcknowledgement && !item.viewerState?.acknowledgedAt),
    [data]
  );

  const banner = useMemo(
    () => data.find((item) => item.placement === "TOP_BANNER" && !item.requiresAcknowledgement),
    [data]
  );

  useEffect(() => {
    if (forcedModal) setSelected(forcedModal);
  }, [forcedModal]);

  const handleOpen = (announcement: Announcement) => {
    setSelected(announcement);
    if (canUseNetworkActions()) markRead.mutate(announcement._id);
  };

  const handleDismiss = (announcement: Announcement) => {
    if (canUseNetworkActions()) dismiss.mutate(announcement._id);
  };

  const handleAction = async () => {
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
  };

  const closeModal = () => {
    if (!selected?.requiresAcknowledgement) setSelected(null);
  };

  const acknowledgeSelected = () => {
    if (!selected) return;
    if (!canUseNetworkActions()) {
      setSelected(null);
      return;
    }
    acknowledge.mutate(selected._id, { onSuccess: () => setSelected(null) });
  };

  return (
    <>
      {banner && (
        <AnnouncementBanner
          announcement={banner}
          onPress={() => handleOpen(banner)}
          onDismiss={() => handleDismiss(banner)}
        />
      )}
      <AnnouncementModal
        announcement={selected}
        visible={!!selected}
        onClose={closeModal}
        onAcknowledge={acknowledgeSelected}
        onAction={handleAction}
        isAcknowledging={acknowledge.isPending}
      />
    </>
  );
};
