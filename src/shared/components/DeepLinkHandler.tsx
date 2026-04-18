/**
 * DeepLinkHandler
 *
 * Handles deep links on app launch and while running.
 * Integrates with React Navigation's linking config for standard routes,
 * and custom auth-gated handling for routes requiring login.
 */

import React, { useEffect } from "react";
import { Linking } from "react-native";
import { useAuth } from "@src/store/Auth";
import { useAppLaunchStore } from "@src/store/AppLaunch";
import { isAuthRequiredScreen } from "@src/shared/lib/deepLinking";
import {
  parseDeepLink,
  storePendingDeepLink,
  getPendingDeepLink,
  navigateToDeepLink,
} from "@src/shared/hooks/useDeepLinks";
import { navigationRef } from "@src/navigations/navigationRef";

const DeepLinkHandler: React.FC = () => {
  const token = useAuth((state) => state.token);
  const appLaunch = useAppLaunchStore((state) => state.isAppLaunchFirst);

  // Handle deep link on app cold start
  useEffect(() => {
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (!url) return;

      // Skip onboarding redirect if this is first launch
      if (appLaunch) {
        // On first launch, just store and let onboarding finish
        const parsed = parseDeepLink(url);
        if (parsed && isAuthRequiredScreen(parsed.screen)) {
          await storePendingDeepLink(url);
        }
        return;
      }

      const parsed = parseDeepLink(url);
      if (!parsed) return;

      const needsAuth = isAuthRequiredScreen(parsed.screen);
      const isLoggedIn = !!token;

      if (needsAuth && !isLoggedIn) {
        await storePendingDeepLink(url);
        // Navigation to Login will happen naturally since no token
      } else {
        // Defer navigation to ensure NavigationContainer is mounted
        const tryNavigate = () => {
          if (navigationRef.isReady()) {
            navigateToDeepLink(parsed);
          } else {
            setTimeout(tryNavigate, 100);
          }
        };
        tryNavigate();
      }
    };

    handleInitialURL();
  }, [token, appLaunch]);

  // Handle deep links while app is running (foreground/background)
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
          navigationRef.navigate("Login" as any);
        }
      } else {
        navigateToDeepLink(parsed);
      }
    });

    return () => subscription.remove();
  }, []);

  // Process any pending deep link after login
  useEffect(() => {
    if (!token) return;

    const processPending = async () => {
      const pendingUrl = await getPendingDeepLink();
      if (!pendingUrl) return;

      const parsed = parseDeepLink(pendingUrl);
      if (!parsed) return;

      const tryNavigate = () => {
        if (navigationRef.isReady()) {
          navigateToDeepLink(parsed);
        } else {
          setTimeout(tryNavigate, 200);
        }
      };
      // Delay to allow navigator to settle after auth state change
      setTimeout(tryNavigate, 400);
    };

    processPending();
  }, [token]);

  return null;
};

export default DeepLinkHandler;
