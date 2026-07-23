import { useCallback, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "@src/navigations/navigationRef";
import type { Announcement } from "../types";

/**
 * Drives the read-only detail overlay (reuses AnnouncementModal) for the inbox
 * and home cards. Acknowledgement is never forced here — viewing an item later
 * must always be closable — so we open a non-blocking copy.
 */
export const useAnnouncementDetail = (onOpen?: (announcement: Announcement) => void) => {
  const [selected, setSelected] = useState<Announcement | null>(null);

  const open = useCallback(
    (announcement: Announcement) => {
      setSelected({ ...announcement, requiresAcknowledgement: false, dismissible: true });
      onOpen?.(announcement);
    },
    [onOpen],
  );

  const close = useCallback(() => setSelected(null), []);

  const action = useCallback(async () => {
    if (!selected) return;
    if (selected.ctaScreen && navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.navigate({ name: selected.ctaScreen, params: selected.ctaParams }),
      );
      return;
    }
    if (selected.ctaUrl) await WebBrowser.openBrowserAsync(selected.ctaUrl);
  }, [selected]);

  return { selected, open, close, action };
};
