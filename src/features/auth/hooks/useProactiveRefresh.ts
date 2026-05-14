import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useAuth } from "@src/store/Auth";
import { doRefresh } from "@src/shared/api/client";

export const useProactiveRefresh = () => {
  const refreshToken = useAuth((state) => state.refreshToken);
  const expiresAt = useAuth((state) => state.expiresAt);

  const refreshTokenRef = useRef(refreshToken);
  const expiresAtRef = useRef(expiresAt);

  refreshTokenRef.current = refreshToken;
  expiresAtRef.current = expiresAt;

  useEffect(() => {
    let lastRefreshTime = 0;
    const REFRESH_COOLDOWN = 30 * 1000; // 30s cooldown
    const EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes before expiry

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        const now = Date.now();
        if (now - lastRefreshTime < REFRESH_COOLDOWN) {
          return;
        }

        const currentRefreshToken = refreshTokenRef.current;
        const currentExpiresAt = expiresAtRef.current;

        if (!currentRefreshToken) {
          return;
        }

        if (currentExpiresAt === null || now >= currentExpiresAt - EXPIRY_BUFFER) {
          lastRefreshTime = now;
          void doRefresh().catch((error) => {
            console.log("[useProactiveRefresh] Silent refresh failed:", error);
          });
        }
      }
    });

    return () => subscription.remove();
  }, []);
};
