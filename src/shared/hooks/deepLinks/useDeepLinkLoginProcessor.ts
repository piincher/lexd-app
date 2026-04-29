/**
 * useDeepLinkLoginProcessor Hook
 *
 * Processes pending deep links stored before login after the user authenticates.
 */

import { useEffect, useRef } from "react";
import { useAuth } from "@src/store/Auth";
import { parseDeepLink } from "@src/shared/lib/parseDeepLink";
import { getPendingDeepLink } from "./useDeepLinkState";
import { navigateToDeepLink } from "./useDeepLinkRouting";

export function useDeepLinkLoginProcessor() {
  const token = useAuth((state) => state.token);
  const hasProcessedPending = useRef(false);

  useEffect(() => {
    if (!token || hasProcessedPending.current) return;

    hasProcessedPending.current = true;

    const processPending = async () => {
      const pendingUrl = await getPendingDeepLink();
      if (pendingUrl) {
        const parsed = parseDeepLink(pendingUrl);
        if (parsed) {
          setTimeout(() => navigateToDeepLink(parsed), 300);
        }
      }
    };

    processPending();
  }, [token]);
}
