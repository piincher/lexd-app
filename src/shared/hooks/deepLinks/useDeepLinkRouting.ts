/**
 * useDeepLinkRouting Hook
 *
 * Handles navigation to parsed deep link targets.
 */

import { useCallback } from "react";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "@src/navigations/navigationRef";
import type { ParsedLink } from "@src/shared/lib/parseDeepLink";

/** Navigate to a parsed deep link */
export function navigateToDeepLink(parsed: ParsedLink): void {
  if (!navigationRef.isReady()) return;

  try {
    if (parsed.screen === "HomeTab" && parsed.params?.screen) {
      navigationRef.dispatch(
        CommonActions.navigate({
          name: "HomeTab",
          params: { screen: parsed.params.screen },
        })
      );
    } else {
      navigationRef.dispatch(
        CommonActions.navigate({
          name: parsed.screen,
          params: parsed.params,
        })
      );
    }
  } catch (err) {
    console.warn("[DeepLink] Navigation failed:", err);
  }
}

export function useDeepLinkRouting() {
  const navigate = useCallback(
    (parsed: ParsedLink) => navigateToDeepLink(parsed),
    []
  );

  return { navigate };
}
