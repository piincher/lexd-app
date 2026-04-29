/**
 * useDeepLinkUrlHandler Hook
 *
 * Listens for incoming URL events and handles auth-gated routing.
 */

import { useEffect } from "react";
import { Linking } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useAuth } from "@src/store/Auth";
import { isAuthRequiredScreen } from "@src/shared/lib/deepLinking";
import { navigationRef } from "@src/navigations/navigationRef";
import { parseDeepLink } from "@src/shared/lib/parseDeepLink";
import { storePendingDeepLink } from "./useDeepLinkState";
import { navigateToDeepLink } from "./useDeepLinkRouting";

export function useDeepLinkUrlHandler() {
  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      if (!url) return;

      const parsed = parseDeepLink(url);
      if (!parsed) return;

      const needsAuth = isAuthRequiredScreen(parsed.screen);
      const isLoggedIn = !!useAuth.getState().token;

      if (needsAuth && !isLoggedIn) {
        storePendingDeepLink(url);
        if (navigationRef.isReady()) {
          navigationRef.dispatch(CommonActions.navigate({ name: "Login" }));
        }
      } else {
        navigateToDeepLink(parsed);
      }
    });

    return () => subscription.remove();
  }, []);
}
